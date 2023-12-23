
export interface payloadCreateVehicle<T>{
    type:"create_vehicles",
    vehicleName:T
}
export interface payloadDeleteVehicle<T>{
    type:"remove_vehicles",
    vehicleId:T
}
export interface selectorVehicleProduct<T> {
    vehicleProductReducer: {
        vehicleProduct: itemVehicleProduct<T>[];
        createVehicleProduct: itemVehicleProduct<T>;
        showError: T | null;
    }
}

export interface storeVehicleProduct<T> {
    showError: T | null,
    vehicleProduct: vehicleProductSaga<T>[];
    createVehicleProduct:vehicleProductSaga<T>|null;
}

export interface vehicleProductSaga<T> {
    data: itemVehicleProduct<T>
}

export interface itemVehicleProduct<T> {
    id: T;
    vehicleName: T;
}



