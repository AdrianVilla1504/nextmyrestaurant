/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
/* eslint-disable no-undef */
import { getProducts } from '../../services/products';
import {
  LOAD_PRODUCT_LIST, SET_PRODUCT_DETAIL, FILTER_PRODUCT, LOAD_PRODUCT_LIST_BYHOSTID, DELETE_HOST_PRODUCT, GET_DETAILS,
} from '../constants/product';
import setError from './ui';
import { getUser } from '../../services/users';

export const loadProductList = (productList) => ({ type: LOAD_PRODUCT_LIST, payload: productList });
export const loadHostProducts = (productHostList) => ({ type: LOAD_PRODUCT_LIST_BYHOSTID, payload: productHostList });
export const loadProductDetail = (productDetail) => ({ type: SET_PRODUCT_DETAIL, payload: productDetail });
export const loadDetail = (details) => ({ type: GET_DETAILS, payload: details });
export const findProduct = (productQuery) => ({ type: FILTER_PRODUCT, payload: productQuery });
export const deleteHostProduct = (deleteProduct) => ({ type: DELETE_HOST_PRODUCT, payload: deleteProduct });

export const fetchProductsList = () => async (dispatch) => {
  try {
    const productList = await getProducts();
    dispatch(loadProductList(productList));
  } catch (error) {
    dispatch(setError(error));
  }
};

export const fetchHostProductList = () => async (dispatch) => {
  try {
    const user = await getUser();
    console.log(user);
    const productHostList = await getHostProducts(user._id);
    dispatch(loadHostProducts(productHostList));
  } catch (error) {
    console.log(error);
    dispatch(setError(error));
  }
};

export const fetchIdToDelete = () => async (dispatch) => {
  try {
    const productByID = await deleteProduct(_id);
    console.log(productByID);
    dispatch(deleteHostProduct(productByID));
  } catch (error) {
    console.log(error);
    dispatch(setError(error));
  }
};
