import { create } from "zustand/esm";
import { shallow } from "zustand/esm/shallow";
import { IAccount } from "@/zustand/account/type";

const accountStoreValue = create<IAccount>(() => (
  {
    id: "",
    fullName: "",
    gender: "",
    avatar: "",
    phoneNumber: "",
    role: "",
    status: "",
    createAt: "",
    address: "",
  }));

export const useAccount = () => {
  return accountStoreValue(state => state, shallow);
};
export const setAccount = (value: IAccount) => {
  return accountStoreValue.setState(value);
};
export const getAccount = () => {
  return accountStoreValue.getState();
};


