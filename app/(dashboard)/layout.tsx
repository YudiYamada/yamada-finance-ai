import "../globals.css";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import Header from "@/components/header";
import { auth } from "@/lib/auth";

export default async function DashboardLayout({ children }: LayoutProps<"/">) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen">
      <Header userName={session?.user.name} />
      <main className="min-h-screen px-6 py-5.75">{children}</main>
    </div>
  );
}
