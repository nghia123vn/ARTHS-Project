import userAxiosPrivate from "@/hooks/useAxiosPrivate"
import { itemFilter } from "@/types/actions/filterCreate";
import { axiosImageDelete } from "@/types/actions/listService";
import { callProduct, callSortProduct } from "@/types/actions/product";


export class Private {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createProduct = async (data: any) => {
        const formData = new FormData();
        const axiosPrivate = userAxiosPrivate();
        formData.append('name', data.name);
        formData.append('priceCurrent', data.priceCurrent);
        formData.append('quantity', data.quantity);
        formData.append('description', data.description);
        formData.append('installationFee', data.installationFee);
        formData.append('discountId', data.discountId);
        formData.append('warrantyId', data.warrantyId);
        formData.append('categoryId', data.categoryId);
        for (const id of data.vehiclesId) {
            formData.append('vehiclesId', id);
        }
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i], data.images[i].name);
        }
        return await axiosPrivate.post(`/motobike-products`, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateProduct = async (idProduct:string,data: any) => {
        const formData = new FormData();
        const axiosPrivate = userAxiosPrivate();
        formData.append('name', data.name);
        formData.append('priceCurrent', data.priceCurrent);
        formData.append('quantity', data.quantity);
        formData.append('description', data.description);
        formData.append('installationFee', data.installationFee);
        formData.append('discountId', data.discountId);
        formData.append('warrantyId', data.warrantyId);
        formData.append('categoryId', data.categoryId);
        for (const id of data.vehiclesId) {
            formData.append('vehiclesId', id);
        }
        // for (let i = 0; i < data.images.length; i++) {
        //     formData.append('images', data.images[i], data.images[i].name);
        // }
        return await axiosPrivate.put(`/motobike-products/${idProduct}`, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        })
    }
    updateProductStatus = async (idProduct:string,status: string) => {
        const formData = new FormData();
        const axiosPrivate = userAxiosPrivate();
        formData.append('status', status);
        return await axiosPrivate.put(`/motobike-products/${idProduct}`, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateProductImage = async (idProduct: string, data: any) => {
        const formData = new FormData();
        const axiosPrivate = userAxiosPrivate();
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i], data.images[i].name);
        }
        return await axiosPrivate.put(`/motobike-products/image/${idProduct}`, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        })
    }
    deleteProductImage = async (data: axiosImageDelete) => {
        const axiosPrivate = userAxiosPrivate();
        const formData = new FormData();
        if (data?.deleteImage?.length > 0) {
            for (const id of data.deleteImage) {
                formData.append('ids', id);
            }
            return await axiosPrivate.delete(`/motobike-products/image`, {
                data: formData,
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            });
        }
    }

    getListProduct = async (data: callProduct<string,number>) => {
        const axiosPrivate = userAxiosPrivate();
        const enCodeStatus = encodeURIComponent(data.status)
        return await axiosPrivate.get(`/motobike-products?status=${enCodeStatus}&pageNumber=${data.number}`)
    }

    getListTopProduct = async () => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/motobike-products/best-sellers`)
    }

    getSortListProduct = async (data: callSortProduct<string,number>) => {
        const axiosPrivate = userAxiosPrivate();
        const enCodeStatus = encodeURIComponent(data.status);
        const encodeName = encodeURIComponent(data.name);
        if (data.value === "name") {
            return await axiosPrivate.get(`/motobike-products?name=${encodeName}&status=${enCodeStatus}&sortByNameAsc=${data.sortByAsc}&pageNumber=${data.pageNumber}`)
        } else if (data.value === "price") {
            return await axiosPrivate.get(`/motobike-products?name=${encodeName}&status=${enCodeStatus}&sortByPriceAsc=${data.sortByAsc}&pageNumber=${data.pageNumber}`)
        } else {
            return await axiosPrivate.get(`/motobike-products?name=${encodeName}&status=${enCodeStatus}&pageNumber=${data.pageNumber}`)
        }
    }
    getCategoryProduct = async () => {
        const axiosPrivate = userAxiosPrivate();

        return await axiosPrivate.get(`/categories`)
    }

    getWarrantyProduct = async () => {
        const axiosPrivate = userAxiosPrivate();

        return await axiosPrivate.get(`/warranties`)
    }
    //Vehicle
    createVehicle = async (vehicleName:string) => {   
        const axiosPrivate = userAxiosPrivate();
        const data={
            vehicleName:vehicleName
        }
        return await axiosPrivate.post(`/vehicles`,data)
    }
    deleteVehicle = async (vehicleId:string) => {   
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.delete(`/vehicles/${vehicleId}`)
    }
    getVehicleProduct = async () => {
        const axiosPrivate = userAxiosPrivate();

        return await axiosPrivate.get(`/vehicles`)
    }

    getFilterCreateProduct = async (data: itemFilter<string, number>) => {
        const axiosPrivate = userAxiosPrivate();
        const enCodeStatus = encodeURIComponent(data.status)
        if (data.name && data.category) {
            const encodeName = encodeURIComponent(data.name);
            const encodeCategory = encodeURIComponent(data.category);
            return await axiosPrivate.get(`/motobike-products?excludeStatus=${enCodeStatus}&name=${encodeName}&category=${encodeCategory}&pageNumber=${data.paginationNumber}`)
        } else if (data.name) {
            const encodeName = encodeURIComponent(data.name);
            return await axiosPrivate.get(`/motobike-products?excludeStatus=${enCodeStatus}&name=${encodeName}&pageNumber=${data.paginationNumber}`)
        } else if (data.category) {
            const encodeCategory = encodeURIComponent(data.category);
            return await axiosPrivate.get(`/motobike-products?excludeStatus=${enCodeStatus}&category=${encodeCategory}&pageNumber=${data.paginationNumber}`)
        }else{
            return await axiosPrivate.get(`/motobike-products?excludeStatus=${enCodeStatus}&pageNumber=${data.paginationNumber}`)
        }
    }

    getDetailProduct = async (id: string) => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/motobike-products/${id}`)
    }

}

export const privateService = new Private();