import {all} from 'redux-saga/effects';
import * as authSaga from './authSaga/authSaga'
import * as productSaga from './productSaga/productSaga'
import * as orderSaga from './orderSaga/orderSaga'
import * as serviceSaga from './RepairServiceSaga/serviceSaga'
import * as discountSaga from './discountSaga/discountSaga'
import * as bookingSaga from './bookingSaga/bookingSaga'
import * as onlineOrderSaga from './onlineOrderSaga/onlineOrderSaga'
import * as revenueSaga from './revenueSaga/revenueSaga'
import * as staticSaga from './revenueSaga/staticsSaga'
import * as maintenanceSaga from './maintenanceSaga/maintenanceSaga'

export function* rootSaga(){
    yield all([
        authSaga.lookupUser(),
        productSaga.lookupProduct(),
        orderSaga.lookupOrder(),
        serviceSaga.lookupService(),
        discountSaga.lookupDiscount(),
        bookingSaga.lookupBooking(),
        onlineOrderSaga.lookupOnlineOrder(),
        revenueSaga.lookupRevenue(),
        staticSaga.lookupRevenue(),
        maintenanceSaga.lookupMaintenance(),
    ])
}