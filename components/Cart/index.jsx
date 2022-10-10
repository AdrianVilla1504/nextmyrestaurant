/* eslint-disable @next/next/no-img-element */
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useDispatch, useSelector  } from "react-redux";
import { useEffect } from 'react';
import { removeFromCart } from '../../store/action/shopping';
import CartProducts from './CartProducts';
import Link from 'next/link';

const Cart = ({ setOpenCart, openCart }) =>{
const router = useRouter();

const cart = useSelector((state) => state.shop.cart );
const handleClose = () => {
  setOpenCart(false);
};

const [totalPrice, setTotalPrice]= useState(0);
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

//TODO arreglar modelo para recibir cantidad como qty
console.log("Cantidad inicial antes de cambiar en el input", (cart.map(item => item.qty)[0]));

const dispatch = useDispatch();

const handleRemoveItem = (_id) => {
  dispatch(removeFromCart(_id));
}

  return (
    <Transition
    show={openCart}
    as={Fragment}
    enter="ease-in-out duration-500"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="ease-in-out duration-500"
    leaveFrom="opacity-100"
    leaveTo="opacity-0">
      <Dialog as="div" className="relative z-50" open={openCart} onClose={setOpenCart}>
        <Transition.Child
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">Shopping cart</Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={handleClose}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {cart.map((cartitem) => (
                              <>
                              <CartProducts key={cartitem._id} product={cartitem} handleRemoveItem={handleRemoveItem} />
                              </>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Total Items</p>
                        <p>{totalItems}</p>

                        <p>Total cost</p>
                        <p>$ {totalPrice}</p>
                      </div>
                      <div className="mt-6">
                        <Link href="/trypay">
                        <button
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}


export default Cart;
