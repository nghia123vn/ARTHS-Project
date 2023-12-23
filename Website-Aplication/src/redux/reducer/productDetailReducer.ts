import { productDetailPayloadReducer, storeProductDetail } from '@/types/actions/detailProduct';
import { detailProduct} from '../../constants/mainConstants';



const initialState: storeProductDetail<string, number> = {
    productDetail: [],
    showError: null,
};



const productDetailReducer = (
    state: storeProductDetail<string, number> = initialState,
    { type, payload }: { type: string; payload: productDetailPayloadReducer<string, number> }
) => {
    switch (type) {
        case detailProduct.DETAIL_PRODUCT_SUCCESS:
            return {
                ...state,
                productDetail: payload.data,

            }

        case detailProduct.DETAIL_PRODUCT_FAIL:
            return {
                ...state,
                productDetail: [],
                showError: payload.showError
            }

        default:
            return state;
    }
};

export default productDetailReducer;