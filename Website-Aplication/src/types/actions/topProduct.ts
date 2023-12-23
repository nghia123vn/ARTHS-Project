import { itemTopProduct } from "./product";

export interface selectorTopProduct<T, N> {
    topProductReducer: {
        topProductInfor: itemTopProduct<T, N>[];
        showError: T | null;
    }
}

export interface storeTopProduct<T, N> {
    showError: T | null,
    topProductInfor: itemTopProduct<T, N>[];
}

export interface topProductSaga<T, N> {
    data: itemTopProduct<T, N>[],
    error: T | null;
}