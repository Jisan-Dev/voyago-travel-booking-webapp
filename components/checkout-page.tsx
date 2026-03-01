"use client";

import { convertToSubCurrency } from "@/utils";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { SubmitEvent, useEffect, useState } from "react";
import { Button } from "./ui/button";

const CheckoutPage = ({
  amount,
  onBookingSubmit,
  userEmail,
}: {
  amount: number;
  onBookingSubmit: () => void;
  userEmail?: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubCurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
    try {
      onBookingSubmit();
    } catch (error) {
      console.error("Something went wrong with creating booking in Database:", error);
      setErrorMessage("Something went wrong with creating booking in Database! Please try again.");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        receipt_email: userEmail,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      setErrorMessage(error.message);
    } else {
      // The payment UI automatically closes with a success animation.
      // Your customer is redirected to your `return_url`.
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-primary"
          role="status"
        >
          <span className="absolute! -m-px! h-px! w-px! overflow-hidden! whitespace-nowrap! border-0! p-0! [clip:rect(0,0,0,0)]!">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && (
        <PaymentElement
          options={{
            layout: "tabs",
          }}
        />
      )}

      {errorMessage && <div>{errorMessage}</div>}

      <Button
        // type="submit"
        disabled={!stripe || loading}
        className="w-full mt-2 disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </Button>
    </form>
  );
};

export default CheckoutPage;
