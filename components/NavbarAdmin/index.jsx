/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import { Fragment, useState, useEffect } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

const NavbarHomeClient = () => {
  const cart = useSelector((state) => state.shop.cart);

  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState();

  useEffect(() => {
    const result = localStorage.getItem("profile");
    setProfile(JSON.parse(result));
  }, []);

  const handleClickOut = () => {
    localStorage.clear();
    router.reload(window.location.pathname);
  };

  return (
    <div>
      { profile ? (
      <div className="bg-white z-50 fixed w-[100%]">
        {/* Mobile menu */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                  <div className="flex px-4 pt-5 pb-2">
                    <button
                      type="button"
                      className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {profile ? (
                    <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                      <div className="flow-root">
                        <a className="-m-2 block p-2 font-semibold text-lg text-black">
                          Welcome {profile.name}, glad to see you!
                        </a>
                      </div>
                      <div className="flow-root">
                        <Link href="/">
                          <a className="-m-2 block p-2 font-medium text-gray-500">
                            All your products
                          </a>
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link href="/uploadproduct">
                          <a className="-m-2 block p-2 font-medium text-gray-500">
                            Upload a new product
                          </a>
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link href="/adminregister">
                          <a className="-m-2 block p-2 font-medium text-gray-500">
                            Register a new admin
                          </a>
                        </Link>
                      </div>
                      <div className="flow-root">
                        <a
                          onClick={handleClickOut}
                          className="-m-2 block p-2 font-medium text-gray-500"
                        >
                          Log out
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                      <div className="flow-root">
                        <Link href="/signin">
                          <a className="-m-2 block p-2 font-medium text-gray-900">
                            Sign in
                          </a>
                        </Link>
                      </div>
                      <div className="flow-root">
                        <Link href="/register">
                          <a className="-m-2 block p-2 font-medium text-gray-900">
                            Create account
                          </a>
                        </Link>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <header className="relative bg-white">
          <nav
            aria-label="Top"
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          >
            <div className="border-b border-gray-200">
              <div className="flex h-16 items-center">
                <button
                  type="button"
                  className="rounded-md w-[40px] bg-white p-2 text-gray-400 lg:hidden"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Logo */}
                <div className="ml-4 flex lg:ml-0">
                  <a href="/">
                    <img
                      className="h-10 w-auto"
                      src="https://res.cloudinary.com/dkagy4g5m/image/upload/v1664211095/hamburguer_pnssvp.png"
                      alt=""
                    />
                  </a>
                </div>

                {/* Flyout menus */}
                <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                  <div className="flex h-full space-x-8"></div>
                </Popover.Group>

                <div className="ml-auto flex items-center">
                  {profile ? (
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                        Hi {profile.name}, welcome to your admin page
                      </a>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <Link href="/">
                        <a className="text-sm font-medium cursor-pointer text-gray-500 hover:text-black">
                          All your products
                        </a>
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <Link href="/uploadproduct">
                        <a className="text-sm font-medium cursor-pointer text-gray-500 hover:text-black">
                          Upload a new product
                        </a>
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <Link href="/adminregister">
                        <a className="text-sm font-medium cursor-pointer text-gray-500 hover:text-black">
                          Register a new admin
                        </a>
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <a
                        onClick={handleClickOut}
                        className="text-sm cursor-pointer font-medium text-gray-400
                            hover:text-black"
                      >
                        Log out
                      </a>
                    </div>
                  ) : (
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <Link href="/signin">
                        <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          Sign in
                        </a>
                      </Link>
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                      <Link href="/register">
                        <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          Create account
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </nav>
        </header>
      </div>
      )
      :
      (
        <div className="h-full w-full bg-white flex items-center justify-content-center">
          <h1>Wait...</h1>
        </div>
      )
    }

    </div>
  );
};

export default NavbarHomeClient;
