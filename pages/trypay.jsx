/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import NavbarHomeClient from "../components/NavbarHomeClient/index";
import CheckoutForm from "../components/StripeCheckout/index";
import { useSelector } from "react-redux";
// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const trypay = () => {
  const [clientSecret, setClientSecret] = useState("");

  const cart = useSelector((state) => state.shop.cart);
  console.log("hugo, hugooo", cart);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/createPaymentIntent`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [cart] }),
    }).then((res) => res.json()).then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <NavbarHomeClient />
      <div className="bg-white pt-[90px] flex flex-column lg:flex-row items-center justify-center h-[100vh] w-[100vw]">
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        )}
      </div>
    </>
  );
};

export default trypay;
