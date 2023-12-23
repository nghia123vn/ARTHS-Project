import {createArrayReducer} from "@/utils/createArrayReducer";
import { IStaff } from "@/store/staff/type";


export const {
  sync: syncStaff,
  reducer: staffReducer,
  setStore: setStaffStore,
  useByKey: useStaff,
  setQueries: setStaffQueries,
  useKeysByQuery: useStaffByQuery,
  getKeysByQuery: getStaffByQuery,
  getByKey: getStaff,
  deleteItem: deleteCoin,
  reset: resetStaff,
} = createArrayReducer<IStaff>('staff', ['id']);
