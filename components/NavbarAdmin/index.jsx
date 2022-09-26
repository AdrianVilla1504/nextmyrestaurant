/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable @next/next/no-img-element */
/* This example requires Tailwind CSS v2.0+ */

import { Popover } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const NavbarAdmin = () => {
  const [profileAdmin, setProfileAdmin] = useState({});
  useEffect(() => {
    const profile = localStorage.getItem("profile");
    setProfileAdmin(JSON.parse(profile));
  }, []);

  const router = useRouter();

  const handleClickOut = () => {
    localStorage.clear();
    router.push('/');
  };

  return (
    <Popover className="relative bg-white">
      <div className="mx-auto bg-white z-50 fixed w-full max-w-7xl px-4 sm:px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
            </a>
            <div className="hidden pl-[50px] md:flex md:flex-1	items-center justify-start lg:w-0">
              <p className="whitespace-nowrap text-base font-medium text-gray-900  pr-[10px]">
                Hello {profileAdmin?.name}
              </p>
            </div>
          </div>
          <Popover.Group as="nav" className="hidden space-x-10 md:flex">
            <a
              href="/"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              See all your products
            </a>
            <a
              href="/uploadproduct"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Upload a product
            </a>
          </Popover.Group>
          <div className="hidden  md:flex md:flex-1 justify-end lg:w-0">
            <div className="hidden items-center justify-end md:flex md:flex-1 lg:w-0">
              <button
                onClick={handleClickOut}
                href="#"
                className="whitespace-nowrap text-base font-medium text-gray-500 hover:text-gray-900 pr-[10px]"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </Popover>
  );
};

export default NavbarAdmin;
