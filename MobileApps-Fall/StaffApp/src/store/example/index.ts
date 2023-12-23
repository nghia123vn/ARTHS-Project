import {createArrayReducer} from "@/utils/createArrayReducer";
import { RawCoinValue } from "@/store/example/type";

export const {
  sync: syncExample,
  reducer: exampleReducer,
  setStore: setExampleStore,
  useByKey: useExample,
  setQueries: setExampleQueries,
  useKeysByQuery: useExampleByQuery,
  getKeysByQuery: getExampleByQuery,
  getByKey: getExample,
  deleteItem: deleteCoin,
  reset: resetExampe,
} = createArrayReducer('example', ['id']);
