/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react';
import NavbarAdmin from '../../components/NavbarAdmin';
import ProductOverviewAdmin  from '../../components/ProductOverviewAdmin';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProduct } from '../../services/products';
import { loadProductDetail } from '../../store/action/product';

const productadmin = () => {

  const router = useRouter();

  const product = useSelector((state) => state.product.productDetail);
  const dispatch = useDispatch();
  const { _id } =  router.query;
  useEffect(() => {
    const fetchData = async () => {
      const result = await getProduct(_id);
      dispatch(loadProductDetail(result));
    };
    fetchData();
  }, []);

  return(
    <div>
      <div className='lg:pr-[1285px]'>
        <NavbarAdmin />
      </div>
      <div className='px-[10px] lg:px-[0px]'>
        <ProductOverviewAdmin details={product}/>
      </div>
    </div>
  );

};

export default productadmin;
