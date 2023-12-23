import { item } from "./product";

export interface sagaDetailProduct {
    type: "detail_product";
    id: string
}

export interface selectorDetailProduct<T,N> {
    productDetailReducer: {
        productDetail: item<T,N>;
        showError: T | null;
    }
}

export interface storeProductDetail<T,N> {
    showError: T | null,
    productDetail: item<T,N>[];
}

export interface productDetailPayloadReducer<T,N> {
    showError: T | null,
    data: item<T,N>
}

