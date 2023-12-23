import { detailDiscount, discountCreate, discountUpdate, listDiscount } from "@/constants/secondaryConstants";
import { detaiDiscount } from "@/types/actions/detailDiscount";
import { callListDiscount, dataDiscount } from "@/types/actions/listDiscout";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postCreateDiscount = (data:any) => {
    return {
        type: discountCreate.DISCOUNT_CREATE,
        data
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateDiscount = (discountId:string,data:any) => {
    return {
        type: discountUpdate.DISCOUNT_UPDATE,
        data,
        discountId
    };
};

export const updateStatusDiscount = (discountId:string,data:callListDiscount<string,number>) => {
    return {
        type: discountUpdate.DISCOUNT_UPDATE_STATUS,
        discountId,
        data
    };
};

export const getDiscountChoose = (pageSize:number) => {
    return {
        type: listDiscount.GET_LIST_DISCOUNT_CHOOSE,
        pageSize
    };
};

export const getDiscount = (data: callListDiscount<string,number>) => {
    return {
        type: listDiscount.GET_LIST_DISCOUNT,
        data
    };
};

export const getDiscountSuccess = (data:dataDiscount<string,number>) => {
    return {
        type: listDiscount.GET_LIST_DISCOUNT_SUCCESS,
        payload: {
            data
        },
    };
};
export const getNotDiscountSuccess = (data:dataDiscount<string,number>) => {
    return {
        type: listDiscount.GET_LIST_NOT_DISCOUNT_SUCCESS,
        payload: {
            data
        },
    };
};
export const getDiscountFailed = (error:string) => {
    return {
        type: listDiscount.GET_LIST_DISCOUNT_FAIL,
        payload: {
            error,
        },
    };
};

export const getDetailDiscount = (discountId:string) => {
    return {
        type: detailDiscount.DETAIL_DISCOUNT,
        discountId
    };
};

export const getDetailDiscountSuccess = (data:detaiDiscount<string,number>) => {
    return {
        type: detailDiscount.DETAIL_DISCOUNT_SUCCESS,
        payload: {
            data
        },
    };
};

export const  getDetailDiscountFailed = (showError:string) => {
    return {
        type: detailDiscount.DETAIL_DISCOUNT_FAIL,
        payload: {
            showError,
        },
    };
};