import userAxiosPrivate from "@/hooks/useAxiosPrivate";
import { warrantyCreate } from "@/types/actions/detailOrder";
import { callFilterOrder } from "@/types/actions/listOrder";
import { itemCustomer, itemStaffProduct } from "@/types/actions/updateCustomerOrder";
export class Private {

    getOrder = async (pageNumber: number, excludeOrderStatus: string) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeStatus = encodeURIComponent(excludeOrderStatus);
        //URLSearchParams  không dùng encodeURIComponent
        const queryParams = new URLSearchParams({ pageNumber: pageNumber.toString() });
        return await axiosPrivate.get(`/orders?orderType=Offline&${queryParams}&excludeOrderStatus=${encodeStatus}`)
    }

    getOrderPaid = async (pageNumber: number, orderStatus: string) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeStatusPaid = encodeURIComponent(orderStatus);
        return await axiosPrivate.get(`/orders?orderType=Offline&orderStatus=${encodeStatusPaid}&pageNumber=${pageNumber}`)
    }
    getFilterOrderPaid = async (data: callFilterOrder<string, number>) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeOrderStatus = encodeURIComponent(data?.orderStatus);
        const encodeUserName = encodeURIComponent(data.customerName);
        const queryParams = new URLSearchParams({ customerPhone: data.customerPhone, pageNumber: data.number.toString() });
        return await axiosPrivate.get(`/orders?orderType=Offline&${queryParams}&orderStatus=${encodeOrderStatus}&customerName=${encodeUserName}`)
    }

    getDetailOrder = async (id: string) => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/orders/${id}`)
    }

    updateCustomerOrder = async (idOrder: string, data: itemCustomer<string>) => {
        const axiosPrivate = userAxiosPrivate();
        if (data.licensePlate) {
            return await axiosPrivate.put(`/orders/offline/${idOrder}`, data)
        } else {
            const dataBuy = {
                customerName: data.customerName,
                customerPhone: data.customerPhone,
            }
            return await axiosPrivate.put(`/orders/offline/${idOrder}`, dataBuy)
        }
    }

    updateProductOrder = async (idOrder: string, data: itemStaffProduct<string, number>) => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.put(`/orders/offline/${idOrder}`, data)

    }
    updateStatusOrder = async (idOrder: string, data: string) => {
        const axiosPrivate = userAxiosPrivate();
        const dataProduct = {
            status: data
        }
        return await axiosPrivate.put(`/orders/offline/${idOrder}`, dataProduct)
    }
    postWarranty = async (data: warrantyCreate) => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.post(`/warranties-history`, data)
    }
}

export const orderService = new Private();