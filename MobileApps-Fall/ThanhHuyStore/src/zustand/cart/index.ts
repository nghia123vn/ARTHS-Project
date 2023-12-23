import { create } from "zustand/esm";
import { shallow } from "zustand/esm/shallow";
import { ICart } from "@/zustand/cart/type";

const cartStoreValue = create<ICart>(() => (
  {
    id: "",
    cartItems: []
  }));

export const useCart = () => {
  return cartStoreValue(state => state, shallow);
};
export const setCart = (value: ICart) => {
  return cartStoreValue.setState(value);
};
export const getCart = () => {
  return cartStoreValue.getState();
};


