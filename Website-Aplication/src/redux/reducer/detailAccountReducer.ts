import { detailAccountSaga, storeDetailAccount } from '@/types/actions/detailAccount';
import { detailEmployee } from '@/constants/secondaryConstants';


const initialState: storeDetailAccount<string, number> = {
    detailAccountInfor: null,
    showError: null,
};

const detailAccountReducer = (
    state: storeDetailAccount<string, number> = initialState,
    { type, payload }: { type: string; payload: detailAccountSaga<string, number> }
) => {
    switch (type) {
        case detailEmployee.DETAIL_EMPLOYEE_STAFF_SUCCESS:
            return {
                ...state,
                detailAccountInfor: payload.data,
            }

        case detailEmployee.DETAIL_EMPLOYEE_FAIL:
            return {
                ...state,
                showError: payload.showError
            }
        default:
            return state;
    }
};

export default detailAccountReducer;