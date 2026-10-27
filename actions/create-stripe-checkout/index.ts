"use server";

import { headers } from "next/headers";
import Stripe from "stripe";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const createStripeCheckout = async () => {
  const requestHeaders = await headers();
  const session = await auth.api.getSession({
    headers: requestHeaders,
  });

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Stripe secret key not found");
  }

  if (!process.env.STRIPE_PREMIUM_PLAN_PRICE_ID) {
    throw new Error("Stripe premium plan price ID not found");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { planStatus: true, stripeCustomerId: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  if (user.planStatus === "premium") {
    throw new Error("User already has an active premium subscription");
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2026-09-30.endive",
  });

  const baseUrl =
    requestHeaders.get("origin") ??
    process.env.BETTER_AUTH_URL ??
    "http://localhost:3000";

  const sessionStripe = await stripe.checkout.sessions.create({
    mode: "subscription",
    success_url: new URL("/signature?checkout=success", baseUrl).toString(),
    cancel_url: new URL("/signature?checkout=cancelled", baseUrl).toString(),
    customer: user.stripeCustomerId ?? undefined,
    client_reference_id: session.user.id,
    metadata: {
      better_auth_user_id: session.user.id,
    },
    subscription_data: {
      metadata: {
        better_auth_user_id: session.user.id,
      },
    },
    line_items: [
      {
        price: process.env.STRIPE_PREMIUM_PLAN_PRICE_ID,
        quantity: 1,
      },
    ],
  });

  if (!sessionStripe.url) {
    throw new Error("Could not create Stripe checkout session");
  }

  return { checkoutUrl: sessionStripe.url };
};
