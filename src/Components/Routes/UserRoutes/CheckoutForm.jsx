import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    try {
      const { paymentIntent, error } = await stripe.createPayment({
        amount: booking.price * 100, // Convert to cents
        currency: "usd",
      });

      if (error) {
        console.error("Payment error:", error);
        return;
      }

      // Save transaction and update status
      await axios.post("/save-transaction", {
        bookingId: booking._id,
        paymentIntentId: paymentIntent.id,
        status: "in-review",
      });

      alert("Payment successful!");
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        disabled={!stripe}
      >
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
