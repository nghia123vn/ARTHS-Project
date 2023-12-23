import { getToken } from "@/utils/loginHandle";
import axios from "axios";
import { ICart } from "@/zustand/cart/type";
import { BASE_URL } from "@/global";
import { batch } from "react-redux";
import { setCart } from "@/zustand/cart/index";
import SimpleToast from "react-native-simple-toast";

export const requestCurrentCart = async () => {
  const accessToken = await getToken();
    const { data } = await axios.get<ICart>(`https://${BASE_URL}/api/carts`, {
      headers: {
        "accept": "text/plain",
        "Authorization": accessToken || ""
      }
    });
    batch(() => {
      if (data) {
        setCart(data);
      }
    });
};

export interface IAddToCartParams {
  productId: string,
  quantity: number
}

export const requestAddToCart = async (params: IAddToCartParams[]) => {
  const accessToken = await getToken();
    const { data } = await axios.post<ICart>(`https://${BASE_URL}/api/carts`, params, {
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization": accessToken || ""
      }
    });
    batch(() => {
      if (data) {
        setCart(data);
      }
    });
    SimpleToast.show("Thêm vào giỏ hàng thành công");
};

export interface IUpdateCartParams {
  cartItems: IAddToCartParams[],
}

export const requestUpdateCart = async (params: IUpdateCartParams, id: string) => {
  const accessToken = await getToken();
    const { data } = await axios.put<ICart>(`https://${BASE_URL}/api/carts/${id}`, params, {
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization": accessToken || ""
      }
    });
    batch(() => {
      if (data) {
        setCart(data);
      }
    });
};
