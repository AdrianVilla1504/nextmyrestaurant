/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/StripeCheckOut/index";

import { removeFromCart } from "../store/action/shopping";
import { useSelector, useDispatch } from "react-redux";
import NavbarHomeClient from "../components/NavbarHomeClient/index";
import CheckoutProducts from "../components/StripeCheckOut/CheckoutProducts";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

const trypay = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.shop.cart);

  const handleRemoveItem = (_id) => {
    dispatch(removeFromCart(_id));
  };

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach((cartitem) => {
      items += cartitem.qty;
      price += cartitem.qty * cartitem.price;
    });

    setTotalItems(items);
    setTotalPrice(price);
  }, [cart, totalPrice, totalItems, setTotalPrice, setTotalItems]);

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/createPaymentIntent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: [cart] }),
      }
    )
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
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
      <div className="bg-white pt-[60px] flex flex-col items-center lg:pt-[90px] lg:pl-[70px] lg:flex lg:flex-row lg:items-center lg:justify-center h-[100vh] w-[100vw]">
        {clientSecret && (
          <>
            <div>
              {cart.map((cartitem) => (
                <>
                  <div>
                    <CheckoutProducts
                      key={cartitem._id}
                      product={cartitem}
                      handleRemoveItem={handleRemoveItem}
                    />
                  </div>
                </>
              ))}
              <div>
                <p className="text-black">
                  Total products = {totalItems}
                </p>
                <p className="text-black">
                  Total purchase = $ {totalPrice} USD
                </p>
              </div>
            </div>

            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </>
        )}
      </div>
    </>
  );
};

export default trypay;
