import { createOrderTransport } from "@/constants/mainConstants";
import { showResetError } from "@/constants/secondaryConstants";
import { storeTransport, transportSaga } from "@/types/actions/listOnlineOrder";

const initialState: storeTransport = {
    transportInfor:null,
    showError: null,
};


const transportReducer = (
    state: storeTransport = initialState,
    { type, payload }: { type: string; payload: transportSaga }
) => {
    switch (type) {
        case createOrderTransport.CREATE_TRANSPORT_SUCCESS:
            return {
                ...state,
                transportInfor: payload.data,
                showError: null,
            }
        case createOrderTransport.CREATE_TRANSPORT_FAIL:
            return {
                ...state,
                showError: payload.showError
            }
        case showResetError.RESET_ERROR:
            return {
                ...state,
                transportInfor: null,
                showError: null,
            }
        default:
            return state;
    }
};

export default transportReducer