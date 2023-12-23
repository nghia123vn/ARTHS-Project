import { listAccounts, listAllAccounts, listNotAccounts } from "@/constants/secondaryConstants";
import { listAccountSaga, storeListAccount } from "@/types/actions/listAccount";



const initialState: storeListAccount<string, number> = {
    ListAllAccount:null,
    ListAccount: null,
    ListNotAccount: null,
    showError: null,
};


const accountReducer = (
    state: storeListAccount<string, number> = initialState,
    { type, payload }: { type: string; payload: listAccountSaga<number> }
) => {
    switch (type) {
        case listAllAccounts.LIST_ALL_ACCOUNT_SUCCESS:
            return {
                ...state,
                ListAllAccount: payload.data,

            }
        case listAccounts.LIST_ACCOUNT_SUCCESS:
            return {
                ...state,
                ListAccount: payload.data,

            }
            case listNotAccounts.LIST_NOT_ACCOUNT_SUCCESS:
                return {
                    ...state,
                    ListNotAccount: payload.data,
    
                }
        case listAccounts.LIST_ACCOUNT_FAIL:
            return {
                ...state,
                showError: payload.showError,
            }
        default:
            return state;
    }
};

export default accountReducer