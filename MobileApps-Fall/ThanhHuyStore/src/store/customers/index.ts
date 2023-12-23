import {createArrayReducer} from "@/utils/createArrayReducer";
import { RawCoinValue } from "@/store/example/type";

export const {
  sync: syncCustomer,
  reducer: customerReducer,
  setStore: setCustomerStore,
  useByKey: useCustomer,
  setQueries: setCustomerQueries,
  useKeysByQuery: useCustomerByQuery,
  getKeysByQuery: getCustomerByQuery,
  getByKey: getCustomer,
  deleteItem: deleteCustomer,
  reset: resetCustomer,
} = createArrayReducer('customer', ['id']);
