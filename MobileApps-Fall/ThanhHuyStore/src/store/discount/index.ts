import {createArrayReducer} from "@/utils/createArrayReducer";
import { IDiscount } from "@/store/discount/type";

export const {
  sync: syncDiscount,
  reducer: discountReducer,
  setStore: setDiscountStore,
  useByKey: useDiscount,
  setQueries: setDiscountQueries,
  useKeysByQuery: useDiscountByQuery,
  getKeysByQuery: getDiscountByQuery,
  getByKey: getDiscount,
  deleteItem: deleteDiscount,
  reset: resetDiscount,
} = createArrayReducer<IDiscount>('discount', ['id']);
