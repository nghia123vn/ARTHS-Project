import { detailBooking, listBooking, listChooseBooking, updateBooking } from "@/constants/mainConstants"
import { itemBooking } from "@/types/listBooking";



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getBooking = (pageNumber: number, filters: any) => {
    return {
        type: listBooking.LIST_BOOKING,
        pageNumber,
        filters,
    };
}

export const getBookingSuccess = (data: itemBooking<string,number>) => {
    return {
        type: listBooking.LIST_BOOKING_SUCCESS,
        payload:{
            data,
        },
    };
}

export const getBookingFailed = (error: string) => {
    return {
        type: listBooking.LIST_BOOKING_FAIL,
        payload: {
            error,
        },
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getChooseBooking = (pageSize: number, filters: any) => {
    return {
        type: listChooseBooking.LIST_CHOOSE_BOOKING,
        pageSize,
        filters,
    };
}

export const getChooseBookingSuccess = (data: itemBooking<string,number>) => {
    return {
        type: listChooseBooking.LIST_CHOOSE_BOOKING_SUCCESS,
        payload:{
            data,
        },
    };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const putBooking = (bookingId: string | undefined, data: any) => {
    return{
        type: updateBooking.UPDATE_BOOKING,
        bookingId,
        data
    };
}

export const putUpdateSuccess = (data: itemBooking<string,number>[]) => {
    return {
        type: updateBooking.UPDATE_BOOKING_SUCCESS,
        payload:{
            data,
        },
    };
}

export const putUpdateFailed = (error: string) => {
    return {
        type: updateBooking.UPDATE_BOOKING_FAIL,
        payload: {
            error,
        },
    };
}

export const getDetailBooking = (bookingId: string) => {
    console.log(bookingId)
    return{
        type: detailBooking.DETAIL_BOOKING,
        bookingId,
    };
}

export const getDetailBookingSuccess = (data: itemBooking<string,number>[]) => {
    return {
        type: detailBooking.DETAIL_BOOKING_SUCCESS,
        payload:{
            data,
        },
    };
}

export const getDetailBookingFailed = (error: string) => {
    return {
        type: detailBooking.DETAIL_BOOKING_FAIL,
        payload: {
            error,
        },
    };
}