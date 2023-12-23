import axios from "axios";
import { BASE_URL } from "@/global";
import { batch } from "react-redux";
import { EBookingStatus, IBooking } from "@/store/booking/type";
import { getBooking, getBookingByQuery, setBookingQueries, syncBooking } from "@/store/booking/index";
import { getToken } from "@/utils/loginHandle";
import { setOrderQueries } from "@/store/order";


export interface IBookingParams {
  customerId: string;
  bookingDate: string;
  bookingStatus: EBookingStatus;
  excludeBookingStatus: string;
  pageNumber: number;
  pageSize: number;
}

export const requestBookings = async (params: IBookingParams) => {
    const { data } = await axios.get<{
      data: IBooking[];
      pagination: {
        totalRow: number;
        pageNumber: number;
        pageSize: number;
      }
    }>(`https://${BASE_URL}/api/repair-bookings?customerId=${params.customerId}&bookingStatus=${encodeURIComponent(params.bookingStatus)}`, {
      headers: {
        "accept": "text/plain"
      }
    });
    batch(() => {
      const _data = data.data;
      if (_data.length) {
        syncBooking(_data);

        setBookingQueries(prev => ({
          ...prev,
          [params.bookingStatus]: _data.filter(item=>item.status=== params.bookingStatus).map((item) => item.id.toString()),
        }));
      }
    });
};

export interface ICreateBookingParams {
  dateBook: string,
  description: string,
  staffId: string,
}

export const requestCreateBooking = async (params: ICreateBookingParams) => {
  const accessToken = await getToken();
    const { data } = await axios.post<IBooking>(`https://${BASE_URL}/api/repair-bookings`, params, {
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization": accessToken || ""
      }
    });
    batch(() => {
      if (data) {
        syncBooking([data]);
        setBookingQueries(prev => ({
          ...prev,
          ["all"]: [data.id.toString(), ...prev["all"]]
        }));
      }
    });
    return data;
};

export const requestBookingOrder = async (id: string) => {
    const { data } = await axios.get<IBooking>(`https://${BASE_URL}/api/repair-bookings/${id}`, {
      headers: {
        "accept": "text/plain"
      }
    });
    if (data.orderId) {
      return data.orderId;
    }
};

export const getALlBookingData = () => {
  const listIds = getBookingByQuery("all") || [];
  if (listIds.length) {
    return listIds.map((id) => getBooking(id));
  }
  return [];
};

export interface ICancelBookingParams {
  status: EBookingStatus,
  cancellationReason: string,
}

export const requestCancelBooking = async (params: ICancelBookingParams, id: string) => {
  const accessToken = await getToken();
    const { data } = await axios.put<
      IBooking
    >(`https://${BASE_URL}/api/repair-bookings/${id}`, params, {
      headers: {
        "accept": "text/plain",
        "Content-Type": "application/json",
        "Authorization": accessToken || ""
      }
    });
    batch(() => {
      if (data) {
        syncBooking([data]);
        const listCancelQuery = getBookingByQuery(EBookingStatus.CANCELLED);
        setOrderQueries(prev => ({
          ...prev,
          [EBookingStatus.CANCELLED]: [data.id.toString(), ...listCancelQuery]
        }));
      }
    });
    return data;

};
export const requestBookingByid = async (id:string) => {
    const { data } = await axios.get<IBooking>(`https://${BASE_URL}/api/repair-bookings/${id}`, {
      headers: {
        "accept": "text/plain"
      }
    });
    batch(() => {
      if (data) {
        syncBooking([data]);
      }
    });

};
