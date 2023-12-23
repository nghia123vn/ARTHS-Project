import { listBooking, listChooseBooking, updateBooking } from "@/constants/mainConstants";
import { showResetError } from "@/constants/secondaryConstants";
import { bookingSaga, repairBooking } from "@/types/listBooking";

const initialState: repairBooking<string, number> = {
    bookingInfo: [],
    chooseBooking:[],
    showError: null,
}


const bookingReducer = (
    state: repairBooking<string, number> = initialState,
    { type, payload }: { type: string; payload: bookingSaga<string, number> }
) => {
    switch (type) {
        case listBooking.LIST_BOOKING_SUCCESS:

            return {
                ...state,
                bookingInfo: payload.data,
            };
            case listChooseBooking.LIST_CHOOSE_BOOKING_SUCCESS:

            return {
                ...state,
                chooseBooking: payload.data,
            };

        case listBooking.LIST_BOOKING_FAIL:
            return {
                ...state,
                showError: payload.error
            };

        case updateBooking.UPDATE_BOOKING_SUCCESS:
            return {
                ...state,
                bookingInfo: {
                    ...state.bookingInfo,
                    data: payload.data,
                }
            };

        case updateBooking.UPDATE_BOOKING_FAIL:
            return {
                ...state,
                showError: payload.error
            };
            case showResetError.RESET_ERROR:
                return{
                    ...state,
                    showError: null,
                }

        default:
            return state;
    }
};

export default bookingReducer;