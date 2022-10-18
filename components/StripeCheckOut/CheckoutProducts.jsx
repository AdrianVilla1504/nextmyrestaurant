/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adjustItemQty } from "../../store/action/shopping";
import ModalTry from "../ModaTry/index";

const CheckoutProducts = ({ product, handleRemoveItem }) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState(product.qty);
  const onChangeHandler = (e) => {
    setInput(e.target.value);
    dispatch(adjustItemQty(product._id, e.target.value));
  };

  return (
    <div>
      {product ? (
        <>
          <ModalTry/>
          <li key={product._id} className="flex flex-row py-3">
            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <img
                src={product.img}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col w-full lg:w-[300px]">
              <div className="ml-4 flex flex-1 flex-col">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>
                      <a href={product.name}>{product.name}</a>
                    </h3>
                  </div>
                </div>
                <div className="flex pt-[1px] pr-[5px] flex-1 flex-row lg:flex-row lg:flex-1 items-end justify-between text-sm">
                  <p className="text-black pr-[10px] pb-[5px] ml-4">X</p>
                  <input
                    className="h-[30px] w-[30px] lg:w-[40px] lg:pr-[0px] text-center border-black-500"
                    min="1"
                    key={product._id}
                    type="number"
                    id="qty"
                    name="qty"
                    value={input}
                    onChange={onChangeHandler}
                  />
                  <p className="ml-4 text-black font-normal pb-[5px] lg:pl-[0px] lg:pb-[5px]">
                    $ {product.price * product.qty} USD
                  </p>
                  <div className="flex">
                    <a
                      type="button"
                      className="font-bold pl-[10px] text-[#FF9E00] active:text-[#E18B00] lg:hover:text-[#E18B00]"
                      onClick={() => handleRemoveItem(product._id)}
                    >
                      Remove
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </>
      ) : (
        <>
          <p>...wait</p>
        </>
      )}
    </div>
  );
};

export default CheckoutProducts;
