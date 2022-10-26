import * as actionTypes from "../constants/shopping";

const INITIAL_STATE = {
  cart: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {

  console.log("el carrito de compras lleno", state.cart);
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
    const inCart = state.cart.find((item)=> item._id === action.payload.item._id ? true : false)
    return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
              item._id === action.payload.item._id
                ? { ...item, qty: item.qty + 1 }
                : item
            )
          : [...state.cart, action.payload.item ],
      };
    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload._id),
      };
    case actionTypes.ADJUST_ITEM_QTY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload._id
            ? { ...item, qty: +action.payload.qty}
            : item
        ),
      };
    default:
      return state;
  }
};

export default shopReducer;
