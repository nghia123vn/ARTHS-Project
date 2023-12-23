import { itemPagination } from "../pagination";

export interface selectorMaintenance<T, N> {
    maintenanceReducer: {
        maintenanceInfor: dataMaintenance<T, N>;
        showError: T | null;
    }
}

export interface storeMaintenance<T, N> {
    showError: T | null,
    maintenanceInfor: maintenanceSaga<T, N>[];
}

export interface maintenanceSaga<T, N> {
    data: dataMaintenance<T, N>
}

export interface payloadMaintenance<T, N> {
    type: "list_maintenance",
    data: callListMaintenance<T, N>
}

export interface dataMaintenance<T, N> {
    data: itemMaintenance<T>[];
    pagination: itemPagination<N>
}

export interface itemMaintenance<T> {
    id: T,
    nextMaintenanceDate: Date,
    reminderDate: Date,
    remiderSend: boolean,
    customer: {
        accountId: T,
        phoneNumber: T,
        fullName: T,
        gender: T,
        address: T,
        avatar: T
    },
    orderDetail: {
        id: T,
        quantity: number,
        price: number,
        instUsed: boolean,
        subTotalAmount: number,
        warrantyStartDate: Date,
        warrantyEndDate: Date,
        createAt: Date,
        repairService: {
            id: T,
            name: T,
            duration: number,
            price: number,
            discountAmount: number,
            image: T
        },
    }
}

export interface callListMaintenance<T, N> {
    pageNumber: N,
    fullName: T,
}