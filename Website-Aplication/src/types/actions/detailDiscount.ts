export interface selectorDetailDiscount<T, N> {
    detailDiscountReducer: {
        detailDiscountInfor: detaiDiscount<T, N>;
        showError: T | null;
    }
}

export interface storeDiscountDetail<T, N> {
    showError: T | null,
    detailDiscountInfor: detaiDiscount<T, N>[];
}

export interface discountDetailPayloadReducer<T, N> {
    showError: T | null,
    data: detaiDiscount<T, N>
}

export interface payloadDetailDiscount<T> {
    type: 'detail_discount';
    discountId: T,
}

export interface payloadCreateDiscount {
    type: 'discount_create',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
}

export interface payloadUpdateDiscount {
    type: 'discount_update',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    discountId:string,
}

export interface payloadUpdateStatusDiscount {
    type: 'discount_update_status',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any,
    discountId:string,
}

export interface detaiDiscount<T, N> {
    id: T,
    title: T,
    discountAmount: N,
    startDate: Date,
    endDate: Date,
    imageUrl: T,
    description: T,
    status: T,
    motobikeProducts: motorbikeDiscount<T, N>[],
    repairService: repairDiscount<T, N>[],
}
export interface motorbikeDiscount<T, N> {
    id: T,
    name: T,
    priceCurrent: N,
    quantity: N,
    warrantyDuration: N,
    status: T,
    discountAmount: N,
    imageUrl: T,
}

export interface repairDiscount<T, N> {
    id: T,
    name: T,
    duration: N,
    price: N,
    discountAmount: N,
    image: T,
}