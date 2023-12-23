import { createAccounts, showResetError } from '@/constants/secondaryConstants';
import { createAccountSaga, storeCreateAccount } from '@/types/actions/createUpdateAccount';


const initialState: storeCreateAccount<string, number> = {
    accountInfor: null,
    showError: null,
};



const createUpdateReducer = (
    state: storeCreateAccount<string, number> = initialState,
    { type, payload }: { type: string; payload: createAccountSaga<string, number> }
) => {
    switch (type) {
        case createAccounts.CREATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                accountInfor: payload.data,
                showError: null,
            }
        case createAccounts.CREATE_ACCOUNT_FAIL:
            return {
                ...state,
                showError: payload.showError
            }
        case showResetError.RESET_ERROR:
            return {
                ...state,
                accountInfor: null,
                showError: null,
            }
        default:
            return state;
    }
};

export default createUpdateReducer;