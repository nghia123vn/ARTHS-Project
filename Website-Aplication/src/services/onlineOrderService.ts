import userAxiosPrivate from "@/hooks/useAxiosPrivate"
import { callTranSport, callUpdateOnlineOrder } from "@/types/actions/listOnlineOrder";
import { callFilterOrder } from "@/types/actions/listOrder";

export class Private{
    getOnlineOrder = async(data:callFilterOrder<string,number>) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeOrderStatus = encodeURIComponent(data?.orderStatus);
        const encodeUserName = encodeURIComponent(data.customerName);
        const queryParams = new URLSearchParams({customerPhone:data.customerPhone, pageNumber: data.number.toString()});
        return await axiosPrivate.get(`/orders?orderType=Online&${queryParams}&orderStatus=${encodeOrderStatus}&customerName=${encodeUserName}`)
    }

    getDetailOnlineOrder = async (id: string) => {
        const axiosPrivate = userAxiosPrivate();
        console.log('get by id_service', `/orders/${id}`);
        return await axiosPrivate.get(`/orders/${id}`);
    }
    updateStatusOnlineOrder= async (idOrder: string, data:callUpdateOnlineOrder<string>) => {
        const axiosPrivate = userAxiosPrivate();
            return await axiosPrivate.put(`/orders/online/${idOrder}`,data)
        }
    createOrderTransport = async (data:callTranSport<string,number>)=>{
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.post(`/ghn/transfer-order`,data)
    }
}
export const onlineOrderService = new Private();