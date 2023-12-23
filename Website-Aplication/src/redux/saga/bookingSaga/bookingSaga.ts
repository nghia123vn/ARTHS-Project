import { getBookingFailed, getBookingSuccess, getChooseBooking, getChooseBookingSuccess, getDetailBookingFailed, getDetailBookingSuccess, putUpdateFailed, putUpdateSuccess } from "@/actions/booking";
import { showErrorAlert, showSuccessAlert, showWarningAlert } from "@/constants/chooseToastify";
import { detailBooking, listBooking, listChooseBooking, updateBooking } from "@/constants/mainConstants";
import { bookingService } from "@/services/bookingService";
import { ErrorResponse } from "@/types/errorResponse";
import { itemBooking, payloadBooking, payloadChooseBooking, payloadUpdateBooking, selectorBooking } from "@/types/listBooking";
import { statusBooking } from "@/types/typeBooking";
import { payloadDetailBooking } from "@/types/typeDetailBooking";
import { AxiosError, AxiosResponse } from "axios";
import { call, put, select, takeEvery } from "redux-saga/effects";

function* getBooking(payload: payloadBooking<number>) {
    try {
        const { pageNumber, filters } = payload;
        const response: AxiosResponse = yield call(bookingService.getBooking, pageNumber, filters);
        const { status, data } = response;
        if (data && status === 200) {
            yield put(getBookingSuccess(data));
        } else {
            yield put(getBookingFailed(data));
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getBookingFailed(msg));
    }
}

function* getListChooseBooking(payload: payloadChooseBooking<number>) {
    try {
        const { pageSize, filters } = payload;
        const response: AxiosResponse = yield call(bookingService.getChooseBooking, pageSize, filters);
        const { status, data } = response;
        if (data && status === 200) {
            yield put(getChooseBookingSuccess(data));
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getBookingFailed(msg));
    }
}

function* putBooking(payload: payloadUpdateBooking<string>) {
    try {
        const { bookingId, data } = payload;
        const response: AxiosResponse = yield call(bookingService.updateBooking, bookingId, data);
        const { status } = response;
        if (status === 201) {
            const updatedBookingData: itemBooking<string, number> = response.data;
            //console.log('data after update: ', updatedBookingData);
            const currentBookingInfo: itemBooking<string, number>[] = yield select((state: selectorBooking<string, number>) => state.bookingReducer.bookingInfo.data);
            const updateBookingInfo = currentBookingInfo.map(booking => booking.id === updatedBookingData.id ? updatedBookingData : booking);
            yield put(putUpdateSuccess(updateBookingInfo));
            const filters = {
                bookingDate: payload?.data?.dateBook,
                bookingStatus: statusBooking.Confirmed,
            }
            yield put(getChooseBooking(100, filters))
            showSuccessAlert('Cập nhật thành công');
        } else {
            console.log('error', response);
            yield put(putUpdateFailed(response.data))
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log('error', error);
        const axiosError = error as AxiosError<ErrorResponse>;
        if (axiosError.response) {
            if (axiosError.response.status === 409) {
                showWarningAlert(axiosError.response.data.Message);
                yield put(putUpdateFailed(axiosError.response.data.Message));

            } else {
                showErrorAlert('Đã xảy ra lỗi khi cập nhật thông tin. Vui lòng thử lại.');
            }
        } else {
            showErrorAlert('Không thể kết nối tới máy chủ. Vui lòng thử lại sau.');
        }
    }
}
function* getBookingDetail(payload: payloadDetailBooking<string>) {
    try {
        const response: AxiosResponse = yield call(bookingService.bookingDetail, payload.bookingId);
        const { status, data } = response;
        if (data && status === 200) {
            yield put(getDetailBookingSuccess(data));
        } else {
            yield put(getDetailBookingFailed(data));
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getDetailBookingFailed(msg));
    }
}

export function* lookupBooking() {
    yield takeEvery(listBooking.LIST_BOOKING, getBooking);
    yield takeEvery(listChooseBooking.LIST_CHOOSE_BOOKING, getListChooseBooking);
    yield takeEvery(updateBooking.UPDATE_BOOKING, putBooking);
    yield takeEvery(detailBooking.DETAIL_BOOKING, getBookingDetail);
}