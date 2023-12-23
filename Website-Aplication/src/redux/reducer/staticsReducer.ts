import { listStatics } from "@/constants/mainConstants";
import { staticsSaga, storeStatics } from "@/types/revenue";

const initialState: storeStatics<string, number> = {
    staticsInfo: [],
    showError: null,
}

const staticsReducer = (
    state: storeStatics<string, number> = initialState,
    { type, payload }: { type: string; payload: staticsSaga<string,number> }
) => {
    switch (type) {
        case listStatics.LIST_STATICS_SUCCESS:
            //console.log('payload', payload);
            //console.log('payload.data', payload.data);

            return {
                ...state,
                staticsInfo: payload.data,
            };
        case listStatics.LIST_STATICS_FAIL:
            return {
                ...state,
                staticsInfo: payload.error
            };
        default:
            return state;
    }
};
export default staticsReducer;