import { listRevenue } from "@/constants/mainConstants";
import { revenueSaga, storeRevenue } from "@/types/revenue";

const initialState: storeRevenue<string, number> = {
    revenueInfo: [],
    showError: null,
}

const revenueReducer = (
    state: storeRevenue<string, number> = initialState,
    { type, payload }: { type: string; payload: revenueSaga<string, number> }
) => {
    switch (type) {
        case listRevenue.LIST_REVENUE_SUCCESS:
            return {
                ...state,
                revenueInfo: payload.data,
            };
        case listRevenue.LIST_REVENUE_FAIL:
            return {
                ...state,
                showError: payload.error
            };
        default:
            return state;
    }
};
export default revenueReducer;