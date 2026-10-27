import { NextResponse } from "next/server";
import Stripe from "stripe";

import { prisma } from "@/lib/prisma";

const getId = (value: string | { id: string } | null) =>
  typeof value === "string" ? value : (value?.id ?? null);

const syncSubscription = async (
  subscription: Stripe.Subscription,
  userIdFromCheckout?: string,
) => {
  const customerId = getId(subscription.customer);
  const userId =
    userIdFromCheckout ?? subscription.metadata?.better_auth_user_id;

  const user = userId
    ? await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true },
      })
    : await prisma.user.findFirst({
        where: {
          OR: [
            { stripeSubscriptionId: subscription.id },
            ...(customerId ? [{ stripeCustomerId: customerId }] : []),
          ],
        },
        select: { id: true },
      });

  if (!user) {
    return false;
  }

  const isPremium =
    subscription.status === "active" || subscription.status === "trialing";

  await prisma.user.update({
    where: { id: user.id },
    data: {
      stripeCustomerId: customerId ?? undefined,
      stripeSubscriptionId: isPremium ? subscription.id : null,
      planStatus: isPremium ? "premium" : "free",
    },
  });

  return true;
};

export const POST = async (request: Request) => {
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 });
  }

  const text = await request.text();

  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse("Missing environment variables", { status: 500 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-09-30.endive",
  });

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      text,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return new NextResponse(`Webhook Error: ${errorMessage}`, { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;
      const subscriptionId = getId(session.subscription);
      if (!subscriptionId) {
        return new NextResponse("Missing subscription or customer ID", {
          status: 400,
        });
      }

      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const userId =
        session.client_reference_id ??
        session.metadata?.better_auth_user_id ??
        subscription.metadata?.better_auth_user_id;
      if (!userId) {
        return new NextResponse("User ID not found in metadata", {
          status: 400,
        });
      }

      if (!(await syncSubscription(subscription, userId))) {
        return new NextResponse("User not found", { status: 404 });
      }
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      if (!(await syncSubscription(subscription))) {
        return new NextResponse("User not found for subscription", {
          status: 404,
        });
      }
      break;
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
};
