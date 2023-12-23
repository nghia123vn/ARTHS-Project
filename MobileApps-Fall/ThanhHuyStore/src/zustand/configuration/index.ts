import { create } from "zustand/esm";
import { shallow } from "zustand/esm/shallow";
import { IConfiguration } from "@/zustand/configuration/type";

const configurationStoreValue = create<IConfiguration>(() => (
  {
    totalStaff: 0,
    workHours: 0,
    serviceTime: 0,
    nonBookingPercentage: 0,
    dailyOnlineBookings: 0,
    shippingMoney: 0
  }));

export const useConfiguration = () => {
  return configurationStoreValue(state => state, shallow);
};
export const setConfiguration = (value: IConfiguration) => {
  return configurationStoreValue.setState(value);
};
export const getConfiguration = () => {
  return configurationStoreValue.getState();
};


