/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import React, { useEffect, useState } from "react";
import NavbarPay from "../components/NavbarPay/index";
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const succespage = () => {

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    const cart = JSON.parse(localStorage.getItem("cart"));
    async function receiptemail( ) {
      console.log("This is the customer profile", profile);
      console.log("This are the customer receipt products", cart);
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({profile, cart}),
      };
      const response = await fetch(`${BASE_URL}/api/stripe/generateOrderReceipt`, options);
      return response.json();
    } catch (error) {
      return new Error(error);
    }
  }
  receiptemail();
  }, [])

  return (
    <>
      <NavbarPay />
      <div className="pt-[50px] w-[100%]">
        <div className="bg-white p-6  md:mx-auto">
          <svg
            viewBox="0 0 24 24"
            className="text-green-600 w-16 h-16 mx-auto my-6"
          >
            <path
              fill="currentColor"
              d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
            ></path>
          </svg>
          <div className="text-center">
            <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
              Payment Done!
            </h3>
            <p className="text-gray-600 my-2">
              Thank for trusting on our burgers, you won❜t regret it.
            </p>
            <p> Have a great day! </p>
            <div className="py-10 text-center">
              <Link href="/">
                <a
                  href="#"
                  className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#FF9E00]  py-2 px-4 text-sm font-medium text-white  hover:bg-[#E18B00] focus:outline-none focus:ring-2 focus:ring-[#FF9E00] focus:ring-[#F99A00]"
                >
                  Go back to the menu
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
};

export default succespage;
