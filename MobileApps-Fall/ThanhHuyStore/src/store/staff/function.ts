import axios from "axios";
import { BASE_URL } from "@/global";
import { batch } from "react-redux";
import { EStaffStatus, IStaff, IStaffDetail } from "@/store/staff/type";
import { setStaffQueries, syncStaff } from "@/store/staff/index";

export const requestStaffs = async () => {
    const { data } = await axios.get<IStaff[]>(`https://${BASE_URL}/api/staffs?excludeStatus=Kh%C3%B4ng%20ho%E1%BA%A1t%20%C4%91%E1%BB%99ng`, {
      headers: {
        "accept": "text/plain"
      }
    });
    batch(() => {
      if (data) {
        syncStaff(data);
        setStaffQueries(prev => ({
          ...prev,
          [EStaffStatus.INACTIVE]: data.map(item => item.id.toString()),
          ["all"]: data.map(item => item.id.toString())
        }));
      }
    });
};

export const requestStaffById = async (id: string) => {
    const { data } = await axios.get<IStaffDetail>(`https://${BASE_URL}/api/staffs/${id}`, {
      headers: {
        "accept": "text/plain"
      }
    });
    return data;
}
