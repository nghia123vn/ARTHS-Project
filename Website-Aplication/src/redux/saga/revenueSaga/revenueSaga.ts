import { getRevenueFailed, getRevenueSuccess } from "@/actions/revenue";
import { listRevenue } from "@/constants/mainConstants";
import { revenueService } from "@/services/revenueService";
import { payloadRevenue } from "@/types/revenue";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

function* getRevenue(payload: payloadRevenue<number>) {
    try {
        const { pageNumber, filters } = payload;
        const response: AxiosResponse = yield call(revenueService.getRevenue, pageNumber, filters);
        const { status, data } = response;
        if (data && status === 200) {
            yield put(getRevenueSuccess(data));
        } else {
            yield put(getRevenueFailed(data));
        }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const msg: string = error.message;
        yield put(getRevenueFailed(msg));
    }
}
export function* lookupRevenue() {
    yield takeEvery(listRevenue.LIST_REVENUE, getRevenue);
}