import { listServices } from "@/constants/secondaryConstants";
import { serviceSaga, storeService } from "@/types/actions/listService";



const initialState: storeService<string, number> = {
    serviceInfor: [],
    showError: null,
};



const serviceReducer = (
    state: storeService<string, number> = initialState,
    { type, payload }: { type: string; payload: serviceSaga<string, number> }
) => {
    switch (type) {
        case listServices.GET_LIST_SERVICES_SUCCESS:
            return {
                ...state,
                serviceInfor: payload.data,

            }

        case listServices.GET_LIST_SERVICES_FAIL:
            return {
                ...state,
                serviceInfor: [],
                showError: payload.data
            }
        default:
            return state;
    }
};

export default serviceReducer;