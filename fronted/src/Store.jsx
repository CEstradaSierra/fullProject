import { createContext, useReducer } from 'react';

export const Store = createContext();
//defino el estado inicial de carrito
const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};
function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      //add to card
      const newItem = action.payload;
      // eslint-disable-next-line no-case-declarations
      const existItems = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      // eslint-disable-next-line no-case-declarations
      const cartItems = existItems
        ? state.cart.cartItems.map((item) =>
            item._id === existItems._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'CART_REMOVE_ITEM': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    default:
      return state;
  }
}
export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
