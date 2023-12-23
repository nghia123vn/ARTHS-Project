import { showSetting, updateSetting } from "@/constants/secondaryConstants";
import { itemSetting, itemUpdateSetting } from "@/types/actions/typeSetting";

export const getShowSetting = () => {
    return {
        type: showSetting.SHOW_SETTING,
    };
};

export const getShowSettingSuccess = (data: itemSetting) => {
    return {
        type: showSetting.SHOW_SETTING_SUCCESS,
        payload: {
            data
        },
    };
};

export const getShowSettingFailed = (error: string) => {
    return {
        type: showSetting.SHOW_SETTING_FAIL,
        payload: {
            error,
        },
    };
};

export const updateShowSetting = (data: itemUpdateSetting) => {
    return {
        type: updateSetting.UPDATE_SETTING,
        data
    }
};