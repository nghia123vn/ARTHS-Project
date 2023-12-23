import { listRevenue, listStatics } from "@/constants/mainConstants";
import { itemRevenue, itemStatics } from "@/types/revenue";

export const getRevenue = (pageNumber: number, filters:any) => {
    return {
        type: listRevenue.LIST_REVENUE,
        pageNumber,
        filters,
    };
};

export const getRevenueSuccess = (data: itemRevenue<string, number>) => {
    return {
        type: listRevenue.LIST_REVENUE_SUCCESS,
        payload: {
            data,
        },
    };
};

export const getRevenueFailed = (error: string) => {
    return {
        type: listRevenue.LIST_REVENUE_FAIL,
        payload: {
            error,
        },
    };
};

export const getStatics = (filters:any) => {
    return {
        type: listStatics.LIST_STATICS,
        filters,
    };
};

export const getStaticsSuccess = (data: itemStatics<string, number>) => {
    return {
        type: listStatics.LIST_STATICS_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getStaticsFailed = (error: string) => {
    return {
        type: listStatics.LIST_STATICS_FAIL,
        payload: {
            error,
        },
    };
};