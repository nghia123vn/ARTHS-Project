import { itemBooking } from "./listBooking";

export interface selectorDetailBooking<T, N> {
    detailBookingReducer: {
        detailBookingInfor: itemBooking<T, N>;
        showError: T | null;
    }
}

export interface storeBookingDetail<T, N> {
    showError: T | null,
    detailBookingInfor: itemBooking<T, N>[];
}

export interface bookingDetailPayloadReducer<T, N> {
    showError: T | null,
    data: itemBooking<T, N>
}

export interface payloadDetailBooking<T> {
    type: 'detail_booking';
    bookingId: T,
}