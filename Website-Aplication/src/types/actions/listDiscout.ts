import { itemPagination } from "../pagination";

export interface selectorDiscount<T, N> {
    discountReducer: {
        discountInfor: dataDiscount<T, N>;
        notDiscountInfor: dataDiscount<T, N>;
        showError: T | null;
    }
}

export interface storeDiscount<T, N> {
    showError: T | null,
    discountInfor: discountSaga<T, N>[];
    notDiscountInfor: discountSaga<T, N>[];
}

export interface discountSaga<T, N> {
    data: dataDiscount<T, N>
}

export interface payloadDiscountChoose<N> {
    type: "list_discounts_choose",
    pageSize: N
}

export interface payloadDiscount<T,N> {
    type: "list_discounts",
    data:callListDiscount<T, N>
}

export interface dataDiscount<T, N> {
    data: itemDiscount<T, N>[];
    pagination: itemPagination<N>
}

export interface itemDiscount<T, N> {
    id: T,
    title: T,
    discountAmount: N,
    startDate: Date,
    endDate: Date,
    imageUrl: T,
    description: T,
    status: T
}

export interface callListDiscount<T, N> {
    pageNumber:N,
    status:T,
    title:T,
}