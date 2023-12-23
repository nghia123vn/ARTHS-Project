export interface getFilterService<T,N>{
    type:"list_services_filter";
    data:serviceFilter<T,N>
}
export interface serviceFilter<T,N>{
    paginationNumber?:N;
    name?:T;
    status:T;
}

export interface getSortService<T,N>{
    type:"get_sort_services";
    data:sortService<T,N>
}
export interface sortService<T,N>{
    value:T|null;
    status:T;
    pageNumber?:N;
    sortByAsc?:boolean;
    name:T
}

export interface getServiceDiscount<T,N>{
    type:"list_services_discount";
    data:callServiceDiscount<T,N>
}
export interface callServiceDiscount<T,N>{
    status:T;
    pageNumber:N;
    name:T;
    discountId:T|undefined;
}
