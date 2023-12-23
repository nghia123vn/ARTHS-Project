import { listOnlineOrderConstant } from "@/constants/mainConstants";
import { onlineOrderSaga, storeOrderOnline } from "@/types/actions/listOnlineOrder";


const initialState: storeOrderOnline<string, number> = {
    onlineOrderInfo: [],
    onlineOrderPaid: [],
    onlineOrderConfirm: [],
    onlineOrderTransport: [],
    onlineOrderFinish: [],
    onlineOrderCanceled: [],
    showError: null,
};


const onlineOrderReducer = (
    state: storeOrderOnline<string, number> = initialState,
    { type, payload }: { type: string; payload: onlineOrderSaga<string, number> }
) => {
    switch (type) {
        case listOnlineOrderConstant.LIST_ORDER_SUCCESS:
            return {
                ...state,
                onlineOrderInfo: payload.data,

            }
        case listOnlineOrderConstant.LIST_ORDER_PAID_SUCCESS:
            return {
                ...state,
                onlineOrderPaid: payload.data,
            }
        case listOnlineOrderConstant.LIST_ORDER_CONFIRM_SUCCESS:
            return {
                ...state,
                onlineOrderConfirm: payload.data,
            }
        case listOnlineOrderConstant.LIST_ORDER_TRANSPORT_SUCCESS:
            return {
                ...state,
                onlineOrderTransport: payload.data,
            }
        case listOnlineOrderConstant.LIST_ORDER_FINISH_SUCCESS:
            return {
                ...state,
                onlineOrderFinish: payload.data,
            }
            case listOnlineOrderConstant.LIST_ORDER_CANCELED_SUCCESS:
                return {
                    ...state,
                    onlineOrderCanceled: payload.data,
                }
        case listOnlineOrderConstant.LIST_ORDER_FAIL:
            return {
                ...state,
                onlineOrderInfo: [],
            }
        default:
            return state;
    }
};

export default onlineOrderReducer