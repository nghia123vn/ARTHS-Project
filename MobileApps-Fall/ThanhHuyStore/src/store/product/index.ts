import {createArrayReducer} from "@/utils/createArrayReducer";
import { IProduct } from "@/store/product/type";

export const {
  sync: syncProduct,
  reducer: productReducer,
  setStore: setProductStore,
  useByKey: useProduct,
  setQueries: setProductQueries,
  useKeysByQuery: useProductByQuery,
  getKeysByQuery: getProductByQuery,
  getByKey: getProduct,
  deleteItem: deleteProduct,
  reset: resetProduct,
} = createArrayReducer<IProduct>('product', ['id']);
