import { detailServices, listServices, serviceCreate, serviceUpdate } from "@/constants/secondaryConstants";
import { callServiceDiscount, serviceFilter, sortService } from "@/types/actions/filterService";
import { callService, dataService, itemService } from "@/types/actions/listService";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postCreateService = (data:any) => {
    return {
        type: serviceCreate.SERVICE_CREATE,
        data
    };
};

export const getServices = (data: callService<string,number>) => {
    return {
        type: listServices.GET_LIST_SERVICES,
        data
    };
};
//check
export const getFilterServices = (data:serviceFilter<string,number>) => {
    return {
        type: listServices.GET_LIST_SERVICES_FILTER,
        data
    };
};

export const FilterServiceDiscount = (data:callServiceDiscount<string,number>) => {
    return {
        type: listServices.GET_LIST_SERVICES_DISCOUNT,
        data
    };
};

export const getSortServices = (data: sortService<string,number>) => {
    return {
        type: listServices.GET_SORT_SERVICES,
        data
    };
};
//


export const getServicesSuccess = (data:dataService<string,number>) => {
    return {
        type: listServices.GET_LIST_SERVICES_SUCCESS,
        payload: {
            data
        },
    };
};
export const getServicesFailed = (error:string) => {
    return {
        type: listServices.GET_LIST_SERVICES_FAIL,
        payload: {
            error,
        },
    };
};

export const detailService = (serviceId:string) => {
    return {
        type: detailServices.DETAIL_SERVICES,
        serviceId
    };
};

export const detailServiceSuccess = (data:itemService<string,number>) => {
    return {
        type: detailServices.DETAIL_SERVICES_SUCCESS,
        payload: {
            data
        },
    };
};
export const detailServiceFailed = (error:string) => {
    return {
        type: detailServices.DETAIL_SERVICES_FAIL,
        payload: {
            error,
        },
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateService = (serviceId:string,data:any) => {
    return {
        type: serviceUpdate.SERVICE_UPDATE,
        data,
        serviceId
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateStatusService = (idService:string,status:string,data:any) => {
    return {
        type: serviceUpdate.SERVICE_UPDATE_STATUS,
        status,
        idService,
        data
    };
}