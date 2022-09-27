/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { adjustItemQty } from "../../store/action/shopping";

const CartProducts = ({ product, handleRemoveItem  }) => {

  const dispatch = useDispatch();
  const [input, setInput] = useState(product.qty);
  const onChangeHandler = (e) => {
    setInput(e.target.value);
    dispatch(adjustItemQty( product._id, e.target.value));
  };

  return (
    <div>
      {
        product ?
        (<li key={product._id} className="flex py-6">
        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
          <img
            src={product.img}
            alt={product.name}
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="ml-4 flex flex-1 flex-col">
          <div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <h3>
                <a href={product.name}>{product.name}</a>
              </h3>
              <p className="ml-4">$ {product.price} USD</p>
            </div>
          </div>
          <div className="flex pt-[10px] pr-[5px] flex-1 flex-col lg:flex-row lg:flex-1 items-end justify-between text-sm">
            <input
              className="h-[30px] border-black-500"
              min="1"
              key={product._id}
              type="number"
              id="qty"
              name="qty"
              value={input}
              onChange={onChangeHandler}
            />

            <div className="flex">
              <button
                type="button"
                className="font-medium text-[#FF9E00] hover:text-[#E18B00]"
                onClick={() => handleRemoveItem(product._id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </li>
      )
      :
      (
        <>
          <p>
            ...wait
          </p>
        </>
      )

      }
    </div>
  );
};

export default CartProducts;
