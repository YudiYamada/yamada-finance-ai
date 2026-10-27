import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

import SignatureClientPage from "./signature-client-page";

const SignaturePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user) {
    redirect("/");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { planStatus: true },
  });

  return (
    <main className="space-y-6.5">
      <h1 className="text-2xl font-bold">Signature</h1>
      <SignatureClientPage isPremium={user?.planStatus === "premium"} />
    </main>
  );
};

export default SignaturePage;
