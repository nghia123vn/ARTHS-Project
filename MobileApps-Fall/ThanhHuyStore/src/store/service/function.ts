import axios from "axios";
import { BASE_URL } from "@/global";
import { batch } from "react-redux";
import { IService } from "@/store/service/type";
import { getService, setServiceQueries, syncService } from "@/store/service/index";



export interface IServiceQuery {
  name: string;
}

export const requestListService = async () => {
  const { data } = await axios.get<{
    pagination: {
      pageNumber: number;
      pageSize: number;
      totalRow: number;
    }
    data: IService[]
  }>(`https://${BASE_URL}/api/repair-services`,
    {
      headers: {
        "accept": "text/plain"
      }
    });
  batch(() => {
    if (data) {
      const _data = data.data;
      syncService(_data);
      setServiceQueries(prev => ({
        ...prev,
        ["all"]: _data.map(item => item.id.toString())
      }));
    }
  });
};

export const requestService = async (params: {id: string | number}) => {
  const { data } = await axios.get<IService>(`https://${BASE_URL}/api/repair-services/${params.id}`);
  batch(() => {
    if (data) {
      syncService([data]);
    }
  });
  return data;
};
export const requestSearchServices = async (query: IServiceQuery) => {
  const { name } = query;
  const { data } = await axios.get<IService[]>(`https://${BASE_URL}/api/repair-services?name=${name}`,
    {
      headers: {
        "accept": "text/plain"
      }
    });
  batch(() => {
    if (data) {
      // syncProduct(data);
      setServiceQueries(prev => ({
        ...prev,
        ["search"]: data.map(item => item.id.toString())
      }));
    }
  });
};
