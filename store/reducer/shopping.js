import * as actionTypes from "../constants/shopping";

const INITIAL_STATE = {
  cart: [],
  currentItem: null,
};

const shopReducer = (state = INITIAL_STATE, action) => {
  console.log("el carrito de compras lleno", state.cart);
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
    //TODO DETECTAR SI ES UN PRODUCTO NUEVO O YA EXISTE
    //TODO SI ES UN PRODUCTO NUEVO AGREGARLO AL ARRAY, SI EXISTE, AUMENTAR SU CANTIDAD EN EL ESTADO
    const inCart = state.cart.find((item)=> item._id === action.payload.item._id ? true : false)
    console.log("si ya existe in cart, aparecera, sino sera undefined:", inCart)
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
            ? { ...item, qty: +action.payload.qty }
            : item
        ),
      };
    case actionTypes.LOAD_CURRENT_ITEM:
      return {
        ...state,
        currentItem: action.payload,
      };
    default:
      return state;
  }
};

export default shopReducer;
