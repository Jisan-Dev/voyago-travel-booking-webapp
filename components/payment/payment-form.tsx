"use client";

import { authClient } from "@/lib/auth-client";
import { IHotel } from "@/types";
import { convertToSubCurrency } from "@/utils";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import CheckoutPage from "../checkout-page";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const PaymentForm = ({
  checkin,
  checkout,
  hotelInfo,
  totalCost,
}: {
  checkin: string;
  checkout: string;
  hotelInfo: IHotel;
  totalCost: number;
}) => {
  const [proceedPayment, setProceedPayment] = useState<boolean>(false);
  const { data: session, isPending } = authClient.useSession();

  const formattedCheckInDate = new Date(checkin).toISOString().split("T")[0];
  const formattedCheckOutDate = new Date(checkout).toISOString().split("T")[0];

  const handleSubmit = async () => {
    // Handle form submission logic here
    try {
      // const formData = new FormData(e.target);
      const hotelId = hotelInfo?._id;
      const userId = session?.user?.id;
      const checkin = formattedCheckInDate;
      const checkout = formattedCheckOutDate;

      const res = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hotelId, userId, checkin, checkout }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to create booking");
      }

      const data = await res.json();
      console.log("Payment response", data);
    } catch (error: any) {
      console.error("Something went wrong with creating payment in DB:", error);
      throw new Error(error);
    }
  };

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error("Missing STRIPE_PUBLISHABLE_KEY environment variable");
  }

  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setProceedPayment(true);
        }}
        className="my-8"
      >
        <div className="my-4 space-y-2">
          <label htmlFor="name" className="block">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={isPending ? "Loading..." : session?.user?.name || ""}
            disabled
            className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md dark:bg-input/30"
          />
        </div>

        <div className="my-4 space-y-2">
          <label htmlFor="email" className="block">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={isPending ? "Loading..." : session?.user?.email || ""}
            disabled
            className="w-full border border-[#CCCCCC]/60 py-1 px-2 rounded-md dark:bg-input/30"
          />
        </div>

        <div className="my-4 space-y-2">
          <span>Check in</span>
          <h4 className="mt-2">
            <Input
              type="date"
              name="checkin"
              id="checkin"
              className="py-4! border! border-[#CCCCCC]/60!"
              value={formattedCheckInDate}
            />
          </h4>
        </div>

        <div className="my-4 space-y-2">
          <span>Checkout</span>
          <h4 className="mt-2">
            <Input
              type="date"
              name="checkout"
              id="checkout"
              value={formattedCheckOutDate}
              className="py-4! border! border-[#CCCCCC]/60!"
            />
          </h4>
        </div>

        <Button type="submit" className="w-full py-5 font-bold">
          Proceed to Pay (${totalCost.toFixed(2)})
        </Button>
      </form>

      {proceedPayment && (
        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubCurrency(totalCost),
            currency: "usd",
          }}
        >
          <CheckoutPage
            amount={totalCost}
            onBookingSubmit={handleSubmit}
            userEmail={session?.user?.email}
          />
        </Elements>
      )}

      {/* <BookingConfirmationModal open={openModal} onOpenChange={setOpenModal} /> */}
    </>
  );
};

export default PaymentForm;
