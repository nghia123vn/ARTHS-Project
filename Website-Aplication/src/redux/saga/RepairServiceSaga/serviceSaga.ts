import { getServicesSuccess, getServicesFailed, detailServiceSuccess, detailServiceFailed, getSortServices } from '@/actions/service';
import { showSuccessAlert } from '@/constants/chooseToastify';
import { detailServices, listServices, serviceCreate, serviceUpdate } from '@/constants/secondaryConstants';
import { History } from '@/context/NavigateSetter';
import { ownerService } from '@/services/ownerService';
import { privateService } from '@/services/privateService';
import { payloadDetailService } from '@/types/actions/detailService';
import { getFilterService, getServiceDiscount, getSortService } from '@/types/actions/filterService';
import { payloadCreateService, payloadService, payloadUpdateService, payloadUpdateServiceStatus } from '@/types/actions/listService';
import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';




function* createService(payload: payloadCreateService) {
    try {
        const resp: AxiosResponse = yield call(privateService.createService, payload.data);
        const { status, data } = resp;
        console.log("create", data)
        if (data && status === 201) {
            yield put(detailServiceSuccess(data));
            if (History.navigate)
                History.navigate(`/manage-services/${data.id}`)
        } else {
            yield put(detailServiceFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(detailServiceFailed(msg));
    }
}

function* updateService(payload: payloadUpdateService) {
    try {

        if (payload?.data?.deleteImage?.length > 0) {
            const respDelete: AxiosResponse = yield call(privateService.deleteServiceImage, payload.data);
            console.log("respDelete", respDelete)
            const { status } = respDelete;
            if (status === 204) {
                if (payload?.data?.images?.length > 0) {
                    const respUpdate: AxiosResponse = yield call(privateService.updateServiceImage, payload.serviceId, payload.data);
                    const { status, data } = respUpdate;
                    if (data && status === 201) {
                        const resp: AxiosResponse = yield call(privateService.updateService, payload.serviceId, payload.data);
                        const { status, data } = resp;
                        if (data && status === 201) {
                            yield put(detailServiceSuccess(data));
                            if (History.navigate)
                                History.navigate(`/manage-services/${data.id}`);
                            showSuccessAlert('Cập nhật dịch vụ thành công')
                        } else {
                            yield put(detailServiceFailed(data));
                        }
                    }
                } else {
                    const resp: AxiosResponse = yield call(privateService.updateService, payload.serviceId, payload.data);
                    const { status, data } = resp;
                    if (data && status === 201) {
                        yield put(detailServiceSuccess(data));
                        if (History.navigate)
                            History.navigate(`/manage-services/${data.id}`);
                        showSuccessAlert('Cập nhật dịch vụ thành công')
                    } else {
                        yield put(detailServiceFailed(data));
                    }
                }

            }
        } else {
            if (payload?.data?.images?.length > 0) {
                const respUpdate: AxiosResponse = yield call(privateService.updateServiceImage, payload.serviceId, payload.data);
                const { status, data } = respUpdate;
                if (data && status === 201) {
                    const resp: AxiosResponse = yield call(privateService.updateService, payload.serviceId, payload.data);
                    const { status, data } = resp;
                    if (data && status === 201) {
                        yield put(detailServiceSuccess(data));
                        if (History.navigate)
                            History.navigate(`/manage-services/${data.id}`);
                        showSuccessAlert('Cập nhật dịch vụ thành công')
                    } else {
                        yield put(detailServiceFailed(data));
                    }
                }
            } else {
                const resp: AxiosResponse = yield call(privateService.updateService, payload.serviceId, payload.data);
                const { status, data } = resp;
                if (data && status === 201) {
                    yield put(detailServiceSuccess(data));
                    if (History.navigate)
                        History.navigate(`/manage-services/${data.id}`);
                    showSuccessAlert('Cập nhật dịch vụ thành công')
                } else {
                    yield put(detailServiceFailed(data));
                }
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(detailServiceFailed(msg));
    }
}

function* updateServiceStatus(payload: payloadUpdateServiceStatus) {
    try {
        const resp: AxiosResponse = yield call(privateService.updateServiceStatus, payload.idService, payload.status);
        const { status, data } = resp;
        if (data && status === 201) {
            yield put(detailServiceSuccess(data));
            yield put(getSortServices(payload.data));
        } else {
            yield put(detailServiceFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(detailServiceFailed(msg));
    }
}

function* filterServiceDiscount(payload: getServiceDiscount<string, number>) {
    try {
        const resp: AxiosResponse = yield call(ownerService.getServiceDiscount, payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getServicesSuccess(data));
        } else {
            yield put(getServicesFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getServicesFailed(msg));
    }

}

function* getListService(payload: payloadService<string, number>) {
    try {
        const resp: AxiosResponse = yield call(privateService.getListService, payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getServicesSuccess(data));
        } else {
            yield put(getServicesFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getServicesFailed(msg));
    }

}

function* getDetailService(payload: payloadDetailService<string>) {
    try {
        const resp: AxiosResponse = yield call(privateService.getDetailService, payload.serviceId);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(detailServiceSuccess(data));
        } else {
            yield put(detailServiceFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(detailServiceFailed(msg));
    }

}

function* filterService(payload: getFilterService<string, number>) {
    try {
        const resp: AxiosResponse = yield call(privateService.getListFilterService, payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getServicesSuccess(data));
        } else {
            yield put(getServicesFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getServicesFailed(msg));
    }

}

function* sortService(payload: getSortService<string, number>) {
    try {
        const resp: AxiosResponse = yield call(privateService.getSortService, payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getServicesSuccess(data));
        } else {
            yield put(getServicesFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getServicesFailed(msg));
    }

}

export function* lookupService() {
    yield takeEvery(serviceCreate.SERVICE_CREATE, createService);
    yield takeEvery(serviceUpdate.SERVICE_UPDATE, updateService);
    yield takeEvery(serviceUpdate.SERVICE_UPDATE_STATUS, updateServiceStatus);
    yield takeEvery(listServices.GET_LIST_SERVICES_DISCOUNT, filterServiceDiscount);
    yield takeEvery(listServices.GET_LIST_SERVICES, getListService);
    yield takeEvery(detailServices.DETAIL_SERVICES, getDetailService);
    yield takeEvery(listServices.GET_LIST_SERVICES_FILTER, filterService);
    yield takeEvery(listServices.GET_SORT_SERVICES, sortService);
}