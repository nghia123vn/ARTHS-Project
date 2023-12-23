import { setStore } from "./getStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { batch } from "react-redux";
import { Action, AnyAction, applyMiddleware, combineReducers, createStore, ReducersMapObject, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistReducer, persistStore } from "redux-persist";
import { exampleReducer, resetExampe, setExampleStore } from "@/store/example";
import {resetStaff, setStaffStore, staffReducer} from "@/store/staff";
import {orderReducer, resetOrder, setOrderStore} from "@/store/order";
import { bookingReducer, setBookingStore } from "@/store/booking";
import { notificationReducer, resetNotification, setNotificationStore } from "@/store/notifications";



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
  staff:staffReducer,
  order:orderReducer,
  booking:bookingReducer,
  notification:notificationReducer
};

const appReducer = combineReducers(initReducers);

export const store = createStore(appReducer, enhancer);

/* -- set store -- */
setStore(store);
setExampleStore(store);
setStaffStore(store);
setOrderStore(store)
setBookingStore(store)
setNotificationStore(store)


/* -- setup store -- */
export const setupStore = <S, A extends Action = AnyAction>(
  reducers?: ReducersMapObject<S, A>,
  setStoreFn?: (store: Store<any, AnyAction>) => void,
  whitelist?: string[]
) => {
  /* -- add reducers -- */
  _reducers = { ..._reducers, ...reducers };

  /* -- add whitelist -- */
  if (whitelist) _whitelist = [...new Set([..._whitelist, ...whitelist])];

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
    resetStaff();
    resetOrder();
    resetNotification()
  });
};

