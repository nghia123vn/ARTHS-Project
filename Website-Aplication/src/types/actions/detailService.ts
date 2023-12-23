import { itemService } from "./listService";


export interface payloadDetailService<T> {
    type: "detail_services";
    serviceId: T
}

export interface selectorDetailService<T,N> {
    serviceDetailReducer: {
        serviceDetail: itemService<T,N>;
        showError: T | null;
    }
}

export interface storeServiceDetail<T,N> {
    showError: T | null,
    serviceDetail: itemService<T,N>[];
}

export interface serviceDetailPayloadReducer<T,N> {
    showError: T | null,
    data: itemService<T,N>
}

