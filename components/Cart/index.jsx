/* eslint-disable @next/next/no-img-element */
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useDispatch, useSelector  } from "react-redux";
import { useEffect } from 'react';
import { adjustItemQty, removeFromCart } from '../../store/action/shopping';

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
const [input, setInput] = useState(cart.map(item => item.qty));

const onChangeHandler = (e) => {
  setInput(e.target.value);
  dispatch(adjustItemQty(cart.map( item => item._id), e.target.value))
};

console.log("veamos la cantidad en cart", cart.map(item => item.qty))

console.log("let's se the cart in cart component", cart.map( item => item._id) );

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
      <Dialog as="div" className="relative z-10" open={openCart} onClose={setOpenCart}>
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
                              <li key={cartitem._id} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={cartitem.img}
                                    alt={cartitem.name}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>
                                        <a href={cartitem.name}>{cartitem.name}</a>
                                      </h3>
                                      <p className="ml-4">{cartitem.price}</p>
                                    </div>
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <input className="h-[30px] border-black-500"
                                      min="1"
                                      type="number"
                                      id="qty"
                                      name="qty"
                                      value={cartitem.qty}
                                      onChange={onChangeHandler}
                                    />

                                    <div className="flex">
                                      <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={ () => handleRemoveItem(cartitem._id) }
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
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
                      <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                      <div className="mt-6">
                        <a
                          href="#"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={handleClose}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </p>
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
