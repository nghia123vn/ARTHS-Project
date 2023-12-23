export interface getFilter<T,N>{
    type:"get_product_filter";
    data:itemFilter<T,N>
}

export interface itemFilter<T,N>{
    paginationNumber?:N
    name?:T;
    category?:T;
    status:T
}

export interface itemFilterDiscount<T,N>{
    paginationNumber:N
    name:T;
    category:T;
    status:T,
    haveDiscount:boolean,
    discountId:T|undefined;
}

export interface getFilterProductDiscount<T,N>{
    type:"get_product_filter_discount";
    data:itemFilterDiscount<T,N>
}