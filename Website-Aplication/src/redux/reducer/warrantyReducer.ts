import { listWarranty } from '../../constants/secondaryConstants';
import { storeWarrantyProduct, warrantyProductSaga } from '@/types/actions/listWarranty';


const initialState: storeWarrantyProduct<string,number> = {
    warrantyProduct: [],
    showError: null,
};



const warrantyReducer = (
    state: storeWarrantyProduct<string,number> = initialState,
    { type, payload }: { type: string; payload: warrantyProductSaga<string,number> }
) => {
    switch (type) {
        case listWarranty.GET_LIST_WARRANTY_SUCCESS:
            return {
                ...state,
                warrantyProduct: payload.data,

            }

        case listWarranty.GET_LIST_WARRANTY_FAIL:
            return {
                ...state,
                warrantyProduct: [],
            }
        default:
            return state;
    }
};

export default warrantyReducer;