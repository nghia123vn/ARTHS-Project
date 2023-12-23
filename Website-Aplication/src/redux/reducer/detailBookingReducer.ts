import { bookingDetailPayloadReducer, storeBookingDetail } from '@/types/typeDetailBooking';
import { detailBooking } from '../../constants/mainConstants';


const initialState: storeBookingDetail<string, number> = {
    detailBookingInfor: [],
    showError: null,
};



const detailBookingReducer = (
    state: storeBookingDetail<string, number> = initialState,
    { type, payload }: { type: string; payload: bookingDetailPayloadReducer<string, number> }
) => {
    switch (type) {
        case detailBooking.DETAIL_BOOKING_SUCCESS:
            return {
                ...state,
                detailBookingInfor: payload.data,
            }

        case detailBooking.DETAIL_BOOKING_FAIL:
            return {
                ...state,
                detailBookingInfor: [],
                showError: payload.showError
            }
        default:
            return state;
    }
};

export default detailBookingReducer;