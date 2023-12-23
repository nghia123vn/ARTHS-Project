import { listEmployee } from "@/constants/secondaryConstants";
import { listEmployeeSaga, storeListFilterEmployee } from "@/types/actions/listEmployee";



const initialState: storeListFilterEmployee = {
    employeeStaffInfor: [],
    employeeTellerInfor: [],
    showError: null,
};



const listEmployeeReducer = (
    state: storeListFilterEmployee = initialState,
    { type, payload }: { type: string; payload: listEmployeeSaga }
) => {
    switch (type) {
        case listEmployee.GET_EMPLOYEE_STAFF_SUCCESS:
            return {
                ...state,
                employeeStaffInfor: payload.data,
            }
            case listEmployee.GET_EMPLOYEE_TELLER_SUCCESS:
                return {
                    ...state,
                    employeeTellerInfor: payload.data,
                }
        case listEmployee.GET_EMPLOYEE_FAIL:
            return {
                ...state,
                showError: payload.data
            }
        default:
            return state;
    }
};

export default listEmployeeReducer;