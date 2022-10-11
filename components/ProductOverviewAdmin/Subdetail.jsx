/* eslint-disable @next/next/no-img-element */
import React from "react";

const Subdetail = ({ clicktoedit, subdetails}) => {
  console.log(subdetails)
  return (
    <div>
      {subdetails ? (
      <div className="bg-white pt-[10%] lg:pt-[7%] lg:pb-[10%] lg:h-[100%] w-full lg:pb-[54px]">
        <div className="pt-6 lg:grid lg:grid-cols-2">
          {/* Image gallery */}
          <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid">
            <div className="rounded-lg grid place-items-center aspect-w-4 aspect-h-5  sm:overflow-hidden lg:grid lg:place-items-start sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
              <img
                src={subdetails.img}
                alt={subdetails.name}
                className="shadow h-80 rounded-lg lg:h-80 lg:w-full"
              />
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid  lg:place-items-start lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {subdetails.name}
            </h1>

            {/* Options */}
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
              {/* Description and details */}
              <div>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {subdetails.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 lg:row-span-3 lg:mt-0">
                <h2 className="sr-only">Product information</h2>
                <p className="text-3xl tracking-tight text-gray-900">
                  $ {subdetails.price} USD
                </p>

                <button
                  type="button"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#FF9E00] py-3 px-8 text-base font-medium text-white hover:bg-[#E18B00] focus:outline-none focus:ring-2 focus:ring-[#F99A00] focus:ring-offset-2"
                  onClick={clicktoedit}
                >
                  Edit this product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      ) : (<p>wait</p>
      )
    }
    </div>
  );
};

export default Subdetail;
