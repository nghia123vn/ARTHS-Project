import userAxiosPrivate from "@/hooks/useAxiosPrivate";
import {itemFilterDiscount } from "@/types/actions/filterCreate";
import { callServiceDiscount } from "@/types/actions/filterService";
import { itemUpdateSetting } from "@/types/actions/typeSetting";

export class Private {
    getServiceDiscount = async (data:callServiceDiscount<string,number>) => {
        const axiosPrivate = userAxiosPrivate();
        const endCodeName = encodeURIComponent(data.name);
        const endCodeStatus = encodeURIComponent(data.status);
        if(data.discountId){
            return await axiosPrivate.get(`/repair-services?discountId=${data.discountId}&name=${endCodeName}&status=${endCodeStatus}&haveDiscount=false&pageNumber=${data.pageNumber}`)
        }else{
            return await axiosPrivate.get(`/repair-services?name=${endCodeName}&status=${endCodeStatus}&haveDiscount=false&pageNumber=${data.pageNumber}`)
        }
    }
    // getServiceDiscountUpdate = async (data:callServiceDiscount<string,number>) => {
    //     const axiosPrivate = userAxiosPrivate();
    //     const endCodeName = encodeURIComponent(data.name);
    //     const endCodeStatus = encodeURIComponent(data.status);
    //     return await axiosPrivate.get(`/repair-services?name=${endCodeName}&status=${endCodeStatus}&haveDiscount=false&pageNumber=${data.pageNumber}`)
    // }
    getProductDiscount = async (data: itemFilterDiscount<string, number>) => {
        const axiosPrivate = userAxiosPrivate();
        const enCodeStatus = encodeURIComponent(data.status)
        const encodeName = encodeURIComponent(data.name);
        const encodeCategory = encodeURIComponent(data.category);
        if(data.discountId){
            return await axiosPrivate.get(`/motobike-products?discountId=${data.discountId}&haveDiscount=${data.haveDiscount}&status=${enCodeStatus}&name=${encodeName}&category=${encodeCategory}&pageNumber=${data.paginationNumber}`)
        }else{
            return await axiosPrivate.get(`/motobike-products?haveDiscount=${data.haveDiscount}&status=${enCodeStatus}&name=${encodeName}&category=${encodeCategory}&pageNumber=${data.paginationNumber}`)
        }
    }

    // getProductDiscountUpdate = async (data: itemFilterDiscount<string, number>) => {
    //     const axiosPrivate = userAxiosPrivate();
    //     const enCodeStatus = encodeURIComponent(data.status)
    //     const encodeName = encodeURIComponent(data.name);
    //     const encodeCategory = encodeURIComponent(data.category);
    //     return await axiosPrivate.get(`/motobike-products?haveDiscount=${data.haveDiscount}&status=${enCodeStatus}&name=${encodeName}&category=${encodeCategory}&pageNumber=${data.paginationNumber}`)
    // }

    getDiscountCreate = async (pageSize: number) => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/discounts?status=Applying&pageSize=${pageSize}`)
    }

    getSetting = async ()=>{
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/configurations`)
    }

    updateSetting = async (data:itemUpdateSetting)=>{
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.put(`/configurations`,data)
    }
}

export const ownerService = new Private();