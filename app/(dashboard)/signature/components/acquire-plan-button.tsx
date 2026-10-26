"use client";

import { createStripeCheckout } from "@/actions/create-stripe-checkout";
import { Button } from "@/components/ui/button";

const AcquirePlanButton = () => {
  const handleAcquirePlanClick = async () => {
    try {
      const { checkoutUrl } = await createStripeCheckout();

      if (!checkoutUrl) {
        throw new Error("Checkout URL not found");
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      variant="default"
      className="bg-primary/60 hover:bg-primary/70 min-w-full rounded-3xl p-5 text-white"
      onClick={handleAcquirePlanClick}
    >
      Get Plan
    </Button>
  );
};

export default AcquirePlanButton;
