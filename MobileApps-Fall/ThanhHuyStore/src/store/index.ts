import { setStore } from "./getStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { batch } from "react-redux";
import { Action, AnyAction, applyMiddleware, combineReducers, createStore, ReducersMapObject, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import { exampleReducer, resetExampe, setExampleStore } from "@/store/example";
import { customerReducer, resetCustomer, setCustomerStore } from "@/store/customers";
import { productReducer, resetProduct, setProductStore } from "@/store/product";
import {  categoryReducer, resetCategory, setCategoryStore } from "@/store/category";
import { resetService, serviceReducer, setServiceStore } from "@/store/service";
import { orderReducer, resetOrder, setOrderStore } from "@/store/order";
import { bookingReducer, resetBooking, setBookingStore } from "@/store/booking";
import { discountReducer, resetDiscount, setDiscountStore } from "@/store/discount";
import { resetStaff, setStaffStore, staffReducer } from "@/store/staff";
import { notificationReducer, resetNotification, setNotificationStore } from "@/store/notifications";
import { addressReducer, resetAddress, setAddressStore } from "@/store/address";


let _reducers: ReducersMapObject = {};
let _whitelist: string[] = [];

const middlewares: never[] = [];
if (__DEV__) {
  const createDebugger = require("redux-flipper").default;
  // @ts-ignore
  middlewares.push(createDebugger());
}
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const initReducers = {
  example: exampleReducer,
  customer: customerReducer,
  product: productReducer,
  category: categoryReducer,
  service:serviceReducer,
  order:orderReducer,
  booking: bookingReducer,
  discount:discountReducer,
  staff:staffReducer,
  notification:notificationReducer,
  address:addressReducer
};

const appReducer = combineReducers(initReducers);

export const store = createStore(appReducer, enhancer);

/* -- set store -- */
setStore(store);
setExampleStore(store);
setCustomerStore(store);
setProductStore(store);
setCategoryStore(store);
setServiceStore(store);
setOrderStore(store);
setBookingStore(store);
setDiscountStore(store);
setStaffStore(store);
setNotificationStore(store);
setAddressStore(store);

/* -- setup store -- */
export const setupStore = <S, A extends Action = AnyAction>(
  reducers?: ReducersMapObject<S, A>,
  setStoreFn?: (store: Store<any, AnyAction>) => void,
  whitelist?: string[]
) => {
  /* -- add reducers -- */
  _reducers = { ..._reducers, ...reducers };

  /* -- add whitelist -- */
  if (whitelist) _whitelist = [...new Set([..._whitelist, ...whitelist,'address'])];

  /* -- combine reducers -- */
  const appReducer = combineReducers({
    ...initReducers,
    ..._reducers
  });

  const rootReducer = (state: any, action: any) => {
    if (action.type === "RESET_STORE_DATA") {
      //Clear store state
      state = undefined;
    }

    return appReducer(state, action);
  };

  /* -- create persistedReducer -- */
  const persistedReducer = persistReducer(
    {
      key: "root",
      whitelist: _whitelist || [], // if you want to persist something, put it here
      storage: AsyncStorage
    },
    rootReducer
  );

  /* -- set reducers store -- */
  if (setStoreFn) setStoreFn(store);

  /* -- replace new reducers in store -- */
  store.replaceReducer(persistedReducer as any);

  const persistor = persistStore(store);
  return { persistor };
};

export default store;

export const resetAllStore = () => {
  // resetAuth();
  batch(() => {
//reset here
    resetExampe();
    resetCustomer();
    resetProduct();
    resetCategory();
    resetService();
    resetOrder();
    resetBooking();
    resetDiscount();
    resetStaff();
    resetNotification();
    resetAddress();
  });
};

