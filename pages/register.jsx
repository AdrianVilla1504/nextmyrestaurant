/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */

import { LockClosedIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { useRouter } from "next/router";
import { signup } from "../services/auth";

const register = () => {
  const router = useRouter();

  const [signupform, setSignupform] = useState({});
  const handleChange = (e) => {
    setSignupform({ ...signupform, [e.target.name]: e.target.value });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(signupform);
      router.push("/signin");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white min-h-full pt-[30px] pb-[140px] lg:pt-[0px]">
      <div className="flex h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-[100px] lg:h-[200px] w-auto"
              src="https://res.cloudinary.com/dkagy4g5m/image/upload/v1664218685/logo_burgir_jrmwvf.png"
              alt="Logo_1"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Register to taste the best food in town
            </h2>
          </div>
          <form
            className="mt-8 space-y-6"
            action="#"
            method="POST"
            onSubmit={handlerSubmit}
          >
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="name" className="sr-only">
                  Email address
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-[#FF9E00] focus:outline-none focus:ring-[#FF9E00] sm:text-sm"
                  placeholder="Name"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-[#FF9E00] focus:outline-none focus:ring-[#FF9E00] sm:text-sm"
                  placeholder="Email address"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-[#FF9E00] focus:outline-none focus:ring-[#FF9E00] sm:text-sm"
                  placeholder="Phone number"
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-white placeholder-gray-500 focus:z-10 focus:border-[#FF9E00] focus:outline-none focus:ring-[#FF9E00] sm:text-sm"
                  placeholder="Password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md border border-transparent bg-[#FF9E00]  py-2 px-4 text-sm font-medium text-white  hover:bg-[#E18B00] focus:outline-none focus:ring-2 focus:ring-[#FF9E00] focus:ring-[#F99A00]"
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-[#E18B01] group-hover:text-[#FF9E00]"
                    aria-hidden="true"
                  />
                </span>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default register;
