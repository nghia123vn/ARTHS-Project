import { storeCategoryProduct,categoryProductSaga} from '@/types/actions/categoryPr';
import { productCategory } from '../../constants/secondaryConstants';


const initialState: storeCategoryProduct<string> = {
    categoryProduct: [],
    showError: null,
};



const categoryProductReducer = (
    state: storeCategoryProduct<string> = initialState,
    { type, payload }: { type: string; payload: categoryProductSaga<string> }
) => {
    switch (type) {
        case productCategory.GET_PRODUCT_CATEGORY_SUCCESS:
            return {
                ...state,
                categoryProduct: payload.data,

            }

        case productCategory.GET_PRODUCT_CATEGORY_FAIL:
            return {
                ...state,
                categoryProduct: [],
            }
        default:
            return state;
    }
};

export default categoryProductReducer;