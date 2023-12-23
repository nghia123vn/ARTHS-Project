import { showSetting } from '@/constants/secondaryConstants';
import { detailSettingSaga, storeDetailSetting } from '@/types/actions/typeSetting';


const initialState: storeDetailSetting = {
    detailSettingInfor: null,
    showError: null,
};

const detailSettingReducer = (
    state: storeDetailSetting = initialState,
    { type, payload }: { type: string; payload: detailSettingSaga }
) => {
    switch (type) {
        case showSetting.SHOW_SETTING_SUCCESS:
            return {
                ...state,
                detailSettingInfor: payload.data,
            }

        case showSetting.SHOW_SETTING_FAIL:
            return {
                ...state,
                showError: payload.showError
            }
        default:
            return state;
    }
};

export default detailSettingReducer;