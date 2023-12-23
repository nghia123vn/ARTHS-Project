import {createArrayReducer} from "@/utils/createArrayReducer";
import { IService } from "@/store/service/type";


export const {
  sync: syncService,
  reducer: serviceReducer,
  setStore: setServiceStore,
  useByKey: useService,
  setQueries: setServiceQueries,
  useKeysByQuery: useServiceByQuery,
  getKeysByQuery: getServiceByQuery,
  getByKey: getService,
  deleteItem: deleteService,
  reset: resetService,
} = createArrayReducer<IService>('service', ['id']);
