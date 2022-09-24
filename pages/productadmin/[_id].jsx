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
  console.log("el aidi :v ", _id)
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
      <NavbarAdmin />
      <ProductOverviewAdmin details={product}/>
    </div>
  );

};

export default productadmin;
