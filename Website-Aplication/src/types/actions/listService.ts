import { itemPagination } from "../pagination";

export interface selectorService<T, N> {
    serviceReducer: {
        serviceInfor: dataService<T, N>;
        showError: T | null;
    }
}

export interface storeService<T, N> {
    showError: T | null,
    serviceInfor: serviceSaga<T, N>[];
}

export interface serviceSaga<T, N> {
    data: dataService<T, N>
}

export interface payloadCreateService {
    type: 'service_create';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
}

export interface payloadUpdateService {
    type: 'service_update';
    serviceId: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
}

export interface payloadUpdateServiceStatus {
    type: 'service_update_status';
    status: string;
    idService: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any
}

export interface axiosImageDelete{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    images:any[];
    deleteImage:string[];
}

export interface payloadService<T, N> {
    type: "list_services",
    data: callService<T, N>
}

export interface callService<T, N> {
    status: T
    pageNumber: N
}

export interface dataService<T, N> {
    data: itemService<T, N>[];
    pagination: itemPagination<N>
}

export interface itemService<T, N> {
    id: T,
    name: T,
    price: N,
    description: T,
    status: T,
    createAt: Date,
    images: [
        {
            id: T,
            thumbnail: boolean,
            imageUrl: T
        }
    ],
    discountAmount: N,
    duration: N,
    reminderInterval: N,
    warrantyDuration: N,
}