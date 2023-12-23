import { createOrderTransport, detailOnlineOrder, listOnlineOrderConstant, updateOnlineOrder } from "@/constants/mainConstants"
import { callTranSport, callUpdateOnlineOrder, dataTransport, itemOnlineOrder, listOnlineOrder } from "@/types/actions/listOnlineOrder";
import { callFilterOrder } from "@/types/actions/listOrder";

export const getOnlineOrder = (data: callFilterOrder<string, number>) => {
    return {
        type: listOnlineOrderConstant.LIST_ONLINE_ORDER,
        data
    }
};

export const getOnlineOrderSuccess = (data: listOnlineOrder<string, number>) => {
    return {
        type: listOnlineOrderConstant.LIST_ORDER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getOnlineOrderPaidSuccess = (data: listOnlineOrder<string, number>) => {
    return {
        type: listOnlineOrderConstant.LIST_ORDER_PAID_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getOnlineOrderConfirmSuccess = (data: listOnlineOrder<string, number>) => {
    return {
        type: listOnlineOrderConstant.LIST_ORDER_CONFIRM_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getOnlineOrderTransportSuccess = (data: listOnlineOrder<string, number>) => {
    return {
        type: listOnlineOrderConstant.LIST_ORDER_TRANSPORT_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getOnlineOrderFinishedSuccess = (data: listOnlineOrder<string, number>) => {
    return {
        type: listOnlineOrderConstant.LIST_ORDER_FINISH_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getOnlineOrderCanceledSuccess = (data: listOnlineOrder<string, number>) => {
    return {
        type: listOnlineOrderConstant.LIST_ORDER_CANCELED_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getOnlineOrderFailed = (error: string) => {
    return {
        type: listOnlineOrderConstant.LIST_ORDER_FAIL,
        payload: {
            error,
        },
    };
};

export const onlineOrderUpdate = (idOrder: string, data: callUpdateOnlineOrder<string>) => {
    return {
        type: updateOnlineOrder.UPDATE_ONLINE_ORDER,
        data,
        idOrder
    }
};
export const postTransport = (data: callTranSport<string, number>, statusOnline: callUpdateOnlineOrder<string>) => {
    return {
        type: createOrderTransport.CREATE_TRANSPORT,
        data,
        statusOnline,
    }
};

export const postTransportSuccess = (data: dataTransport) => {
    return {
        type: createOrderTransport.CREATE_TRANSPORT_SUCCESS,
        payload: {
            data,
        },

    }
};

export const postTransportFailed = (error: string) => {
    return {
        type: createOrderTransport.CREATE_TRANSPORT_FAIL,
        payload: {
            error,
        },
    };
};

export const getDetailOnlineOrder = (id: string) => {
    return {
        type: detailOnlineOrder.DETAIL_ONLINE_ORDER,
        id
    };
};

export const getDetailOnlineOrderSuccess = (data: itemOnlineOrder<string, number>) => {
    return {
        type: detailOnlineOrder.DETAIL_ONLINE_ORDER_SUCCESS,
        payload: {
            data,
        },
    };
};
export const getDetailOnlineOrderFailed = (error: string) => {
    return {
        type: detailOnlineOrder.DETAIL_ONLINE_ORDER_FAIL,
        payload: {
            error,
        },
    };
};

