import {
  LOAD_PRODUCT_LIST,
  SET_PRODUCT_REGISTER,
  SET_PRODUCT_DETAIL,
  FILTER_PRODUCT,
  GET_DETAILS,
} from '../constants/product';

function productReducer(state = {}, action = {}) {
  switch (action.type) {
    case LOAD_PRODUCT_LIST:
      return {
        ...state,
        productList: action.payload,
      };
    case SET_PRODUCT_REGISTER:
      return {
        ...state,
        productRegister: action.payload,
      };
    case SET_PRODUCT_DETAIL:
      return {
        ...state,
        productDetail: action.payload,
      };
    case GET_DETAILS:
      return {
        ...state,
        details: action.payload,
      };
    case FILTER_PRODUCT: {
      const query = action.payload.toLowerCase();
      return {
        ...state,
        query,
      };
    }
    default:
      return state;
  }
}
export default productReducer;
