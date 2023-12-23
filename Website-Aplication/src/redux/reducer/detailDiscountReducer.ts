import { detailDiscount } from '@/constants/secondaryConstants';
import { discountDetailPayloadReducer, storeDiscountDetail } from '@/types/actions/detailDiscount';


const initialState: storeDiscountDetail<string, number> = {
    detailDiscountInfor: [],
    showError: null,
};



const detailDiscountReducer = (
    state: storeDiscountDetail<string, number> = initialState,
    { type, payload }: { type: string; payload: discountDetailPayloadReducer<string, number> }
) => {
    switch (type) {
        case detailDiscount.DETAIL_DISCOUNT_SUCCESS:
            return {
                ...state,
                detailDiscountInfor: payload.data,
            }

        case detailDiscount.DETAIL_DISCOUNT_FAIL:
            return {
                ...state,
                detailDiscountInfor: [],
                showError: payload.showError
            }
        default:
            return state;
    }
};

export default detailDiscountReducer;