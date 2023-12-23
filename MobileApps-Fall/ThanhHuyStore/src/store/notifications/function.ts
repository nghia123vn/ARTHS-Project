import axios from "axios";
import { BASE_URL } from "@/global";
import { batch } from "react-redux";
import { INotification } from "@/store/notifications/type";
import { setNotificationQueries, syncNotification } from "@/store/notifications/index";
import { getToken } from "@/utils/loginHandle";
import { getAccount } from "@/zustand/account";
import SimpleToast from "react-native-simple-toast";

export const requestNotifications = async () => {
  const accessToken = await getToken()
    const { data } = await axios.get<{
      pagination: {
        pageNumber: number;
        pageSize: number;
        totalRow: number;
      }
      data: INotification[]
    }>(`https://${BASE_URL}/api/notifications`,
      {
        headers: {
          "accept": "text/plain",
          "Authorization": accessToken || ""
        }
      });
    if (data) {
      const _data = data.data;
      batch(() => {
        syncNotification(data.data);
        setNotificationQueries(prev => ({
          ...prev,
          ["all"]: _data.map(item => item.id.toString())
        }));
      });
    }
    return data.data;
};
export const requestLoadMoreNoti = async (pageNumber:number) => {
  const accessToken = await getToken()
  try {
    const { data } = await axios.get<{
      pagination: {
        pageNumber: number;
        pageSize: number;
        totalRow: number;
      }
      data: INotification[]
    }>(`https://${BASE_URL}/api/notifications?pageNumber=${pageNumber}`,
      {
        headers: {
          "accept": "text/plain",
          "Authorization": accessToken || ""
        }
      });
    if (data) {
      const _data = data.data;
      batch(() => {
        syncNotification(data.data);
        setNotificationQueries(prev => ({
          ...prev,
          ["all"]: [...prev["all"], ..._data.map(item => item.id.toString())]
        }));
      });
    }
    return data.data;
  } catch (error) {
    console.error("Error sending request:", error);
  }
};
export const putNotification = async (id:string) => {
  const accessToken = await getToken()
    const { data } = await axios.put<INotification>(`https://${BASE_URL}/api/notifications/${id}`,
      {
        headers: {
          "accept": "text/plain",
          "Authorization": accessToken || ""
        }
      });
    if (data) {
      batch(() => {
        syncNotification([data]);
      });
    }
    return data.data;
};
export const markedAllNoti = async () => {
  const accessToken = await getToken()
  const account = getAccount()
    const { data } = await axios.put<INotification>(`https://${BASE_URL}/api/notifications/mark-as-read/${account?.id}`,
      {
        headers: {
          "accept": "text/plain",
          "Authorization": accessToken || ""
        }
      });
    if (data) {
      SimpleToast.show("Đánh dấu tất cả thông báo thành công, vui lòng tải lại", SimpleToast.SHORT);
    }
    return data.data;
};
export const requestDeleteNoti = async (id:string) => {
  const accessToken = await getToken()
    const { data } = await axios.delete<INotification>(`https://${BASE_URL}/api/notifications/${id}`,
      {
        headers: {
          "accept": "text/plain",
          "Authorization": accessToken || ""
        }
      });
    if (data) {
      batch(() => {
        syncNotification([data]);
        setNotificationQueries(prev => ({
          ...prev,
          ["all"]: prev["all"].filter(item => item !== id)
        }))
      });
    }
    return data.data;
};
