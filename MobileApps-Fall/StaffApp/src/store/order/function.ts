import axios from "axios";
import {BASE_URL} from "@/global";
import { EOrderStatus, IOrder } from "@/store/order/type";
import {batch} from "react-redux";
import {getOrder, setOrderQueries, syncOrder} from "@/store/order/index";
import { getToken } from "@/utils/loginHandle";


export interface IRequestOrder {
    pageNumber: number;
    staffId: string;
    orderStatus:EOrderStatus
}

export const requestAllOrders = async (params: IRequestOrder) => {
    try {
        const {data} = await axios.get<{
            pagination: {
                pageNumber: number;
                pageSize: number;
                totalRow: number;
            }
            data: IOrder[]
        }>(`https://${BASE_URL}/api/orders?staffId=${params.staffId}&orderType=Offline&pageNumber=${params.pageNumber}&orderStatus=${encodeURIComponent(params.orderStatus)}`,
            {
                headers: {
                    "accept": "text/plain",
                }
            });
        if (data) {
            const _data = data.data
            batch(() => {
                syncOrder(data.data)
                setOrderQueries(prev => ({
                    ...prev,
                    [params.orderStatus]: _data.map(item => item.id.toString()),
                }))
            })
        }
        return data.data;
    } catch (error) {
        console.error("Error sending request:", error);
    }
};
export const requestLoadMoreOrders = async (params: IRequestOrder) => {
    try {
        const {data} = await axios.get<{
            pagination: {
                pageNumber: number;
                pageSize: number;
                totalRow: number;
            }
            data: IOrder[]
        }>(`https://${BASE_URL}/api/orders?staffId=${params.staffId}&orderType=Offline&pageNumber=${params.pageNumber}&orderStatus=${encodeURIComponent(params.orderStatus)}`,
          {
              headers: {
                  "accept": "text/plain",
              }
          });
        if (data) {
            const _data = data.data
            batch(() => {
                syncOrder(data.data)
                setOrderQueries(prev => ({
                    ...prev,
                    [params.orderStatus]: [...prev[params.orderStatus], ..._data.map(item => item.id.toString())]
                }))
            })
        }
        return data.data;
    } catch (error) {
        console.error("Error sending request:", error);
    }
};
export interface IUpdateOrderParams{
    status: string;
}
export const requestUpdateOrderById = async (params:IUpdateOrderParams,id:string) => {
    const accessToken = await getToken();
    try {
        const {data} = await axios.put<IOrder>(`https://${BASE_URL}/api/orders/offline/${id}`,params,
            {
                headers: {
                    "accept": "text/plain",
                    "Content-Type": "application/json",
                    "Authorization": accessToken || ""
                }
            });
        if(data) syncOrder([data])
        return data;
    } catch (error) {
        console.error("Error sending request:", error);
    }
};
export const requestOrderById = async (id:string) => {
    const accessToken = await getToken();
    try {
        const { data } = await axios.get<IOrder>(`https://${BASE_URL}/api/orders/${id}`, {
            headers: {
                "accept": "text/plain",
                "Content-Type": "application/json",
                "Authorization": accessToken || ""
            }
        });
        batch(() => {
            if (data && data?.orderDetails) {
                const prevOrder = getOrder(data.id);
                syncOrder([{
                    ...data,
                    staff: prevOrder?.staff,
                    customer: prevOrder?.customer,
                }]);
            }
        });
        return data;
    } catch (error) {
        console.error("Error sending request:", error);
    }
};
