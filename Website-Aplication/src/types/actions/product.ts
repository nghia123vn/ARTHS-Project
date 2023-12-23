export interface selectorProduct<T, N> {
    productReducer: {
        productInfor: itemProduct<T, N>;
        showError: T | null;
    }
}

export interface storeProduct<T, N> {
    showError: T | null,
    productInfor: productSaga<T, N>[];
}

export interface productSaga<T, N> {
    data: itemProduct<T, N>
}

export interface itemProduct<T, N> {
    data: item<T, N>[];
    pagination: pagination<N>
}
export interface imageItem<T> {
    id: T;
    imageUrl: T;
    thumbnail: false | true;

}

export interface discountItem<T, N> {
    id: T;
    title: T;
    discountAmount: N;
    startDate: Date;
    endDate: Date;
    imageUrl: T;
    description: T;
    status: T;
}

export interface itemTopProduct<T,N>{
    totalQuantitySold:N;
    product:item<T, N>
}
export interface item<T, N> {
    id: T;
    name: T;
    priceCurrent: N;
    installationFee:N;
    quantity: N;
    warrantyDuration: N;
    description: T;
    status: T;
    updateAt: Date;
    createAt: Date;
    discount: discountItem<T, N>;
    category: {
        id: T,
        categoryName: T
    };
    images: imageItem<T>[];
    feedbackProducts: feedbackProducts<T, N>[];
    motobikeProductPrices: motobikeProductPrices<T, N>[];
    vehicles:vehicles<T>[]

}

export interface motobikeProductPrices<T, N> {
    id: T,
    dateApply: Date,
    priceCurrent: N,
    createAt: Date
}
export interface feedbackProducts<T, N> {
    id: T,
    title: T,
    rate: N,
    content: T,
    updateAt: Date,
    createAt: Date,
    customer: {
        accountId: T,
        fullName: T,
        gender: T,
        address: T,
        avatar: T,
    }

}

export interface vehicles<T> {
    id: T,
    vehicleName: T
}



export interface pagination<N> {
    pageNumber: N;
    pageSize: N;
    totalRow: N;
}

export interface payloadSaga<T,N> {
    type: 'get_product_info';
    data:callProduct<T,N>
}

export interface callProduct<T,N> {
    status:T
    number: N
}

export interface payloadSortProduct<T,N> {
    type: 'get_sort_product_info';
    data:callSortProduct<T,N>
}

export interface callSortProduct<T,N> {
    value:T|null;
    status:T;
    pageNumber?:N;
    sortByAsc?:boolean;
    name:T
}

export interface payloadCreateProduct{
    type: 'product_create';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
}

export interface payloadUpdateProduct{
    type: 'product_update';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
    idProduct:string
}

export interface payloadUpdateStatusProduct{
    type: 'product_update_status';
    status:string
    idProduct:string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data:any
}

export interface addProductOrder<T, N> {
    idProduct: T;
    nameProduct: T;
    installationFee:N;
    priceProduct: N;
    discountAmount: N;
    image: string;
    productQuantity: N;
    instUsed:boolean;
}

export interface addProductService<T,N>{
    id: T;
    name: T;
    price: N;
    image: T;
    discountAmount:N;
}