import { detailEmployee, listEmployee } from "@/constants/secondaryConstants";
import { itemDetailAccount } from "@/types/actions/detailAccount";
import { itemAccount } from "@/types/actions/listAccount";
import { callListFilterEmployee } from "@/types/actions/listEmployee";


export const getEmployee = (role:string,data: callListFilterEmployee<string>) => {
    return {
        type: listEmployee.GET_EMPLOYEE,
        role,
        data
    };
};

export const getEmployeeStaffSuccess = (data:itemAccount[]) => {
    return {
        type: listEmployee.GET_EMPLOYEE_STAFF_SUCCESS,
        payload: {
            data
        },
    };
};

export const getEmployeeTellerSuccess = (data:itemAccount[]) => {
    return {
        type: listEmployee.GET_EMPLOYEE_TELLER_SUCCESS,
        payload: {
            data
        },
    };
};

export const getEmployeeFailed = (error:string) => {
    return {
        type: listEmployee.GET_EMPLOYEE_FAIL,
        payload: {
            error,
        },
    };
};

export const getDetailEmployee = (role:string,employeeId:string) => {
    return {
        type: detailEmployee.DETAIL_EMPLOYEE,
        role,
        employeeId
    };
};

export const detailEmployeeStaffSuccess = (data:itemDetailAccount<string, number>) => {
    return {
        type: detailEmployee.DETAIL_EMPLOYEE_STAFF_SUCCESS,
        payload: {
            data
        },
    };
};

export const detailEmployeeFailed = (error:string) => {
    return {
        type: detailEmployee.DETAIL_EMPLOYEE_FAIL,
        payload: {
            error,
        },
    };
};