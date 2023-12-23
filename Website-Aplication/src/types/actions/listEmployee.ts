import { itemAccount } from "./listAccount";

export interface selectorListEmployee {
    listEmployeeReducer: {
        employeeStaffInfor: itemAccount[]
        employeeTellerInfor: itemAccount[]
        showError: string | null;
    }
}

export interface storeListFilterEmployee {
    showError: string | null;
    employeeStaffInfor: itemAccount[]
    employeeTellerInfor: itemAccount[]
}

export interface listEmployeeSaga {
    showError: string,
    data: itemAccount[]
}

export interface payloadListEmployee<T> {
    type: "get_employee",
    data: callListFilterEmployee<T>,
    role: T
}

export interface dataEmployee {
    data: itemAccount[];
}

export interface callListFilterEmployee<T> {
    status: T,
    fullName: T,
}