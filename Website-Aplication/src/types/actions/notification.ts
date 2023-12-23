export interface Pagination<N>{
    pageNumber: N;
    pageSize: N;
    totalRow: N;
}

export interface DataInfo<T>{
    link: T;
    type: T;
    isRead: boolean;
    createAt: Date;
}

export interface Data<T>{
    id: T;
    title: T;
    body: T;
    data: DataInfo<T>;
}

export interface Notifications<T, N>{
    pagination: Pagination<N>;
    data: Data<T>[];
}