/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */

import Cart from '../../components/Cart'
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";


const NavbarHomeClient = () => {
  const cart = useSelector((state) => state.shop.cart );

  const router = useRouter();
  const [ open, setOpen ] = useState(false)
  const [ profile, setProfile ] = useState();

  useEffect(() => {
    const result = localStorage.getItem('profile');
    setProfile(JSON.parse(result))
  }, []);


  const [ openCart, setOpenCart ] = useState(false);
  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handleClickOut = () => {
    localStorage.clear();
    router.reload(window.location.pathname)
  };

  const [cartcount, setCartCount] = useState(0);


  useEffect(() => {
    let count = 0;
    cart.forEach((item) =>{
      count += item.qty;
    });
    setCartCount(count);
  },[cart, cartcount]);

  return (
    <>
     {
      openCart ?
      <Cart setOpenCart={setOpenCart} openCart={openCart} />
      :
      null
      }
      <div className="bg-white z-50 fixed w-[100%]" >
          {/* Mobile menu */}
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
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

                    {
                      profile ? (
                      <div className="space-y-6 border-t border-gray-200 py-6 px-4">
                      <div className="flow-root">
                        <a className="-m-2 block p-2 font-medium text-gray-900">
                          Welcome {profile.name}, glad to see you!
                        </a>
                      </div>
                      <div className="flow-root">
                        <a className="-m-2 block p-2 font-medium text-gray-900">
                          Your orders
                        </a>
                      </div>
                      <div className="flow-root">
                        <button onClick={handleClickOut} className="text-sm font-medium text-gray-700
                            hover:text-gray-800">
                              Log out
                        </button>
                      </div>
                    </div>
                    )
                    :
                    (

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
                    )
                  }
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <header className="relative bg-white">


            <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="flex h-16 items-center">
                  <button
                    type="button"
                    className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                    onClick={() => setOpen(true)}
                  >
                    <span className="sr-only">Open menu</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                  </button>

                  {/* Logo */}
                  <div className="ml-4 flex lg:ml-0">
                    <a href="#">
                      <span className="sr-only">Your Company</span>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt=""
                      />
                    </a>
                  </div>

                  {/* Flyout menus */}
                  <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                    <div className="flex h-full space-x-8">

                    </div>
                  </Popover.Group>

                  <div className="ml-auto flex items-center">
                  {
                    profile ? (
                      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          Hi {profile.name}, enjoy your visit
                        </a>
                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                          <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                            Your orders
                          </a>
                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                          <button onClick={handleClickOut} className="text-sm font-medium text-gray-700
                            hover:text-gray-800">
                              Log out
                          </button>
                      </div>
                    )
                    :
                    (
                      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <Link href="/signin">
                        <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                          Sign in
                        </a>
                        </Link>
                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                        <Link href="/register">
                          <a className="text-sm font-medium text-gray-700 hover:text-gray-800">
                            Create account
                          </a>
                        </Link>
                      </div>
                    )
                  }
                    {/* Search */}
                    <div className="flex lg:ml-6">
                      <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Search</span>
                        <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                      </a>
                    </div>

                    {/* Cart */}
                    <div className="ml-4 flow-root lg:ml-6">
                      <a className="group -m-2 flex items-center p-2">
                        <ShoppingBagIcon
                          className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500 cursor-pointer"
                          aria-hidden="true"
                          onClick={handleOpenCart}
                        />
                        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">{cartcount}</span>
                        <span className="sr-only">items in cart, view bag</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </header>
        </div>
    </>
  )
}





export default NavbarHomeClient;
