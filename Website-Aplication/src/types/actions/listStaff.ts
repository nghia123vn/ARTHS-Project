
export interface selectorListStaff<T> {
    listStaffReducer: {
        listStaff: itemStaff<T>[];
        showError: T | null;
    }
}

export interface storeListStaff<T> {
    showError: T | null,
    listStaff: listStaffSaga<T>[];
}

export interface listStaffSaga<T> {
    data: itemStaff<T>
}

export interface itemStaff<T> {
    id: T,
    fullName: T,
    gender: T,
    avatar: T,
    phoneNumber: T,
    role: T,
    status: T,
    createAt: Date
}



