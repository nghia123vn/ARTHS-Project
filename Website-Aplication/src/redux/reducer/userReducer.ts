import { storeProfileUser, profileSaga } from '@/types/actions/profile';
import { updateUserInfor, userInfor } from '../../constants/mainConstants';
import { showResetError } from '@/constants/secondaryConstants';


const initialState: storeProfileUser<string> = {
    infor: [],
    showError: null,
    checkPassword: false,
    checkImage: false,
};



const userReducer = (
    state: storeProfileUser<string> = initialState,
    { type, payload }: { type: string; payload: profileSaga<string> }
) => {
    switch (type) {
        case userInfor.GET_USER_INFO_SUCCESS:
            return {
                ...state,
                infor: payload.data,
            }
        case updateUserInfor.UPDATE_IMAGE_USER_INFO_SUCCESS:
            return {
                ...state,
                checkImage: true,
                showError: null,
            }
        case updateUserInfor.UPDATE_PASSWORD_USER_INFO_SUCCESS:
            return {
                ...state,
                checkPassword: true,
                showError: null,
            }
        case userInfor.GET_USER_INFO_FAIL:
            return {
                ...state,
                showError: payload.error
            }
        case showResetError.RESET_ERROR:
            return {
                ...state,
                checkPassword: false,
                checkImage:false,
                showError: null,
            }
        default:
            return state;
    }
};

export default userReducer;