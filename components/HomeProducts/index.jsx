/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductsList } from '../../store/action/product';
import Link from 'next/link';


const HomeProducts = () => {
  const { productList } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProductsList());
  }, [] );

  return (
      <div className="py-[40px] lg:h-[580px]">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 h-[100%] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productList?.map((product) => (
              <Link href={`/productdetail/${product?._id}`} key={product?._id}>
                <a key={product?._id} href={product?.name} className="group">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                    <img
                      src={product?.img}
                      alt={product?.name}
                      className="h-[170px] w-full object-cover group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-700">{product?.name}</h3>
                  <p className="mt-1 text-base font-medium text-gray-900">$ {product?.price} USD</p>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
  )
}

export default HomeProducts;
