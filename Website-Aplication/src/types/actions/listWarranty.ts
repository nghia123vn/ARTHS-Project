
export interface selectorWarrantyProduct<T,N> {
    warrantyReducer: {
        warrantyProduct: itemWarrantyProduct<T,N>[];
        showError: T | null;
    }
}

export interface storeWarrantyProduct<T,N> {
    showError: T | null,
    warrantyProduct: warrantyProductSaga<T,N>[];
}

export interface warrantyProductSaga<T,N> {
    data: itemWarrantyProduct<T,N>
}

export interface itemWarrantyProduct<T, N> {
    id: T;
    duration: N,
    description: T
}



