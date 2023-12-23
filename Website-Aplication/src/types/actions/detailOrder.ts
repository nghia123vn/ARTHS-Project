export interface sagaDetailOrder {
    type: "detail_order";
    id: string
}

export interface selectorDetailOrder<T, N> {
    orderDetailReducer: {
        orderDetail: itemDetailOrder<T, N>;
        showError: T | null;
        checkUpdate: boolean;
        checkInfor: boolean;
    }
}

export interface storeOrderDetail<T, N> {
    showError: T | null,
    orderDetail: itemDetailOrder<T, N>[];
    checkUpdate: boolean;
    checkInfor: boolean;
}

export interface orderDetailPayloadReducer<T, N> {
    showError: T | null,
    data: itemDetailOrder<T, N>
}

export interface itemDetailOrder<T, N> {
    id: T,
    tellerId: T,
    staff: staffOrder<T>,
    tellerName: T,
    customerName: T,
    customerPhoneNumber: T,
    address: T,
    licensePlate: T,
    status: T,
    paymentMethod: T,
    totalAmount: N,
    orderType: T,
    orderDate: Date,
    orderDetails: inStoreOrderDetails<T, N>[],
    shippingCode: T,
    shippingMoney: N,
    cancellationReason: T,
    cancellationDate: Date,

}

export interface staffOrder<T> {
    accountId: T,
    avatar: T,
    fullName: T,
    gender: T,
    phoneNumber: T,
}

export interface inStoreOrderDetails<T, N> {
    id: T,
    quantity: N,
    price: N,
    instUsed: boolean,
    subTotalAmount: N,
    warrantyStartDate: Date,
    warrantyEndDate: Date,
    createAt: T,
    discount: {
        id: T,
        title: T,
        discountAmount: N,
        startDate: Date,
        endDate: Date,
        imageUrl: T,
        description: T,
        status: T
    },
    motobikeProduct: {
        id: T,
        name: T,
        priceCurrent: N,
        installationFee: N,
        discountAmount: N,
        image: T
    },
    repairService: {
        id: T,
        name: T,
        duration: N,
        price: N,
        discountAmount: N,
        image: T
    },
    warrantyHistories: listWarranty[]
}
export interface listWarranty {

    id: string
    repairDate: Date
    productQuantity: number
    repairDetails: string
    totalAmount: number
    status: string
    handledByNavigation: {
        accountId: string
        fullName: string
        gender: string
        phoneNumber: string
        avatar: string
    }

}

export interface sagaCreateWarranty {
    type: "create_warranty",
    data: warrantyCreate,
    idOrder: string
}
export interface warrantyCreate {
    orderDetailId: string
    handledBy: string
    productQuantity: number
    repairDetails: string
}



