import { itemDetailAccount } from "./detailAccount";
import { callListFilterAccount } from "./listAccount";

export interface selectorCreateUpdateAccount<T, N> {
    createUpdateReducer: {
        accountInfor: itemDetailAccount<T, N>
        showError: T | null;
    }
}

export interface storeCreateAccount<T, N> {
    showError: string | null;
    accountInfor: itemDetailAccount<T, N> | null;
}

export interface createAccountSaga<T, N> {
    showError: T,
    data: itemDetailAccount<T, N>
}

export interface payloadCreateAccount<T> {
    type: "create_account",
    role: T,
    data: callLCreateAccount<T>
}

export interface payloadUpdateAccount<T,N> {
    type: "update_account",
    status:T,
    role:T,
    idAccount:T,
    data:callListFilterAccount<T, N>
}


export interface callLCreateAccount<T> {
    phoneNumber: T,
    password: T,
    fullName: T,
    gender: T,
}