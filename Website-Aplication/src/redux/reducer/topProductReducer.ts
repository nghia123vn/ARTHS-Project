import { topProduct } from "@/constants/mainConstants";
import { storeTopProduct, topProductSaga } from "@/types/actions/topProduct";


const initialState: storeTopProduct<string, number> = {
    topProductInfor: [],
    showError: null,
};



const topProductReducer = (
    state: storeTopProduct<string, number> = initialState,
    { type, payload }: { type: string; payload: topProductSaga<string, number> }
) => {
    switch (type) {
        case topProduct.GET_PRODUCT_TOP_SUCCESS:
            return {
                ...state,
                topProductInfor: payload.data,

            }

        case topProduct.GET_PRODUCT_TOP_FAIL:
            return {
                ...state,
                showError: payload.error
            }
        default:
            return state;
    }
};

export default topProductReducer;