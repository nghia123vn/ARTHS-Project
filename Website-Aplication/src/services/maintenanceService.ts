import userAxiosPrivate from "@/hooks/useAxiosPrivate";
import { callListMaintenance } from "@/types/actions/listMaintenance";

export class publicAxios {
    getMaintenance = async (data: callListMaintenance<string,number>) => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/maintanance-schedules?pageNumber=${data.pageNumber}`);
    };

    }

export const maintenanceService = new publicAxios();

