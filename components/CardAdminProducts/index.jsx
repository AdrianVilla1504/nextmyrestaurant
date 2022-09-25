/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { deleteProduct } from '../../services/products';

const CardAdminProducts = ({ product }) => {
  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    try {
      await deleteProduct(product._id)
      window.location.reload(false);
    } catch (error) {
      console.log(error);
    }
  };  console.log(product._id)

  return (
    <>
      <div className="p-[12px] aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <div className="pb-[10px]">
          <button
            type="button"
            onClick={handleDeleteProduct}
            className="bg-white rounded-md p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <Link href={`/productadmin/${product._id}`} key={product._id}>
          <a key={product._id} href={product.name} className="group">
            <div className="aspect-w-1 aspect-h-1 h-[150px] w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
              <img
                src={product.img}
                alt={product.name}
                className="h-full w-full  object-center group-hover:opacity-75"
              />
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
            <p className="mt-1 text-[12px] text-gray-500">
              {product.description}
            </p>
            <p className="mt-1 text-lg font-medium text-gray-800">
              $ {product.price} USD
            </p>
            <p className="mt-1 text-lg font-medium text-gray-900">
              {product._id}
            </p>
          </a>
        </Link>
      </div>
    </>
  );
};

export default CardAdminProducts;
