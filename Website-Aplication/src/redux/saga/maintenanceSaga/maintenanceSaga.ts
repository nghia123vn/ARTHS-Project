
import { getShowMaintenanceFailed, getShowMaintenanceSuccess } from '@/actions/dateMaintenance';
import { listMaintenance } from '@/constants/mainConstants';
import { maintenanceService } from '@/services/maintenanceService';
import { payloadMaintenance } from '@/types/actions/listMaintenance';
import { AxiosResponse } from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* getMaintenance(payload: payloadMaintenance<string, number>) {
    try {
        const resp: AxiosResponse = yield call(maintenanceService.getMaintenance, payload.data);
        const { status, data } = resp;
        if (data && status === 200) {
                yield put(getShowMaintenanceSuccess(data));
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getShowMaintenanceFailed(msg));
    }

}


export function* lookupMaintenance() {
    yield takeEvery(listMaintenance.LIST_MAINTENANCE, getMaintenance);
}