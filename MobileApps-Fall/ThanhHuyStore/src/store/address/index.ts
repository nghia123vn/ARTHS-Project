import {createArrayReducer} from "@/utils/createArrayReducer";
import { IAddress } from "@/store/address/type";

export const {
  sync: syncAddress,
  reducer: addressReducer,
  setStore: setAddressStore,
  useByKey: useAddress,
  setQueries: setAddressQueries,
  useKeysByQuery: useAddressByQuery,
  getKeysByQuery: getAddressByQuery,
  getByKey: getAddress,
  deleteItem: deleteAddress,
  reset: resetAddress,
} = createArrayReducer<IAddress>('address', ['id']);
