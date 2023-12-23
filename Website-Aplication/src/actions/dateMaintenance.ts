import { listMaintenance } from "@/constants/mainConstants";
import { callListMaintenance, itemMaintenance } from "@/types/actions/listMaintenance";

export const getShowMaintenance = (data:callListMaintenance<string,number>) => {
    return {
        type: listMaintenance.LIST_MAINTENANCE,
        data
    };
};

export const getShowMaintenanceSuccess = (data: itemMaintenance<string>) => {
    return {
        type: listMaintenance.LIST_MAINTENANCE_SUCCESS,
        payload: {
            data
        },
    };
};

export const getShowMaintenanceFailed = (error: string) => {
    return {
        type: listMaintenance.LIST_MAINTENANCE_FAIL,
        payload: {
            error,
        },
    };
};

export const postMaintenance = (maintenanceId: string) => {
    return {
        type: listMaintenance.POST_MAINTENANCE,
        maintenanceId
    }
};