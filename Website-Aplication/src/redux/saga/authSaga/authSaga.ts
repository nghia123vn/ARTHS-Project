import { payloadUpdateSetting } from './../../../types/actions/typeSetting';
import { call, put, takeEvery } from 'redux-saga/effects';
import { updateUserInfor, userInfor } from '../../../constants/mainConstants';
import { privateService } from '@/services/privateService';
import { AxiosResponse } from 'axios';
import { ShowProfile, ShowProfileFailed, ShowProfileSuccess, UpdateImageProfileSuccess, UpdatePasswordProfileSuccess, createAccountFailed, createAccountSuccess, getAccount, getAccountFailed, getAccountSuccess, getAllAccount, getAllAccountSuccess, getFilterAccount, getFilterAccountSuccess, getFilterNotAccount, getFilterNotAccountSuccess, getNotAccount, getNotAccountSuccess, selectStaffFailed, selectStaffSuccess } from '@/actions/userInfor';
import { createAccounts, detailEmployee, listAccounts, listAllAccounts, listEmployee, listFilterAccounts, listNotAccounts, listStaff, showSetting, updateAccount, updateSetting } from '@/constants/secondaryConstants';
import { itemAccount, payloadFilterAccount, payloadFilterNotAccount, payloadListAccount, payloadListNotAccount } from '@/types/actions/listAccount';
import { adminService } from '@/services/adminService';
import { payloadCreateAccount, payloadUpdateAccount } from '@/types/actions/createUpdateAccount';
import { roleAccount, typeAccount } from '@/types/typeAuth';
import { payloadListEmployee } from '@/types/actions/listEmployee';
import { detailEmployeeFailed, detailEmployeeStaffSuccess, getEmployeeFailed, getEmployeeStaffSuccess, getEmployeeTellerSuccess } from '@/actions/employee';
import { payloadDetailAccount } from '@/types/actions/detailAccount';
import { ownerService } from '@/services/ownerService';
import { getShowSetting, getShowSettingFailed, getShowSettingSuccess } from '@/actions/setting';
import { payloadUpdateImageProfile, payloadUpdatePasswordProfile, payloadUpdateProfile } from '@/types/actions/profile';

function* userProfile() {
    try {
        const resp: AxiosResponse = yield call(privateService.getProfile);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(ShowProfileSuccess(data));
        } else {
            yield put(ShowProfileFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(ShowProfileFailed(msg));
    }

}
function* updateProfile(payload: payloadUpdateProfile) {
    try {
        const resp: AxiosResponse = yield call(privateService.updateProfile, payload.idAccount,payload.role,payload.data);
        const { status, data } = resp;
        if (data && status === 201) {
            yield put(ShowProfile());
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.response.data.Message;
        console.log("msg", msg);
        yield put(ShowProfileFailed(msg));
    }
}

function* updateImageProfile(payload: payloadUpdateImageProfile) {
    try {
        const resp: AxiosResponse = yield call(privateService.updateImageProfile,payload.role,payload.data);
        const { status, data } = resp;
        if (data && status === 201) {
            yield put(UpdateImageProfileSuccess());
            yield put(ShowProfile());
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.response.data.Message;
        console.log("msg", msg);
        yield put(ShowProfileFailed(msg));
    }
}
function* updatePasswordProfile(payload: payloadUpdatePasswordProfile) {
    try {
        const resp: AxiosResponse = yield call(privateService.updatePasswordProfile, payload.idAccount,payload.role,payload.data);
        const { status, data } = resp;
        if (data && status === 201) {
            yield put(UpdatePasswordProfileSuccess());
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.response.data.Message;
        console.log("msg", msg);
        yield put(ShowProfileFailed(msg));
    }
}
function* getListStaff() {
    try {
        const resp: AxiosResponse = yield call(privateService.getListStaff);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(selectStaffSuccess(data));
        } else {
            yield put(selectStaffFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(selectStaffFailed(msg));
    }

}

function* postAccount(payload: payloadCreateAccount<string>) {
    try {
        const resp: AxiosResponse = yield call(adminService.postAccount, payload.role, payload.data);
        const { status, data } = resp;
        if (data && status === 201) {
            yield put(getAllAccount());
            yield put(getAccount(typeAccount.InActive));
            const dataFilter = {
                pageNumber: 0,
                status: typeAccount.InActive,
                fullName: "",
            }
            yield put(getFilterAccount(dataFilter));
            yield put(createAccountSuccess(data));
        } else {
            yield put(createAccountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.response.data.Message;
        console.log("msg", msg);
        yield put(createAccountFailed(msg));
    }
}

function* putAccount(payload: payloadUpdateAccount<string,number>) {
    try {
        const resp: AxiosResponse = yield call(adminService.updateAccount, payload.idAccount,payload.role,payload.status);
        const { status, data } = resp;
        if (data && status === 201) {
            yield put(getAllAccount());
            yield put(getAccount(typeAccount.InActive));
            yield put(getNotAccount(typeAccount.InActive));
            yield put(getFilterAccount(payload.data));
            yield put(getFilterNotAccount(payload.data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.response.data.Message;
        console.log("msg", msg);
        yield put(createAccountFailed(msg));
    }
}


function* getFilterListAccount(payload: payloadFilterAccount<string, number>) {
    try {
        const resp: AxiosResponse = yield call(adminService.getFilterAccount, payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getFilterAccountSuccess(data));
        } else {
            yield put(getAccountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getAccountFailed(msg));
    }

}

function* getFilterListNotAccount(payload: payloadFilterNotAccount<string, number>) {
    try {
        const resp: AxiosResponse = yield call(adminService.getFilterNotAccount, payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getFilterNotAccountSuccess(data));
        } else {
            yield put(getAccountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getAccountFailed(msg));
    }

}

function* getListAllAccount() {
    try {
        const resp: AxiosResponse = yield call(adminService.getAllAccount);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getAllAccountSuccess(data.pagination));
        } else {
            yield put(getAccountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getAccountFailed(msg));
    }

}

function* getListAccount(payload: payloadListAccount<string>) {
    try {
        const resp: AxiosResponse = yield call(adminService.getAccount, payload.status);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getAccountSuccess(data.pagination));
        } else {
            yield put(getAccountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getAccountFailed(msg));
    }

}

function* getListNotAccount(payload: payloadListNotAccount<string>) {
    try {
        const resp: AxiosResponse = yield call(adminService.getNotAccount, payload.status);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getNotAccountSuccess(data.pagination));
        } else {
            yield put(getAccountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getAccountFailed(msg));
    }
}

function* getEmployee(payload: payloadListEmployee<string>) {
    try {
        const resp: AxiosResponse = yield call(privateService.getListEmployees, payload.role,payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            if(data.every((item:itemAccount) => item.role ===roleAccount.Teller)){
                yield put(getEmployeeTellerSuccess(data));
            }
            if(data?.every((item:itemAccount)=> item.role ===roleAccount.Staff)){
                yield put(getEmployeeStaffSuccess(data));
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.response.data.Message;
        yield put(getEmployeeFailed(msg));
    }

}

function* detailAccount(payload: payloadDetailAccount<string>) {
    try {
        const resp: AxiosResponse = yield call(privateService.getDetailEmployees, payload.role,payload.employeeId);
        const { status, data } = resp;
        if (data && status === 200) {
                yield put(detailEmployeeStaffSuccess(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.response.data.Message;
        yield put(detailEmployeeFailed(msg));
    }
}

function* getSetting() {
    try {
        const resp: AxiosResponse = yield call(ownerService.getSetting);
        const { status, data } = resp;
        if (data && status === 200) {
                yield put(getShowSettingSuccess(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.response.data.Message;
        yield put(getShowSettingFailed(msg));
    }
}

function* updateDataSetting(payload:payloadUpdateSetting) {
    try {
        const resp: AxiosResponse = yield call(ownerService.updateSetting,payload.data);
        const { status, data } = resp;
        if (data && status === 201) {
                yield put(getShowSetting());
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.response.data.Message;
        yield put(getShowSettingFailed(msg));
    }
}


export function* lookupUser() {
    yield takeEvery(userInfor.GET_USER_INFO, userProfile);
    yield takeEvery(updateUserInfor.UPDATE_USER_INFO, updateProfile);
    yield takeEvery(updateUserInfor.UPDATE_IMAGE_USER_INFO, updateImageProfile);
    yield takeEvery(updateUserInfor.UPDATE_PASSWORD_USER_INFO, updatePasswordProfile);
    yield takeEvery(listStaff.LIST_STAFF, getListStaff);
    yield takeEvery(createAccounts.CREATE_ACCOUNT, postAccount);
    yield takeEvery(updateAccount.UPDATE_ACCOUNT, putAccount);
    yield takeEvery(listAllAccounts.LIST_ALL_ACCOUNT, getListAllAccount);
    yield takeEvery(listAccounts.LIST_ACCOUNT, getListAccount);
    yield takeEvery(listNotAccounts.LIST_NOT_ACCOUNT, getListNotAccount);
    yield takeEvery(listFilterAccounts.LIST_FILTER_ACCOUNT, getFilterListAccount);
    yield takeEvery(listFilterAccounts.LIST_FILTER_NOT_ACCOUNT, getFilterListNotAccount);
    yield takeEvery(listEmployee.GET_EMPLOYEE, getEmployee);
    yield takeEvery(detailEmployee.DETAIL_EMPLOYEE, detailAccount);
    yield takeEvery(showSetting.SHOW_SETTING, getSetting);
    yield takeEvery(updateSetting.UPDATE_SETTING, updateDataSetting);
}