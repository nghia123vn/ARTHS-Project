import {createArrayReducer} from "@/utils/createArrayReducer";
import { INotification } from "@/store/notifications/type";

export const {
  sync: syncNotification,
  reducer: notificationReducer,
  setStore: setNotificationStore,
  useByKey: useNotification,
  setQueries: setNotificationQueries,
  useKeysByQuery: useNotificationByQuery,
  getKeysByQuery: getNotificationByQuery,
  getByKey: getNotification,
  deleteItem: deleteNotification,
  reset: resetNotification
} = createArrayReducer<INotification>('notification', ['id']);
