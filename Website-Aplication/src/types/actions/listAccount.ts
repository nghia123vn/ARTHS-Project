import { itemPagination } from "../pagination"

export interface selectorListAccount<T, N> {
    accountReducer: {
        ListAllAccount: itemPagination<N>;
        ListAccount: itemPagination<N>;
        ListNotAccount: itemPagination<N>;
        showError: T | null;
    }
}

export interface selectorListFilterAccount<T, N> {
    filterAccountReducer: {
        ListFilterAccount: dataAccount<N>;
        ListFilterNotAccount: dataAccount<N>;
        showError: T | null;
    }
}

export interface storeListAccount<T, N> {
    showError: T | null;
    ListAllAccount: itemPagination<N>| null;
    ListAccount: itemPagination<N>| null;
    ListNotAccount: itemPagination<N>| null;
}

export interface storeListFilterAccount<T, N> {
    showError: T | null;
    ListFilterAccount: listFilterAccountSaga<N>[];
    ListFilterNotAccount: listFilterAccountSaga<N>[];
}

export interface listAccountSaga<N> {
    showError: string,
    data: itemPagination<N>
}

export interface listFilterAccountSaga<N> {
    showError: string,
    data: dataAccount<N>
}

export interface payloadListAccount<T> {
    type: "list_account",
    status: T,
}

export interface payloadListNotAccount<T> {
    type: "list_not_account",
    status: T,
}

export interface payloadFilterAccount<T, N> {
    type: "list_filter_account",
    data: callListFilterAccount<T, N>
}

export interface payloadFilterNotAccount<T, N> {
    type: "list_filter_not_account",
    data: callListFilterAccount<T, N>
}


export interface callListFilterAccount<T, N> {
    pageNumber: N,
    status: T,
    fullName: T,
}

export interface dataAccount<N> {
    pagination: itemPagination<N>;
    data: itemAccount[];
}

export interface itemAccount {
    id: string
    fullName: string
    gender: string
    avatar: string
    phoneNumber: string
    address: string
    role: string
    status: string
    createAt: Date
}