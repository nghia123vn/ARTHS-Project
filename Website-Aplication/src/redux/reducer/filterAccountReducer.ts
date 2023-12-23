import { listAccounts, listFilterAccounts } from "@/constants/secondaryConstants";
import { listFilterAccountSaga, storeListFilterAccount } from "@/types/actions/listAccount";



const initialState: storeListFilterAccount<string, number> = {
    ListFilterAccount: [],
    ListFilterNotAccount: [],
    showError: null,
};


const filterAccountReducer = (
    state: storeListFilterAccount<string, number> = initialState,
    { type, payload }: { type: string; payload: listFilterAccountSaga<number> }
) => {
    switch (type) {
        case listFilterAccounts.LIST_FILTER_ACCOUNT_SUCCESS:
            return {
                ...state,
                ListFilterAccount: payload.data,

            }
            case listFilterAccounts.LIST_FILTER_NOT_ACCOUNT_SUCCESS:
                return {
                    ...state,
                    ListFilterNotAccount: payload.data,
    
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

export default filterAccountReducer