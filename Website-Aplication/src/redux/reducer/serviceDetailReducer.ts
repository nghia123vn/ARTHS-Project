
import { detailServices } from '@/constants/secondaryConstants';
import { serviceDetailPayloadReducer, storeServiceDetail } from '@/types/actions/detailService';



const initialState: storeServiceDetail<string, number> = {
    serviceDetail: [],
    showError: null,
};



const serviceDetailReducer = (
    state: storeServiceDetail<string, number> = initialState,
    { type, payload }: { type: string; payload: serviceDetailPayloadReducer<string, number> }
) => {
    switch (type) {
        case detailServices.DETAIL_SERVICES_SUCCESS:
            return {
                ...state,
                serviceDetail: payload.data,

            }

        case detailServices.DETAIL_SERVICES_FAIL:
            return {
                ...state,
                serviceDetail: [],
                showError: payload.showError
            }

        default:
            return state;
    }
};

export default serviceDetailReducer;