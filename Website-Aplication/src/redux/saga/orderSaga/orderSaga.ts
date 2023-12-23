import { getDetailOnlineOrder } from '@/actions/onlineOrder';
import { getDetailOrder, getDetailOrderFailed, getDetailOrderSuccess, getOrderFailed, getOrderPaidFailed, getOrderPaidSuccess, getOrderSuccess, updateCustomerOrderFailed, updateCustomerOrderSuccess, updateProductOrderFailed, updateProductOrderSuccess, updateStatusOrderFailed, updateStatusOrderSuccess } from '@/actions/order';
import {listOrder, detailOrder, updateUserOrder, updateProductOrdered, payWithCash, listOrderPaid } from '@/constants/mainConstants';
import { createWarranty } from '@/constants/secondaryConstants';
import { orderService } from '@/services/orderService';
import { sagaCreateWarranty, sagaDetailOrder } from '@/types/actions/detailOrder';
import {payloadFilterOrderPaid, payloadOrder, payloadOrderPaid } from '@/types/actions/listOrder';
import { payByCash, payloadItemCustomer, payloadItemStaffProduct } from '@/types/actions/updateCustomerOrder';
import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';


function* getOrder(payload:payloadOrder<string,number>){
    try {
        const resp: AxiosResponse = yield call(orderService.getOrder,payload.number,payload.excludeOrderStatus);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getOrderSuccess(data));
        } else {
            yield put(getOrderFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getOrderFailed(msg));
    }
}

function* getOrderPaid(payload:payloadOrderPaid<string,number>){
    try {
        const resp: AxiosResponse = yield call(orderService.getOrderPaid,payload.number,payload.orderStatus);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getOrderPaidSuccess(data));
        } else {
            yield put(getOrderPaidFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getOrderPaidFailed(msg));
    }
}

function* getFilterOrderPaid(payload:payloadFilterOrderPaid<string,number>){
    try {
        const resp: AxiosResponse = yield call(orderService.getFilterOrderPaid,payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getOrderPaidSuccess(data));
        } else {
            yield put(getOrderPaidFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getOrderPaidFailed(msg));
    }
}

function* getAllDetailOrder(payload:sagaDetailOrder){
    try {
        const resp: AxiosResponse = yield call(orderService.getDetailOrder,payload.id);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getDetailOrderSuccess(data));
        } else {
            yield put(getDetailOrderFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDetailOrderFailed(msg));
    }
}

function* updateCustomer(payload:payloadItemCustomer<string>){
    try {
        const resp: AxiosResponse = yield call(orderService.updateCustomerOrder,payload.idOrder,payload.data);
        const { status, data } = resp;
        if (data && status === 201) {
            yield put(updateCustomerOrderSuccess(data));
        } else {
            yield put(updateCustomerOrderFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(updateCustomerOrderFailed(msg));
    }
}

function* updateProductOrder(payload:payloadItemStaffProduct<string,number>){
    try {
        const resp: AxiosResponse = yield call(orderService.updateProductOrder,payload.idOrder,payload.data);
        const { status, data } = resp;
        if (data && status === 201) {
            yield put(updateCustomerOrderSuccess(data));
            yield put(updateProductOrderSuccess(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.response.data.Message;
        yield put(updateProductOrderFailed(msg));
    }
}

function* updateStatusOrder(payload:payByCash<string>){
    try {
        const resp: AxiosResponse = yield call(orderService.updateStatusOrder,payload.idOrder,payload.statusOrder);
        const { status, data } = resp;
        if (data && status === 201) {
            yield put(updateStatusOrderSuccess(data));
        } else {
            yield put(updateStatusOrderFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(updateStatusOrderFailed(msg));
    }
}
function*  createWarrantyPaidOrder(payload:sagaCreateWarranty){
    try {
        const resp: AxiosResponse = yield call(orderService.postWarranty,payload.data);
        const { status, data } = resp;
        if (data && status === 201) {
            yield put(getDetailOrder(payload.idOrder));
            yield put(getDetailOnlineOrder(payload.idOrder));
        }else{
            yield put(updateCustomerOrderFailed(data));
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        const msg: string = error.message;
        yield put(updateCustomerOrderFailed(msg));
    }
}

export function* lookupOrder() {
    yield takeEvery(listOrder.LIST_ORDER , getOrder);
    yield takeEvery(listOrderPaid.LIST_ORDER_PAID , getOrderPaid);
    yield takeEvery(listOrderPaid.LIST_FILTER_ORDER_PAID , getFilterOrderPaid);
    yield takeEvery(detailOrder.DETAIL_ORDER , getAllDetailOrder);
    yield takeEvery(updateUserOrder.UPDATE_USER_ORDER , updateCustomer);
    yield takeEvery(updateProductOrdered.UPDATE_PRODUCT_ORDER , updateProductOrder);
    yield takeEvery(payWithCash.PAY_WITH_CASH , updateStatusOrder);
    yield takeEvery(createWarranty.CREATE_WARRANTY , createWarrantyPaidOrder);
}