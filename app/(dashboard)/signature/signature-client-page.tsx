"use client";

import SignatureCard from "./components/signature-card";

export default function SignatureClientPage() {
  return (
    <div className="flex gap-6">
      {/* Basic Plan */}
      <SignatureCard
        title="Basic Plan"
        badgeText="Current"
        price="$0"
        period="/month"
        features={[
          { text: "Only 10 transactions per day 7/10", included: true },
          { text: "Unlimited AI reports", included: false },
          { text: "...", included: false },
        ]}
        buttonText="Upgrade"
        buttonVariant="outline"
        buttonClassName="text-primary hover:text-primary border-primary hover:bg-transparent hover:opacity-50"
        isCurrentPlan={true}
        onButtonClick={() => console.log("Basic Upgrade")}
      />

      {/* Pro Plan */}
      <SignatureCard
        title="Pro Plan"
        price="$19"
        period="/month"
        features={[
          { text: "Unlimited transactions", included: true },
          { text: "Unlimited AI reports", included: true },
          { text: "...", included: true },
        ]}
        buttonText="Get Plan"
        buttonVariant="default"
        buttonClassName="bg-primary/60 hover:bg-primary/70 text-white"
        isCurrentPlan={false}
        onButtonClick={() => console.log("Get Pro")}
      />
    </div>
  );
}
