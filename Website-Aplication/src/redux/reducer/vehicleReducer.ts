import { createVehicles, listVehicles } from "@/constants/secondaryConstants";
import { storeVehicleProduct, vehicleProductSaga } from "@/types/actions/listVehicle";



const initialState: storeVehicleProduct<string> = {
    vehicleProduct: [],
    createVehicleProduct:null,
    showError: null,
};



const vehicleProductReducer = (
    state: storeVehicleProduct<string> = initialState,
    { type, payload }: { type: string; payload: vehicleProductSaga<string> }
) => {
    switch (type) {
        case listVehicles.GET_LIST_VEHICLES_SUCCESS:
            return {
                ...state,
                vehicleProduct: payload.data,
            }
        
            case createVehicles.CREATE_VEHICLES_SUCCESS:
                return {
                    ...state,
                    createVehicleProduct: payload.data,
                }

        case listVehicles.GET_LIST_VEHICLES_FAil:
            return {
                ...state,
                showError: payload.data,
            }
        default:
            return state;
    }
};

export default vehicleProductReducer;