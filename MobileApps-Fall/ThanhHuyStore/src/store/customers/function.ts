import axios from "axios";
import { BASE_URL } from "@/global";
import { getGlobalValue, setGlobalValue } from "@/zustand/globalValue";
import { getToken, saveToken } from "@/utils/loginHandle";
import { IRegisterAccount } from "@/zustand/account/type";


export interface ILoginParams {
  phoneNumber: string;
  password: string;
}

export const requestLogin = async (params: ILoginParams) => {
    const { data } = await axios.post(`https://${BASE_URL}/api/auth`,
      params
      , {
        headers: {
          "accept": "text/plain",
          "Content-Type": "application/json"
        }
      });
    if (data) {
      setGlobalValue({
        accessToken: data.accessToken
      });
      await saveToken(data.accessToken);
    }
    return data.accessToken;
};

export interface IRegisterParams {
  phoneNumber: string;
  password: string;
  fullName: string;
  gender: string;
  address: string;
}

export const requestRegister = async (params: IRegisterParams) => {
    const { data } = await axios.post<IRegisterAccount>(`https://${BASE_URL}/api/customers`,
      params
      , {
        headers: {
          "accept": "text/plain",
          "Content-Type": "application/json"
        }
      });
    if (data) {
      console.log('dat',data)
      return data;
    }
    return data;
};
