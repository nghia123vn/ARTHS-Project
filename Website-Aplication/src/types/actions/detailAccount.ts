
export interface selectorDetailAccount<T, N> {
    detailAccountReducer: {
        detailAccountInfor:itemDetailAccount<T, N>,
        showError: string | null;
    }
}

export interface storeDetailAccount<T, N> {
    showError: string | null;
    detailAccountInfor:itemDetailAccount<T, N>|null,
}

export interface detailAccountSaga<T, N> {
    showError: string,
    data: itemDetailAccount<T, N>
}

export interface payloadDetailAccount<T> {
    type: "detail_employee",
    role: T,
    employeeId:T
}

export interface dataDetailAccount<T, N> {
    data: itemDetailAccount<T, N>;
}

export interface itemDetailAccount<T, N> {
    accountId: T;
    fullName: T;
    gender: T;
    phoneNumber: T;
    address: T;
    avatar: T;
    cart: {
        id: T;
        cartItems: {
            cartId: T;
            quantity: N;
            motobikeProduct: {
                id: T;
                name: T;
                priceCurrent: N;
                installationFee: N;
                discountAmount: N;
                image: T;
            }
        }[]
    };
    feedbackStaffs: {
        id: T;
        title: T;
        content: T;
        sendDate: Date;
        customer: {
            accountId: T;
            phoneNumber: T;
            fullName: T;
            gender: T;
            address: T;
            avatar: T;
        }
    }[]
}