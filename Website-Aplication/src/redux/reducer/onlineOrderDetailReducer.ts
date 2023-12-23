import { detailOnlineOrder } from "@/constants/mainConstants";
import { detailOnlineOrderSaga, storeDetailOnlineOrder } from "@/types/actions/listOnlineOrder";

const initialState: storeDetailOnlineOrder<string, number> = {
    onlineOrderDetail: null,
    showError: null
};

const onlineOrderDetailReducer = (
    state: storeDetailOnlineOrder<string, number> = initialState,
    { type, payload }: { type: string; payload: detailOnlineOrderSaga<string, number> }
) => {
    switch (type) {
        case detailOnlineOrder.DETAIL_ONLINE_ORDER_SUCCESS:
            console.log('payload', payload.data)
            return {
                ...state,
                onlineOrderDetail: payload.data
            }
        case detailOnlineOrder.DETAIL_ONLINE_ORDER_FAIL:
            return {
                ...state,
                onlineOrderDetail: null,
            }
        default:
            return state;
    }
};
export default onlineOrderDetailReducer;