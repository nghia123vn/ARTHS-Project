
export interface selectorProfile<T> {
    userReducer: {
        infor: itemProfile<T>;
        showError: string | null;
        checkPassword:boolean;
        checkImage: boolean;
    }
}

export interface storeProfileUser<T> {
    showError: string | null;
    infor: profileUser<T>[];
    checkPassword:boolean;
    checkImage: boolean;
}

export interface profileUser<T> {
    type: "get_user_info";
    data: itemProfile<T>
}

export interface profileSaga<T> {
    error: string,
    data: itemProfile<T>
}

export interface payloadUpdateProfile {
    type: "update_user_info",
    role:string,
    idAccount:string,
    data:callUpdateProfile
}

export interface payloadUpdateImageProfile {
    type: "update_image_user_info",
    role:string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data:any;
}

export interface payloadUpdatePasswordProfile {
    type: "update_password_user_info",
    role:string,
    idAccount:string,
    data:callUpdatePasswordProfile
}
export interface callUpdateProfile {
    fullName: string,
    gender: string,
}

export interface callUpdatePasswordProfile {
    oldPassword: string,
    newPassword: string,
}

export interface itemProfile<T> {
    id: T;
    fullName: T;
    gender: T;
    avatar: T | null;
    phoneNumber: T;
    role: T;
    status: T;
    createAt: T;
}