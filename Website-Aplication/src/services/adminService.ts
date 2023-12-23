import userAxiosPrivate from "@/hooks/useAxiosPrivate";
import { callLCreateAccount } from "@/types/actions/createUpdateAccount";
import { callListFilterAccount } from "@/types/actions/listAccount";
import { roleAccount } from "@/types/typeAuth";

export class Private {

    getAllAccount = async () => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/accounts`)
    }
    getAccount = async (status: string) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeStatus = encodeURIComponent(status);
        return await axiosPrivate.get(`/accounts?excludeStatus=${encodeStatus}`)
    }
    getNotAccount = async (status: string) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeStatus = encodeURIComponent(status);
        return await axiosPrivate.get(`/accounts?status=${encodeStatus}`)
    }
    getFilterAccount = async (data: callListFilterAccount<string, number>) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeStatus = encodeURIComponent(data?.status);
        const encodeName = encodeURIComponent(data.fullName);
        return await axiosPrivate.get(`/accounts?phoneNumber=${encodeName}&excludeStatus=${encodeStatus}&pageSize=8&pageNumber=${data.pageNumber}`)
    }
    getFilterNotAccount = async (data: callListFilterAccount<string, number>) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeStatus = encodeURIComponent(data?.status);
        const encodeName = encodeURIComponent(data.fullName);
        return await axiosPrivate.get(`/accounts?phoneNumber=${encodeName}&status=${encodeStatus}&pageSize=8&pageNumber=${data.pageNumber}`)
    }

    postAccount = async (role: string, data: callLCreateAccount<string>) => {
        const axiosPrivate = userAxiosPrivate();
        const checkRole = role.toLowerCase();
        if (role === roleAccount.Customer) {
            const dataCustomer = {
                phoneNumber: data.phoneNumber,
                password: data.password,
                fullName: data.fullName,
                gender: data.gender,
                address: ""
            }
            return await axiosPrivate.post(`/${checkRole}s`, dataCustomer)

        } else {
            return await axiosPrivate.post(`/${checkRole}s`, data)
        }
    }

    updateAccount = async (idAccount: string, role: string, status: string) => {
        const axiosPrivate = userAxiosPrivate();
        const checkRole = role.toLowerCase();
        const data={
            status:status
        }
        return await axiosPrivate.put(`/${checkRole}s/${idAccount}`,data)
    }
}
export const adminService = new Private();