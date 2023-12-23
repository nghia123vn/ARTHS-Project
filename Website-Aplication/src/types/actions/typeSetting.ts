
export interface selectorDetailSetting {
    detailSettingReducer: {
        detailSettingInfor:itemSetting,
        showError: string | null;
    }
}

export interface storeDetailSetting {
    showError: string | null;
    detailSettingInfor:itemSetting|null,
}

export interface detailSettingSaga {
    showError: string,
    data: itemSetting
}

export interface payloadUpdateSetting{
    type:"update_setting",
    data:itemUpdateSetting
}

export interface itemUpdateSetting {
    workHours: number,
    serviceTime: number,
    nonBookingPercentage: number,
    // dailyOnlineBookings: number,
    shippingMoney: number
}

export interface itemSetting {
    totalStaff: number,
    workHours: number,
    serviceTime: number,
    nonBookingPercentage: number,
    dailyOnlineBookings: number,
    shippingMoney: number
}