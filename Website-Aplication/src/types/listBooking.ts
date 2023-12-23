export interface selectorBooking<T, N> {
    bookingReducer: {
        bookingInfo: listBooking<T, N>;
        chooseBooking: listBooking<T, N>;
        showError: T | null;
    }
}

export interface repairBooking<T, N> {
    showError: T | null,
    bookingInfo: bookingSaga<T, N>[];
    chooseBooking: bookingSaga<T, N>[];

}


export interface payloadBooking<N> {
    type: 'list_booking';
    pageNumber: N,
    filters: unknown,
}

export interface payloadChooseBooking<N> {
    type: 'list_choose_booking';
    pageSize: N,
    filters: unknown,
}


export interface payloadUpdateBooking<T> {
    type: 'update_booking';
    bookingId: T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
}



export interface bookingSaga<T, N> {
    error: unknown;
    data: listBooking<T, N>
}

export interface listBooking<T, N> {
    pagination: pagination<N>,
    data: itemBooking<T, N>[],
}

export interface itemBooking<T, N> {
    id: T,
    orderId:T,
    dateBook: Date,
    description: T,
    cancellationReason: T,
    cancellationDate: Date,
    status: T,
    createAt: Date,
    staff:staffBooking<T, N>,
    customer: customerBooking<T, N>,
}

export interface customerBooking<T, N> {
    accountId: T,
    phoneNumber: N
    fullName: T,
    gender: T,
    address: T,
    avatar: T,
}

export interface staffBooking<T, N> {
    accountId: T,
    phoneNumber: N
    fullName: T,
    gender: T,
    avatar: T,
}



export interface pagination<N> {
    pageNumber: N;
    pageSize: N;
    totalRow: N;
}
