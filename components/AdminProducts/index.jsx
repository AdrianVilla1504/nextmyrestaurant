/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProductsList } from "../../store/action/product";
import CardAdminProducts from '../../components/CardAdminProducts';

const HomeProducts = () => {
  const { productList } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  const productID = productList._id;
  console.log("este es el ID de tu prodcut", productID);
  useEffect(() => {
    dispatch(fetchProductsList());
  }, []);



  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {productList.map((product) => (
              <CardAdminProducts key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeProducts;
