export interface selectorOrder<T,N> {
    orderReducer: {
        orderInfor: listOrder<T,N>;
        orderPaidInfor: listOrder<T,N>;
        showError: T | null;
    }
}

export interface storeOrder<T,N> {
    showError: T | null,
    orderInfor: orderSaga<T,N>[];
    orderPaidInfor: orderSaga<T,N>[];
}
export interface payloadOrder<T,N>{
    type:'list_order';
    number:N,
    excludeOrderStatus:T
}

export interface payloadOrderPaid<T,N>{
    type:'list_order_paid';
    number:N,
    orderStatus:T
}

export interface payloadFilterOrder<T,N>{
    type:'list_filter_order';
    data:callFilterOrder<T,N>
}


export interface payloadFilterOrderPaid<T,N>{
    type:'list_filter_order_paid';
    data:callFilterOrder<T,N>
}

export interface callFilterOrder<T,N>{
    customerName:T,
    customerPhone:T,
    number:N,
    orderStatus:T,
}

export interface orderSaga<T,N> {
    data: listOrder<T,N>
}

export interface listOrder<T,N>{
    pagination:pagination<N>
    data:itemOrder<T,N>[]
}
export interface itemOrder<T,N> {
    
        id: T,
        tellerName: T,
        staffName: T,
        customerName: T,
        customerPhoneNumber: T,
        licensePlate: T,
        status: T,
        totalAmount: N,
        orderType: T,
        orderDate: Date,

}
export interface pagination<N> {
    pageNumber: N;
    pageSize: N;
    totalRow: N;
}



