import { getDetailDiscountFailed, getDetailDiscountSuccess, getDiscount, getDiscountFailed, getDiscountSuccess, getNotDiscountSuccess } from '@/actions/discount';
import { showSuccessAlert } from '@/constants/chooseToastify';
import { detailDiscount, discountCreate, discountUpdate, listDiscount } from '@/constants/secondaryConstants';
import { History } from '@/context/NavigateSetter';
import { discountService } from '@/services/discountService';
import { ownerService } from '@/services/ownerService';
import { payloadCreateDiscount, payloadDetailDiscount, payloadUpdateDiscount, payloadUpdateStatusDiscount } from '@/types/actions/detailDiscount';
import { itemDiscount, payloadDiscount, payloadDiscountChoose } from '@/types/actions/listDiscout';
import { StatusDiscount } from '@/types/typeDiscount';
import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';


function* createDiscount(payload: payloadCreateDiscount) {
    try {
        const resp: AxiosResponse = yield call(discountService.createDiscount, payload.data);
        const { status, data } = resp;
        console.log("create", data)
        if (data && status === 201) {
            yield put(getDetailDiscountSuccess(data));
            if (History.navigate)
                History.navigate(`/manage-discounts/${data.id}`)
                showSuccessAlert('Tạo khuyến mãi thành công')
        } else {
            yield put(getDetailDiscountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDetailDiscountFailed(msg));
    }
}

function* updateDiscount(payload: payloadUpdateDiscount) {
    try {
        const resp: AxiosResponse = yield call(discountService.updateDiscount, payload.data, payload.discountId);
        const { status, data } = resp;
        console.log("update", data)
        if (data && status === 201) {
            yield put(getDetailDiscountSuccess(data));
            if (History.navigate)
                History.navigate(`/manage-discounts/${data.id}`);
                showSuccessAlert('Cập nhật khuyến mãi thành công')
        } else {
            yield put(getDetailDiscountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDetailDiscountFailed(msg));
    }
}

function* updateDiscountStatus(payload: payloadUpdateStatusDiscount) {
    try {
        const resp: AxiosResponse = yield call(discountService.updateDiscountStatus, payload.discountId);
        const { status, data } = resp;
        console.log("update", data)
        if (data && status === 201) {
            yield put(getDiscount(payload.data));
            
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDetailDiscountFailed(msg));
    }
}

function* getChooseDiscount(payload: payloadDiscountChoose<number>) {
    try {
        const resp: AxiosResponse = yield call(ownerService.getDiscountCreate, payload.pageSize);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getDiscountSuccess(data));
        } else {
            yield put(getDiscountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDiscountFailed(msg));
    }

}

function* getListDiscount(payload: payloadDiscount<string, number>) {
    try {
        const resp: AxiosResponse = yield call(discountService.getDiscount, payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
            if (data?.data?.every((item: itemDiscount<string, number>) => item.status === StatusDiscount.Active)) {
                yield put(getDiscountSuccess(data));
            }
            if (data?.data?.every((item: itemDiscount<string, number>) => item.status === StatusDiscount.Discontinued)) {
                yield put(getNotDiscountSuccess(data));
            }
        } else {
            yield put(getDiscountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDiscountFailed(msg));
    }

}
function* getDetailDiscount(payload: payloadDetailDiscount<string>) {
    try {
        const resp: AxiosResponse = yield call(discountService.getDetailDiscount, payload.discountId);
        const { status, data } = resp;
        if (data && status === 200) {
            yield put(getDetailDiscountSuccess(data));
        } else {
            yield put(getDetailDiscountFailed(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDetailDiscountFailed(msg));
    }

}

export function* lookupDiscount() {
    yield takeEvery(discountCreate.DISCOUNT_CREATE, createDiscount);
    yield takeEvery(discountUpdate.DISCOUNT_UPDATE, updateDiscount);
    yield takeEvery(discountUpdate.DISCOUNT_UPDATE_STATUS, updateDiscountStatus);
    yield takeEvery(listDiscount.GET_LIST_DISCOUNT_CHOOSE, getChooseDiscount);
    yield takeEvery(listDiscount.GET_LIST_DISCOUNT, getListDiscount);
    yield takeEvery(detailDiscount.DETAIL_DISCOUNT, getDetailDiscount);
}