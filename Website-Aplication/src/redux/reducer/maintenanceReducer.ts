import { listMaintenance } from '@/constants/mainConstants';
import { maintenanceSaga, storeMaintenance } from '@/types/actions/listMaintenance';
const initialState: storeMaintenance<string,number> = {
    maintenanceInfor: [],
    showError: null,
};



const maintenanceReducer = (
    state: storeMaintenance<string,number> = initialState,
    { type, payload }: { type: string; payload: maintenanceSaga<string,number> }
) => {
    switch (type) {
        case listMaintenance.LIST_MAINTENANCE_SUCCESS:
            return {
                ...state,
                maintenanceInfor: payload.data,

            }

        case listMaintenance.LIST_MAINTENANCE_FAIL:
            return {
                ...state,
                maintenanceInfor: [],
            }
        default:
            return state;
    }
};

export default maintenanceReducer;