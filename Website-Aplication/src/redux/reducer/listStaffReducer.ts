import { listStaff} from '../../constants/secondaryConstants';
import { listStaffSaga, storeListStaff } from '@/types/actions/listStaff';

const initialState: storeListStaff<string> = {
    listStaff: [],
    showError: null,
};



const listStaffReducer = (
    state: storeListStaff<string> = initialState,
    { type, payload }: { type: string; payload: listStaffSaga<string> }
) => {
    switch (type) {
        case listStaff.LIST_STAFF_SUCCESS:
            return {
                ...state,
                listStaff: payload.data,

            }

        case listStaff.LIST_STAFF_FAIL:
            return {
                ...state,
                listStaff: [],
            }
        default:
            return state;
    }
};

export default listStaffReducer;