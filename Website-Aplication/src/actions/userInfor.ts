import { createAccounts, listFilterAccounts, showResetError, updateAccount } from './../constants/secondaryConstants';
import { updateUserInfor, userInfor } from "@/constants/mainConstants";
import { listAccounts, listAllAccounts, listNotAccounts, listStaff } from "@/constants/secondaryConstants";
import { callLCreateAccount } from '@/types/actions/createUpdateAccount';
import { itemDetailAccount } from '@/types/actions/detailAccount';
import { callListFilterAccount, dataAccount } from "@/types/actions/listAccount";
import { itemStaff } from "@/types/actions/listStaff";
import { callUpdatePasswordProfile, callUpdateProfile, profileUser } from "@/types/actions/profile";
import { itemPagination } from "@/types/pagination";

export const ShowProfile = () => {
    return {
        type: userInfor.GET_USER_INFO,
    };
};

export const ShowProfileSuccess = (data: profileUser<string>) => {
    return {
        type: userInfor.GET_USER_INFO_SUCCESS,
        payload: {
            data,
        },
    };
};
export const ShowProfileFailed = (error: string) => {
    return {
        type: userInfor.GET_USER_INFO_FAIL,
        payload: {
            error,
        },
    };
};

export const UpdateProfile = (idAccount: string,role:string,data:callUpdateProfile) => {
    return {
        type: updateUserInfor.UPDATE_USER_INFO,
        idAccount,
        role,
        data
    };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const UpdateImageProfile = (role:string,data:any) => {
    return {
        type: updateUserInfor.UPDATE_IMAGE_USER_INFO,
        role,
        data
    };
};

export const UpdateImageProfileSuccess = () => {
    return {
        type: updateUserInfor.UPDATE_IMAGE_USER_INFO_SUCCESS,
    };
};

export const UpdatePasswordProfile = (idAccount: string,role:string,data:callUpdatePasswordProfile) => {
    return {
        type: updateUserInfor.UPDATE_PASSWORD_USER_INFO,
        idAccount,
        role,
        data
    };
};

export const UpdatePasswordProfileSuccess = () => {
    return {
        type: updateUserInfor.UPDATE_PASSWORD_USER_INFO_SUCCESS,
    };
};



export const selectStaff = () => {
    return {
        type: listStaff.LIST_STAFF,
    };
};

export const selectStaffSuccess = (data: itemStaff<string>[]) => {
    return {
        type: listStaff.LIST_STAFF_SUCCESS,
        payload: {
            data,
        },
    };
};
export const selectStaffFailed = (error: string) => {
    return {
        type: listStaff.LIST_STAFF_FAIL,
        payload: {
            error,
        },
    };
};

//admin
export const createAccount = (role: string, data: callLCreateAccount<string>) => {
    return {
        type: createAccounts.CREATE_ACCOUNT,
        data,
        role
    }
}
export const createAccountSuccess = (data: itemDetailAccount<string, number>) => {
    return {
        type: createAccounts.CREATE_ACCOUNT_SUCCESS,
        payload: {
            data,
        },
    }
}

export const createAccountFailed = (showError: string) => {
    return {
        type: createAccounts.CREATE_ACCOUNT_FAIL,
        payload: {
            showError,
        },
    }
}
export const updateStatusAccount = (idAccount:string,role:string,status:string,data:callListFilterAccount<string, number>) => {
    return {
        type: updateAccount.UPDATE_ACCOUNT,
        status,
        role,
        idAccount,
        data
    };
};
export const resetError = () => {
    return {
        type: showResetError.RESET_ERROR,
    };
};

export const getAllAccount = () => {
    return {
        type: listAllAccounts.LIST_ALL_ACCOUNT,
    };
};

export const getAllAccountSuccess = (data: itemPagination<number>) => {
    return {
        type: listAllAccounts.LIST_ALL_ACCOUNT_SUCCESS,
        payload: {
            data
        },
    };
};

export const getAccount = (status: string) => {
    return {
        type: listAccounts.LIST_ACCOUNT,
        status
    };
};

export const getAccountSuccess = (data: itemPagination<number>) => {
    return {
        type: listAccounts.LIST_ACCOUNT_SUCCESS,
        payload: {
            data
        },
    };
};

export const getNotAccount = (status: string) => {
    return {
        type: listNotAccounts.LIST_NOT_ACCOUNT,
        status
    };
};

export const getNotAccountSuccess = (data: itemPagination<number>) => {
    return {
        type: listNotAccounts.LIST_NOT_ACCOUNT_SUCCESS,
        payload: {
            data
        },
    };
};

export const getFilterAccount = (data: callListFilterAccount<string, number>) => {
    return {
        type: listFilterAccounts.LIST_FILTER_ACCOUNT,
        data
    };
};

export const getFilterNotAccount = (data: callListFilterAccount<string, number>) => {
    return {
        type: listFilterAccounts.LIST_FILTER_NOT_ACCOUNT,
        data
    };
};

export const getFilterAccountSuccess = (data: dataAccount<number>) => {
    return {
        type: listFilterAccounts.LIST_FILTER_ACCOUNT_SUCCESS,
        payload: {
            data
        },
    };
};

export const getFilterNotAccountSuccess = (data: dataAccount<number>) => {
    return {
        type: listFilterAccounts.LIST_FILTER_NOT_ACCOUNT_SUCCESS,
        payload: {
            data
        },
    };
};


export const getAccountFailed = (error: string) => {
    return {
        type: listAccounts.LIST_ACCOUNT_FAIL,
        payload: {
            error,
        },
    };
};