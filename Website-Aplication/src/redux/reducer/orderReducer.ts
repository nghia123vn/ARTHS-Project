import { orderSaga, storeOrder } from '@/types/actions/listOrder';
import { listOrder, listOrderPaid } from '../../constants/mainConstants';


const initialState: storeOrder<string, number> = {
    orderInfor: [],
    orderPaidInfor:[],
    showError: null,
};



const orderReducer = (
    state: storeOrder<string, number> = initialState,
    { type, payload }: { type: string; payload: orderSaga<string, number> }
) => {
    switch (type) {
        case listOrder.LIST_ORDER_SUCCESS:
            return {
                ...state,
                orderInfor: payload.data,

            }

        case listOrder.LIST_ORDER_FAIL:
            return {
                ...state,
                orderInfor: [],
            }
            case listOrderPaid.LIST_ORDER_PAID_SUCCESS:
                return {
                    ...state,
                    orderPaidInfor: payload.data,
                }
            case listOrderPaid.LIST_ORDER_PAID_FAIL:
                return {
                    ...state,
                    orderPaidInfor: [],
                }
        default:
            return state;    
    }
};

export default orderReducer;