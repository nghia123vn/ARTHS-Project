import { listOrder, detailOrder, updateUserOrder, updateProductOrdered, payWithCash, listOrderPaid } from "@/constants/mainConstants";
import { createWarranty } from "@/constants/secondaryConstants";
import {inStoreOrderDetails, itemDetailOrder, warrantyCreate } from "@/types/actions/detailOrder";
import { callFilterOrder, itemOrder } from "@/types/actions/listOrder";
import { itemCustomer, itemStaffProduct } from "@/types/actions/updateCustomerOrder";


export const getOrder = (number: number,excludeOrderStatus:string) => {
    return {
        type: listOrder.LIST_ORDER,
        number,
        excludeOrderStatus,
    };
};

export const getFilterOrder = (data:callFilterOrder<string,number>) => {
    return {
        type: listOrder.LIST_FILTER_ORDER,
        data
    };
};

export const getOrderSuccess = (data: itemOrder<string, number>) => {
    return {
        type: listOrder.LIST_ORDER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getOrderFailed = (error: string) => {
    return {
        type: listOrder.LIST_ORDER_FAIL,
        payload: {
            error,
        },
    };
};

export const getOrderPaid = (number: number,orderStatus:string) => {
    return {
        type: listOrderPaid.LIST_ORDER_PAID,
        number,
        orderStatus,
    };
};

export const getFilterOrderPaid = (data:callFilterOrder<string,number>) => {
    return {
        type: listOrderPaid.LIST_FILTER_ORDER_PAID,
        data
    };
};

export const getOrderPaidSuccess = (data: itemOrder<string, number>) => {
    return {
        type: listOrderPaid.LIST_ORDER_PAID_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getOrderPaidFailed = (error: string) => {
    return {
        type: listOrderPaid.LIST_ORDER_PAID_FAIL,
        payload: {
            error,
        },
    };
};

export const getDetailOrder = (id: string) => {
    return {
        type: detailOrder.DETAIL_ORDER,
        id
    };
};

export const getDetailOrderSuccess = (data: itemDetailOrder<string, number>) => {
    return {
        type: detailOrder.DETAIL_ORDER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getDetailOrderFailed = (error: string) => {
    return {
        type: detailOrder.DETAIL_ORDER_FAIL,
        payload: {
            error,
        },
    };
};

export const updateStatusOrder = (idOrder: string, statusOrder:string) => {
    return {
        type: payWithCash.PAY_WITH_CASH,
        idOrder,
        statusOrder,

    };
};

export const updateStatusOrderSuccess = (data: inStoreOrderDetails<string, number>) => {
    return {
        type: payWithCash.PAY_WITH_CASH_SUCCESS,
        payload: {
            data,
        },
    };
};
export const updateStatusOrderFailed = (error: string) => {
    return {
        type: payWithCash.PAY_WITH_CASH_FAIL,
        payload: {
            error,
        },
    };
};

export const updateCustomerOrder = (idOrder: string, data: itemCustomer<string>) => {
    return {
        type: updateUserOrder.UPDATE_USER_ORDER,
        idOrder,
        data,

    };
};

export const updateCustomerOrderSuccess = (data: inStoreOrderDetails<string, number>) => {
    return {
        type: updateUserOrder.UPDATE_USER_ORDER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const updateCustomerOrderFailed = (error: string) => {
    return {
        type: updateUserOrder.UPDATE_USER_ORDER_FAIL,
        payload: {
            error,
        },
    };
};

export const updateProductOrder = (idOrder: string, data: itemStaffProduct<string,number>) => {
    return {
        type: updateProductOrdered.UPDATE_PRODUCT_ORDER,
        idOrder,
        data,

    };
};

export const updateProductOrderSuccess = (data: inStoreOrderDetails<string, number>) => {
    return {
        type: updateProductOrdered.UPDATE_PRODUCT_ORDER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const updateProductOrderFailed = (showError: string) => {
    return {
        type: updateProductOrdered.UPDATE_PRODUCT_ORDER_FAIL,
        payload: {
            showError,
        },
    };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postWarranty = (data:warrantyCreate,idOrder:string) => {
    return {
        type: createWarranty.CREATE_WARRANTY,
        data,
        idOrder
    }
}