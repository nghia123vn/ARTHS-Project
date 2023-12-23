import { createArrayReducer } from "@/utils/createArrayReducer";
import { IBooking } from "@/store/booking/type";

export const {
  sync: syncBooking,
  reducer: bookingReducer,
  setStore: setBookingStore,
  useByKey: useBooking,
  setQueries: setBookingQueries,
  useKeysByQuery: useBookingByQuery,
  getKeysByQuery: getBookingByQuery,
  getByKey: getBooking,
  deleteItem: deleteBooking,
  reset: resetBooking
} = createArrayReducer<IBooking>("booking", ["id"]);



