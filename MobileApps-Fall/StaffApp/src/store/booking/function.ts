import axios from "axios";
import { BASE_URL } from "@/global";
import { batch } from "react-redux";
import { IBooking } from "@/store/booking/type";
import { setBookingQueries, syncBooking } from "@/store/booking/index";
import moment from "moment";

export interface IRequestBooking {
  pageNumber: number;
  staffId: string;
}

export const requestBookings = async (params: IRequestBooking) => {
  try {
    const { data } = await axios.get<{
      pagination: {
        pageNumber: number;
        pageSize: number;
        totalRow: number;
      }
      data: IBooking[]
    }>(`https://${BASE_URL}/api/repair-bookings?pageNumber=${params.pageNumber}`,
      {
        headers: {
          "accept": "text/plain"
        }
      });
    if (data) {
      const _data = data.data;
      batch(() => {
        syncBooking(data.data);
        setBookingQueries(prev => ({
          ...prev,
          ["all"]: _data.map(item => item.id.toString()),
          ["today"]: _data.filter(item => isDateToday(item.dateBook)).map(item => item.id.toString()),
        }));
      });
    }
    return data.data;
  } catch (error) {
    console.error("Error sending request:", error);
  }
};
export const requestLoadMoreBookings = async (params: IRequestBooking) => {
  try {
    const { data } = await axios.get<{
      pagination: {
        pageNumber: number;
        pageSize: number;
        totalRow: number;
      }
      data: IBooking[]
    }>(`https://${BASE_URL}/api/repair-bookings?pageNumber=${params.pageNumber}`,
      {
        headers: {
          "accept": "text/plain"
        }
      });
    if (data) {
      const _data = data.data;
      batch(() => {
        syncBooking(data.data);
        setBookingQueries(prev => ({
          ...prev,
          ["all"]: [...prev.all || [], ..._data.map(item => item.id.toString())],
          ["today"]: [...prev.today || [], ..._data.filter(item => isDateToday(item.dateBook)).map(item => item.id.toString())],
        }));
      });
    }
    return data.data;
  } catch (error) {
    console.error("Error sending request:", error);
  }
};

function isDateToday(dateString: string): boolean {
  // Parse the date string using Moment
  const date = moment(dateString);

  // Get the current date
  const currentDate = moment();

  // Check if the parsed date is today and return the result as a boolean
  return date.isSame(currentDate, "day");
}
