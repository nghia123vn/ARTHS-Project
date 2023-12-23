import userAxiosPrivate from "@/hooks/useAxiosPrivate";

export class Private {
    getRevenue = async (pageNumber: number,filters:any) => {
        const axiosPrivate = userAxiosPrivate();
        const queryParams = new URLSearchParams({...filters , pageNumber: pageNumber.toString()});
        //URLSearchParams không dùng encodeURIComponent
        //console.log('query revenue', queryParams.toString());
        return await axiosPrivate.get(`/revenues?${queryParams}`)
    }

    getStatics = async (filters:any) => {
        const axiosPrivate = userAxiosPrivate();
        const queryParams = new URLSearchParams({...filters});
        //console.log('query statics', queryParams.toString());
        return await axiosPrivate.get(`/revenues/statics?${queryParams}`)
    }
}
export const revenueService = new Private();