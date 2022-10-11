/* eslint-disable @next/next/no-img-element */
import { addToCart } from "../../store/action/shopping";
import { useDispatch } from "react-redux";



const ProductOverview = ({ details }) =>{
  const dispatch = useDispatch();

  const handleDispatch = () => {
    dispatch(addToCart(details))
  }

  return (
  details ? (
    <div className="bg-white pt-[10%] lg:pt-[5%] lg:h-[100%] w-full lg:pb-[54px]">
      <div className="pt-6 lg:grid lg:grid-cols-2">
        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid">
          <div className="grid place-items-center aspect-w-4 aspect-h-5  sm:overflow-hidden lg:grid lg:place-items-start sm:rounded-lg lg:aspect-w-3 lg:aspect-h-4">
            <img
              src={details.img}
              alt={details.name}
              className="shadow h-80 rounded-lg lg:h-80 lg:w-full" />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid  lg:place-items-start lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">{details.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">$ {details.price} USD</p>

              <button
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#FF9E00] py-3 px-8 text-base font-medium text-white hover:bg-[#E18B00] focus:outline-none focus:ring-2 focus:ring-[#F99A00] focus:ring-offset-2"
                onClick={handleDispatch}
              >
                Add to bag
              </button>

          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{details.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : <p>wait</p>);


};

export default ProductOverview;
