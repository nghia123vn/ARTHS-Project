import {createArrayReducer} from "@/utils/createArrayReducer";
import {IOrder} from "@/store/order/type";


export const {
    sync: syncOrder,
    reducer: orderReducer,
    setStore: setOrderStore,
    useByKey: useOrder,
    setQueries: setOrderQueries,
    useKeysByQuery: useOrderByQuery,
    getKeysByQuery: getOrderByQuery,
    getByKey: getOrder,
    deleteItem: deleteOrder,
    reset: resetOrder,
} = createArrayReducer<IOrder>('order', ['id']);
