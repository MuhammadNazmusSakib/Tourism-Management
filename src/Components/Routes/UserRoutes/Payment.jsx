import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm"


const stripePromise = loadStripe("your-publishable-key");

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;

  if (!booking) {
    navigate("/dashboard/my-bookings");
    return null;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Payment for {booking.packageName}</h1>
      <p>Price: ${booking.price}</p>
      <Elements stripe={stripePromise}>
        <CheckoutForm booking={booking} />
      </Elements>
    </div>
  );
};

export default Payment;
