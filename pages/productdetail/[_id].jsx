/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import NavbarHomeClient from '../../components/NavbarHomeClient';
import ProductOverview  from '../../components/ProductOverview';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../services/products';
import { loadProductDetail } from '../../store/action/product';

const productdetail = () => {

  const router = useRouter();

  const product = useSelector((state) => state.product.productDetail);
  const dispatch = useDispatch();
  const { _id } =  router.query;
  console.log("Aqui deberia estar el id", _id);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getProduct(_id);
      dispatch(loadProductDetail(result));
    };
    fetchData();
  }, []);

  return(
    <div>
      <NavbarHomeClient />
      <div className='px-[10px]'>
        <ProductOverview details={product}/>
      </div>
    </div>
  );

};

export default productdetail;
