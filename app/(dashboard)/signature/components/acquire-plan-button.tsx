"use client";

import { useState } from "react";

import { createStripeCheckout } from "@/actions/create-stripe-checkout";
import { Button } from "@/components/ui/button";

const AcquirePlanButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleAcquirePlanClick = async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const { checkoutUrl } = await createStripeCheckout();

      if (!checkoutUrl) {
        throw new Error("Checkout URL not found");
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error(error);
      setErrorMessage("Could not start checkout. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <Button
        variant="default"
        className="bg-primary/60 hover:bg-primary/70 min-w-full rounded-3xl p-5 text-white"
        disabled={isLoading}
        onClick={handleAcquirePlanClick}
      >
        {isLoading ? "Opening checkout..." : "Get Plan"}
      </Button>
      {errorMessage && (
        <p className="text-destructive mt-2 text-sm" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default AcquirePlanButton;
