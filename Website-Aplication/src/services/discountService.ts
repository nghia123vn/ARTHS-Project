import userAxiosPrivate from "@/hooks/useAxiosPrivate";
import { callListDiscount } from "@/types/actions/listDiscout";

export class Private {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createDiscount = async (data: any) => {
        const formData = new FormData();
        const axiosPrivate = userAxiosPrivate();
        formData.append('title', data.title);
        formData.append('discountAmount', data.discountAmount);
        formData.append('description', data.description);
        formData.append('startDate', data.startDate);
        formData.append('endDate', data.endDate);
        for (const id of data.motobikeProductId) {
            formData.append('motobikeProductId', id);
        }
        for (const id of data.repairServiceId) {
            formData.append('repairServiceId', id);
        }
        formData.append('image', data.image, data.image.name);

        return await axiosPrivate.post(`/discounts`, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateDiscount = async (data: any,discountId:string) => {
        const formData = new FormData();
        const axiosPrivate = userAxiosPrivate();
        formData.append('title', data.title);
        formData.append('discountAmount', data.discountAmount);
        formData.append('description', data.description);
        formData.append('startDate', data.startDate);
        formData.append('endDate', data.endDate);
        for (const id of data.motobikeProductId) {
            formData.append('motobikeProductId', id);
        }
        for (const id of data.repairServiceId) {
            formData.append('repairServiceId', id);
        }
        if(data.image){
            formData.append('image', data.image, data.image.name);
        }

        return await axiosPrivate.put(`/discounts/${discountId}`, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        })
    }
    updateDiscountStatus = async (discountId:string) => {
        // const formData = new FormData();
        const axiosPrivate = userAxiosPrivate();
        // formData.append('status', status);
        return await axiosPrivate.put(`/discounts/discontinued/${discountId}`)
    }
    getDiscount = async (data: callListDiscount<string, number>) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeStatus = encodeURIComponent(data?.status);
        const encodeTitle = encodeURIComponent(data.title);
        return await axiosPrivate.get(`/discounts?title=${encodeTitle}&status=${encodeStatus}&pageNumber=${data.pageNumber}`)
    }
    getDetailDiscount = async (discountId: string) => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/discounts/${discountId}`)
    }

}

export const discountService = new Private();