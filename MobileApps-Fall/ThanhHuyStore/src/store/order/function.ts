import axios from "axios";
import { BASE_URL } from "@/global";
import { batch } from "react-redux";
import { getToken } from "@/utils/loginHandle";
import { EOrderStatus, IOrder } from "@/store/order/type";
import { IFeedbackProduct, IPagination } from "@/store/product/type";
import { getOrder, getOrderByQuery, setOrderQueries, syncOrder } from "@/store/order/index";
import SimpleToast from "react-native-simple-toast";
import { getProduct, syncProduct } from "@/store/product";
import { FeedbackStaff } from "@/store/staff/type";


export interface ICreateOnlineOrderParams {
  customerPhoneNumber: string,
  address: string,
  paymentMethod: string,
  orderDetailModels:{
    motobikeProductId:string,
    productQuantity:number,
  }[]
}

export const requestCreateOnlineOrder = async (params: ICreateOnlineOrderParams) => {
  const accessToken = await getToken();
    const { data } = await axios.post<IOrder>(`https://${BASE_URL}/api/orders/online`, params, {
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization": accessToken || ""
      }
    });
    batch(() => {
      if (data) {
        console.log("data", data);
      }
    });
    return data;
};

export interface requestCreateVnPaysParams {
  orderId: string,
  amount: number,
}

export const requestCreateVnPay = async (params: requestCreateVnPaysParams) => {
  const accessToken = await getToken();
    const { data } = await axios.post<string>(`https://${BASE_URL}/api/payments/vn-pay`, params, {
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization": accessToken || ""
      }
    });
    if (data) return data;
};
export interface IRequestOrderParams {
  customerId:string,
  pageNumber?: number,
  status:EOrderStatus
}
export const requestListOrders = async (params:IRequestOrderParams) => {
  const accessToken = await getToken();
    const { data } = await axios.get<{
      pagination: IPagination,
      data: IOrder[]
    }>(`https://${BASE_URL}/api/orders?customerId=${params.customerId}&orderType=Online&orderStatus=${encodeURIComponent(params.status)}`, {
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization": accessToken || ""
      }
    });
    batch(() => {
      if (data) {
        const _data = data.data;
        syncOrder(_data);
        setOrderQueries(prev => ({
          ...prev,
          ["all"]: _data.map(item => item.id.toString()),
          [EOrderStatus.SUCCESS]: _data.filter(item => item.status === EOrderStatus.SUCCESS).map(item => item.id.toString()),
          [EOrderStatus.PENDING]: _data.filter(item => item.status === EOrderStatus.PENDING).map(item => item.id.toString()),
          [EOrderStatus.PROCESSING]: _data.filter(item => item.status === EOrderStatus.PROCESSING).map(item => item.id.toString()),
          [EOrderStatus.TRANSFER]: _data.filter(item => item.status === EOrderStatus.TRANSFER).map(item => item.id.toString()),
          [EOrderStatus.CANCEL]: _data.filter(item => item.status === EOrderStatus.CANCEL).map(item => item.id.toString())
        }));
      }
    });
    return data.data;
};
export const requestListOrdersLoadMore = async (params:IRequestOrderParams,pageNumber:number) => {
  const accessToken = await getToken();
  try {
    const { data } = await axios.get<{
      pagination: IPagination,
      data: IOrder[]
    }>(`https://${BASE_URL}/api/orders?customerId=${params.customerId}&orderType=Online&orderStatus=${encodeURIComponent(params.status)}?pageNumber=${pageNumber}`, {
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization": accessToken || ""
      }
    });
    batch(() => {
      if (data) {
        const _data = data.data;
        syncOrder(_data);
        setOrderQueries(prev => ({
          ...prev,
          ["all"]: [...prev["all"], ..._data.map(item => item.id.toString())],
          [EOrderStatus.SUCCESS]: [...prev[EOrderStatus.SUCCESS], ..._data.filter(item => item.status === EOrderStatus.SUCCESS).map(item => item.id.toString())],
          [EOrderStatus.PENDING]: [...prev[EOrderStatus.PENDING], ..._data.filter(item => item.status === EOrderStatus.PENDING).map(item => item.id.toString())],
          [EOrderStatus.PROCESSING]: [...prev[EOrderStatus.PROCESSING], ..._data.filter(item => item.status === EOrderStatus.PROCESSING).map(item => item.id.toString())],
          [EOrderStatus.TRANSFER]: [...prev[EOrderStatus.TRANSFER], ..._data.filter(item => item.status === EOrderStatus.TRANSFER).map(item => item.id.toString())],
          [EOrderStatus.CANCEL]: [...prev[EOrderStatus.CANCEL], ..._data.filter(item => item.status === EOrderStatus.CANCEL).map(item => item.id.toString())]
        }));
      }
    });
    return data.data;
  } catch (error) {
    console.error("Error sending request:", error);
  }
};


export const requestListOrdersByStatus = async () => {
  const accessToken = await getToken();
  try {
    const { data } = await axios.get<{
      pagination: IPagination,
      data: IOrder[]
    }>(`https://${BASE_URL}/api/orders`, {
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization": accessToken || ""
      }
    });
    batch(() => {
      if (data) {
        const _data = data.data;
        syncOrder(_data);
        setOrderQueries(prev => ({
          ...prev,
          ["all"]: _data.map(item => item.id.toString()),
          [EOrderStatus.SUCCESS]: _data.filter(item => item.status === EOrderStatus.SUCCESS).map(item => item.id.toString()),
          [EOrderStatus.PENDING]: _data.filter(item => item.status === EOrderStatus.PENDING).map(item => item.id.toString()),
          [EOrderStatus.PROCESSING]: _data.filter(item => item.status === EOrderStatus.PROCESSING).map(item => item.id.toString()),
          [EOrderStatus.TRANSFER]: _data.filter(item => item.status === EOrderStatus.TRANSFER).map(item => item.id.toString()),
          [EOrderStatus.CANCEL]: _data.filter(item => item.status === EOrderStatus.CANCEL).map(item => item.id.toString())
        }));
      }
    });
    return data.data;
  } catch (error) {
    console.error("Error sending request:", error);
  }
};

export interface IUpdateOrderParams {
  status: EOrderStatus,
  cancellationReason: string,
}

export const requestCancelOrder = async (params: IUpdateOrderParams, id: string) => {
  const accessToken = await getToken();
    const { data } = await axios.put<
      IOrder
    >(`https://${BASE_URL}/api/orders/online/${id}`, params, {
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization": accessToken || ""
      }
    });
    batch(() => {
      if (data) {
        syncOrder([data]);
        const listPendingQuery = getOrderByQuery(EOrderStatus.PENDING);
        const listCancelQuery = getOrderByQuery(EOrderStatus.CANCEL);
        setOrderQueries(prev => ({
          ...prev,
          [EOrderStatus.CANCEL]: [data.id.toString(), ...listCancelQuery],
          [EOrderStatus.PENDING]: listPendingQuery.filter(item => item !== data.id.toString())
        }));
      }
    });
    return data;
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
export interface requestSendFeedbackParams {
  motobikeProductId: string,
  rate: number,
  content:string
}

export const requestSendFeedback = async (params: requestSendFeedbackParams,customerId:string) => {
  const accessToken = await getToken();
    const { data } = await axios.post<IFeedbackProduct>(`https://${BASE_URL}/api/feedback/product`, params, {
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization": accessToken || ""
      }
    });
    if (data){
     const _product = getProduct(params.motobikeProductId);
      if(_product) {
        const _currentFeedback = _product.feedbackProducts.filter(item => item.customer.accountId !== customerId);
        syncProduct([{
          ..._product,
          feedbackProducts: [..._currentFeedback, data]
        }])
      }
      return data;
    }
    SimpleToast.show("Gửi phản hồi thành công");
};
export const requestEditFeedback = async (params: requestSendFeedbackParams,customerId:string,feedbackId:string) => {
  const accessToken = await getToken();
    const { data } = await axios.put<IFeedbackProduct>(`https://${BASE_URL}/api/feedback/product/${feedbackId}`, params, {
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization": accessToken || ""
      }
    });
    if (data){
      const _product = getProduct(params.motobikeProductId);
      if(_product) {
        const _currentFeedback = _product.feedbackProducts.filter(item => item.customer.accountId !== customerId);
        syncProduct([{
          ..._product,
          feedbackProducts: [..._currentFeedback, data]
        }])
      }
      return data;
    }
    SimpleToast.show("Gửi phản hồi thành công");
};
export interface IFeedbackStaffParams {
  customerId: string,
  staffId: string,
  title:string,
  content:string
}
export const requestFeedbackStaff = async (params: IFeedbackStaffParams) => {
  const accessToken = await getToken();
    const { data } = await axios.post<FeedbackStaff>(`https://${BASE_URL}/api/feedback/staff`, params, {
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization": accessToken || ""
      }
    });
    return data

};
export const requestEditFeedbackStaff = async (params: IFeedbackStaffParams,feedbackId:string) => {
  const accessToken = await getToken();
    const { data } = await axios.put<FeedbackStaff>(`https://${BASE_URL}/api/feedback/staff/${feedbackId}`, params, {
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization": accessToken || ""
      }
    });
    return data
};
