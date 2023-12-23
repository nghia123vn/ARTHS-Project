import { productInfor, productFilter, detailProduct, productCreate, productUpdate, topProduct } from "@/constants/mainConstants";
import { createVehicles, listVehicles, listWarranty, productCategory, removeVehicles } from "@/constants/secondaryConstants";
import { itemCategoryProduct } from "@/types/actions/categoryPr";
import {itemFilter, itemFilterDiscount } from "@/types/actions/filterCreate";
import { itemVehicleProduct } from "@/types/actions/listVehicle";
import { itemWarrantyProduct } from "@/types/actions/listWarranty";
import { callProduct, callSortProduct, item, itemProduct, itemTopProduct } from "@/types/actions/product";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postCreateProduct = (data:any) => {
    return {
        type: productCreate.PRODUCT_CREATE,
        data
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateProduct = (idProduct:string,data:any) => {
    return {
        type: productUpdate.PRODUCT_UPDATE,
        data,
        idProduct
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateStatusProduct = (idProduct:string,status:string,data:any) => {
    return {
        type: productUpdate.PRODUCT_UPDATE_STATUS,
        status,
        idProduct,
        data
    };
};

export const ShowProduct = (data:callProduct<string,number>) => {
    return {
        type: productInfor.GET_PRODUCT_INFO,
        data
    };
};

export const ShowTopProduct = () => {
    return {
        type: topProduct.GET_TOP_PRODUCT,
    };
};

export const ShowTopProductSuccess = (data:itemTopProduct<string,number>[]) => {
    return {
        type: topProduct.GET_PRODUCT_TOP_SUCCESS,
        payload: {
            data,
        },
    };
};

export const ShowTopProductFailed = (error:string) => {
    return {
        type: topProduct.GET_PRODUCT_TOP_FAIL,
        payload: {
            error,
        },
    };
};

export const SortProduct = (data:callSortProduct<string,number>) => {
    return {
        type: productInfor.GET_SORT_PRODUCT_INFO,
        data
    };
};

export const ShowProductSuccess = (data:itemProduct<string,number>) => {
    return {
        type: productInfor.GET_PRODUCT_INFO_SUCCESS,
        payload: {
            data,
        },
    };
};
export const ShowProductFailed = (error:string) => {
    return {
        type: productInfor.GET_PRODUCT_INFO_FAIL,
        payload: {
            error,
        },
    };
};

export const CategoryProduct = () => {
    return {
        type: productCategory.GET_PRODUCT_CATEGORY,
    };
};

export const CategoryProductSuccess = (data:itemCategoryProduct<string>[]) => {
    return {
        type: productCategory.GET_PRODUCT_CATEGORY_SUCCESS,
        payload: {
            data,
        },
    };
};
export const CategoryProductFailed = (error:string) => {
    return {
        type: productCategory.GET_PRODUCT_CATEGORY_FAIL,
        payload: {
            error,
        },
    };
};

export const WarrantyProduct = () => {
    return {
        type: listWarranty.GET_LIST_WARRANTY,
    };
};

export const WarrantyProductSuccess = (data:itemWarrantyProduct<string,number>[]) => {
    return {
        type: listWarranty.GET_LIST_WARRANTY_SUCCESS,
        payload: {
            data,
        },
    };
};
export const WarrantyProductFailed = (error:string) => {
    return {
        type: listWarranty.GET_LIST_WARRANTY_FAIL,
        payload: {
            error,
        },
    };
};


export const getVehicleProduct = () => {
    return {
        type: listVehicles.GET_LIST_VEHICLES,
    };
};

export const vehicleProductSuccess = (data:itemVehicleProduct<string>[]) => {
    return {
        type: listVehicles.GET_LIST_VEHICLES_SUCCESS,
        payload: {
            data,
        },
    };
};
export const vehicleProductFailed = (error:string) => {
    return {
        type: listVehicles.GET_LIST_VEHICLES_FAil,
        payload: {
            error,
        },
    };
};

export const createVehicle = (vehicleName:string)=>{
    return {
        type: createVehicles.CREATE_VEHICLES,
        vehicleName
    }
}
export const deleteVehicle = (vehicleId:string)=>{
    return {
        type: removeVehicles.REMOVE_VEHICLES,
        vehicleId
    }
}

export const createVehicleSuccess = (data:itemVehicleProduct<string>) => {
    return {
        type: createVehicles.CREATE_VEHICLES_SUCCESS,
        payload: {
            data,
        },
    };
};

export const FilterProduct = (data:itemFilter<string,number>) => {
    return {
        type: productFilter.GET_PRODUCT_FILTER,
        data
    };
};
export const FilterProductDiscount = (data:itemFilterDiscount<string,number>) => {
    return {
        type: productFilter.GET_PRODUCT_FILTER_DISCOUNT,
        data
    };
};

export const FilterProductSuccess = (data:itemProduct<string,number>) => {
    return {
        type: productFilter.GET_PRODUCT_FILTER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const FilterProductFailed = (error:string) => {
    return {
        type: productFilter.GET_PRODUCT_FILTER_FAIL,
        payload: {
            error,
        },
    };
};

export const getDetailProduct = (id: string) => {
    return {
        type: detailProduct.DETAIL_PRODUCT,
        id
    };
};

export const getDetailProductSuccess = (data: item<string, number>) => {
    return {
        type: detailProduct.DETAIL_PRODUCT_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getDetailProductFailed = (error: string) => {
    return {
        type: detailProduct.DETAIL_PRODUCT_FAIL,
        payload: {
            error,
        },
    };
};