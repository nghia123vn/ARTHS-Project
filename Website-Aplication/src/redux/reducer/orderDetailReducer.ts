import { showResetError } from '@/constants/secondaryConstants';
import { detailOrder, payWithCash, updateProductOrdered, updateUserOrder } from '../../constants/mainConstants';
import { orderDetailPayloadReducer, storeOrderDetail } from '@/types/actions/detailOrder';


const initialState: storeOrderDetail<string, number> = {
    orderDetail: [],
    showError: null,
    checkUpdate:false,
    checkInfor:false,
};



const orderDetailReducer = (
    state: storeOrderDetail<string, number> = initialState,
    { type, payload }: { type: string; payload: orderDetailPayloadReducer<string, number> }
) => {
    switch (type) {
        case detailOrder.DETAIL_ORDER_SUCCESS:
            return {
                ...state,
                orderDetail: payload.data,

            }

        case detailOrder.DETAIL_ORDER_FAIL:
            return {
                ...state,
                orderDetail: [],
                showError: payload.showError
            }
        case updateUserOrder.UPDATE_USER_ORDER_SUCCESS:
            return {
                ...state,
                orderDetail: payload.data,
                checkInfor:true,
                showError: null,
            }
        case updateUserOrder.UPDATE_USER_ORDER_FAIL:
            return {
                ...state,
                showError: payload.showError
            }
        case updateProductOrdered.UPDATE_PRODUCT_ORDER_SUCCESS:
            return {
                ...state,
                checkUpdate: true,
                showError: null,
            }
        case updateProductOrdered.UPDATE_PRODUCT_ORDER_FAIL:
            return {
                ...state,
                showError: payload.showError
            }
        case showResetError.RESET_ERROR:
            return{
                ...state,
                showError: null,
                checkUpdate: false,
                checkInfor:false,
            }
        
            case payWithCash.PAY_WITH_CASH_SUCCESS:
                return {
                    ...state,
                    orderDetail: payload.data
                }
            case payWithCash.PAY_WITH_CASH_FAIL:
                return {
                    ...state,
                    orderDetail: [],
                    showError: payload.showError
                }

        default:
            return state;
    }
};

export default orderDetailReducer;