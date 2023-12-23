export interface selectorRevenue<T,N> {
    revenueReducer: {
        revenueInfo: listRevenue<T,N>;
        staticsInfo: listStatics<T,N>;
        showError: T | null;
    }
}

export interface storeRevenue<T,N> {
    showError: T | null,
    revenueInfo: revenueSaga<T,N>[];
}

export interface payloadRevenue<N>{
    type:'list_revenue';
    pageNumber:N,
    filters:any
}

export interface revenueSaga<T,N> {
    data: listRevenue<T,N>
    error: T | null;
}

export interface listRevenue<T,N>{
    pagination:pagination<N>
    data:itemRevenue<T,N>[]
}

export interface itemRevenue<T,N> {
    id: T,
    orderId: T,
    totalAmount: N,
    type: T,
    paymentMethod: T,
    status: T,
    updateAt: Date,
    transactionDate: Date,
    orderType: T
}

export interface pagination<N> {
    pageNumber: N;
    pageSize: N;
    totalRow: N;
}

//statics
export interface itemStatics<T,N> {
    transactionDate: Date,
    orderType: T,
    isOrder: T,
    totalAmount: N
}
export interface listStatics<T,N>{
    data: itemStatics<T,N>[]
}

export interface payloadStatics<>{
    type:'list_statics';
    filters:any
}

export interface staticsSaga<T,N> {
    data: listStatics<T,N>
    error: T | null;
}

export interface selectorStatics<T,N> {
    staticsReducer: {
        staticsInfo: itemStatics<T,N>[];
        showError: T | null;
    }
}

export interface storeStatics<T,N> {
    showError: T | null,
    staticsInfo: staticsSaga<T,N>[];
}