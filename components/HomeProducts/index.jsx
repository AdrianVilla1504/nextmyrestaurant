/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsList } from "../../store/action/product";
import Link from "next/link";

const HomeProducts = () => {
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProductsList());
  }, []);

  return (
    <div className="w-[100%] h-[80%] pt-[0vh] flex justify-center items-center">
      {productList ? (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 h-[100%] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {productList.map((product) => (
            <Link href={`/productdetail/${product._id}`} key={product._id}>
              <a key={product?._id} href={product.name} className="group">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-[180px] w-full  object-center group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-700">
                  {product.name}
                </h3>
                <p className="mt-1 text-base font-medium text-gray-900">
                  $ {product.price} USD
                </p>
              </a>
            </Link>
          ))}
        </div>
      ) : (
        <div className="w-[100%] pt-[20vh]  lg:w-[25%] h-[80%] grid grid-cols-1 ">
          <img
            src="https://res.cloudinary.com/dkagy4g5m/image/upload/v1664218685/logo_burgir_jrmwvf.png"
            alt="burguer_factory_products_loading"
            className="W-[100%] animate-bounce"
          />
        </div>
      )}
    </div>
  );
};

export default HomeProducts;
