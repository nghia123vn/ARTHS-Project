import { getDetailOnlineOrderSuccess, getOnlineOrderCanceledSuccess, getOnlineOrderConfirmSuccess, getOnlineOrderFailed, getOnlineOrderFinishedSuccess, getOnlineOrderPaidSuccess, getOnlineOrderSuccess, getOnlineOrderTransportSuccess, onlineOrderUpdate, postTransportFailed, postTransportSuccess } from "@/actions/onlineOrder";
import { getDetailOrderFailed } from "@/actions/order";
import { createOrderTransport, detailOnlineOrder, listOnlineOrderConstant, updateOnlineOrder } from "@/constants/mainConstants";
import { onlineOrderService } from "@/services/onlineOrderService";
import { itemOnlineOrder, payloadDetailOnlineOrder, payloadOnlineOrder, payloadTranSport, payloadUpdateOnlineOrder } from "@/types/actions/listOnlineOrder";
import { statusOrder } from "@/types/typeOrder";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

function* getOnlineOrder(payload: payloadOnlineOrder<string,number>) {
    try {
        const resp: AxiosResponse = yield call(onlineOrderService.getOnlineOrder, payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            if(data?.data?.every((item:itemOnlineOrder<string,number>)=> item.status ===statusOrder.Processing)){
                yield put(getOnlineOrderSuccess(data));
            }
            if(data?.data?.every((item:itemOnlineOrder<string,number>)=> item.status ===statusOrder.Paid)){
                yield put(getOnlineOrderPaidSuccess(data));
            }
            if(data?.data?.every((item:itemOnlineOrder<string,number>)=> item.status ===statusOrder.Confirm)){
                yield put(getOnlineOrderConfirmSuccess(data));
            }
            if(data?.data?.every((item:itemOnlineOrder<string,number>)=> item.status ===statusOrder.Transport)){
                yield put(getOnlineOrderTransportSuccess(data));
            }
            if(data?.data?.every((item:itemOnlineOrder<string,number>)=> item.status ===statusOrder.Finished)){
                yield put(getOnlineOrderFinishedSuccess(data));
            }
            if(data?.data?.every((item:itemOnlineOrder<string,number>)=> item.status ===statusOrder.Canceled)){
                yield put(getOnlineOrderCanceledSuccess(data));
            }
        } else {
            yield put(getOnlineOrderFailed(data));
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getOnlineOrderFailed(msg));
    }
}
function* getDetailOnlineOrder(payload: payloadDetailOnlineOrder<string>) {
    try {
        const resp: AxiosResponse = yield call(onlineOrderService.getDetailOnlineOrder, payload.id);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getDetailOnlineOrderSuccess(data));
        } else {
            yield put(getDetailOrderFailed(data));
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDetailOrderFailed(msg));
    }
}
function* updateStatusOnlineOrder(payload:payloadUpdateOnlineOrder<string>){
    try {
        const resp: AxiosResponse = yield call(onlineOrderService.updateStatusOnlineOrder,payload.idOrder,payload.data);
        const { status, data } = resp;
        if (data && status === 201) {
            yield put(getDetailOnlineOrderSuccess(data));
        } else {
            yield put(getDetailOrderFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDetailOrderFailed(msg));
    }
}
function* postOrderTransport(payload:payloadTranSport<string,number>){
    try {
        const resp: AxiosResponse = yield call(onlineOrderService.createOrderTransport,payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(postTransportSuccess(data));
            yield put(onlineOrderUpdate( payload.data.orderId,payload.statusOnline));
            
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.response.data.Message;
        yield put(postTransportFailed(msg));
    }
}

export function* lookupOnlineOrder() {
    yield takeEvery(listOnlineOrderConstant.LIST_ONLINE_ORDER, getOnlineOrder);
    yield takeEvery(detailOnlineOrder.DETAIL_ONLINE_ORDER, getDetailOnlineOrder);
    yield takeEvery(updateOnlineOrder.UPDATE_ONLINE_ORDER, updateStatusOnlineOrder);
    yield takeEvery(createOrderTransport.CREATE_TRANSPORT, postOrderTransport);
}