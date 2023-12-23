import userAxiosPrivate from "@/hooks/useAxiosPrivate"
import { serviceFilter, sortService } from "@/types/actions/filterService";
import { callListFilterEmployee } from "@/types/actions/listEmployee";
import { axiosImageDelete, callService } from "@/types/actions/listService";
import { callUpdatePasswordProfile, callUpdateProfile } from "@/types/actions/profile";


export class Private {
    getProfile = async () => {
        const axiosPrivate = userAxiosPrivate();

        return await axiosPrivate.get(`/auth`)
    }

    updateProfile = async (idAccount: string, role: string, data: callUpdateProfile) => {
        const axiosPrivate = userAxiosPrivate();
        const checkRole = role.toLowerCase();
        return await axiosPrivate.put(`/${checkRole}s/${idAccount}`, data)
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateImageProfile = async (role: string, data: any) => {
        const formData = new FormData();
        const axiosPrivate = userAxiosPrivate();
        const checkRole = role.toLowerCase();
        if (data.showImage !== null) {
            formData.append('image', data.image, data.image.name);
        }
        return await axiosPrivate.put(`/${checkRole}s/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    }

    updatePasswordProfile = async (idAccount: string, role: string, data: callUpdatePasswordProfile) => {
        const axiosPrivate = userAxiosPrivate();
        const checkRole = role.toLowerCase();
        return await axiosPrivate.put(`/${checkRole}s/${idAccount}`, data)
    }

    getListStaff = async () => {
        const axiosPrivate = userAxiosPrivate();
        const endCodeStatus = encodeURIComponent("Không hoạt động");
        return await axiosPrivate.get(`/staffs?excludeStatus=${endCodeStatus}`)
    }

    getListEmployees = async (role: string, data: callListFilterEmployee<string>) => {
        const checkRole = role.toLowerCase();
        const axiosPrivate = userAxiosPrivate();
        const encodeStatus = encodeURIComponent(data?.status);
        const encodeName = encodeURIComponent(data.fullName);
        return await axiosPrivate.get(`/${checkRole}s?fullName=${encodeName}&excludeStatus=${encodeStatus}`)
    }

    getDetailEmployees = async (role: string, employeeId: string) => {
        const checkRole = role.toLowerCase();
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/${checkRole}s/${employeeId}`)
    }

    //service
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    createService = async (data: any) => {
        const formData = new FormData();
        const axiosPrivate = userAxiosPrivate();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('discountId', data.discountId);
        formData.append('warrantyDuration', data.warrantyDuration);
        formData.append('duration', data.duration);
        formData.append('reminderInterval', data.reminderInterval);
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i], data.images[i].name);
        }
        return await axiosPrivate.post(`/repair-services`, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateService = async (serviceId: string, data: any) => {
        const formData = new FormData();
        const axiosPrivate = userAxiosPrivate();
        formData.append('name', data.name);
        formData.append('price', data.price);
        formData.append('description', data.description);
        formData.append('discountId', data.discountId);
        formData.append('warrantyDuration', data.warrantyDuration);
        formData.append('duration', data.duration);
        formData.append('reminderInterval', data.reminderInterval);
        // for (let i = 0; i < data.images.length; i++) {
        //     formData.append('images', data.images[i], data.images[i].name);
        // }
        return await axiosPrivate.put(`/repair-services/${serviceId}`, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        })
    }
    updateServiceStatus = async (idService: string, status: string) => {
        const formData = new FormData();
        const axiosPrivate = userAxiosPrivate();
        formData.append('status', status);
        return await axiosPrivate.put(`/repair-services/${idService}`, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        })
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateServiceImage = async (serviceId: string, data: any) => {
        const formData = new FormData();
        const axiosPrivate = userAxiosPrivate();
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i], data.images[i].name);
        }
        return await axiosPrivate.put(`/repair-services/image/${serviceId}`, formData, {
            headers: {
                'Content-type': 'multipart/form-data',
            },
        })
    }
    deleteServiceImage = async (data: axiosImageDelete) => {
        const axiosPrivate = userAxiosPrivate();
        const formData = new FormData();
        if (data?.deleteImage?.length > 0) {
            for (const id of data.deleteImage) {
                formData.append('ids', id);
            }
            return await axiosPrivate.delete(`/repair-services/image`, {
                data: formData,
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            });
        }
    }
    getListService = async (data: callService<string, number>) => {
        const axiosPrivate = userAxiosPrivate();
        const endCodeStatus = encodeURIComponent(data.status);
        return await axiosPrivate.get(`/repair-services?status=${endCodeStatus}&pageNumber=${data.pageNumber}`)
    }

    getSortService = async (data: sortService<string, number>) => {
        const axiosPrivate = userAxiosPrivate();
        const encodeName = encodeURIComponent(data.name);
        const encodeStatus = encodeURIComponent(data.status);
        if (data.value === "name") {
            return await axiosPrivate.get(`/repair-services?name=${encodeName}&status=${encodeStatus}&sortByNameAsc=${data.sortByAsc}&pageNumber=${data.pageNumber}`)
        } else if (data.value === "price") {
            return await axiosPrivate.get(`/repair-services?name=${encodeName}&status=${encodeStatus}&sortByPriceAsc=${data.sortByAsc}&pageNumber=${data.pageNumber}`)
        } else {
            return await axiosPrivate.get(`/repair-services?name=${encodeName}&status=${encodeStatus}&pageNumber=${data.pageNumber}`)
        }
    }

    getDetailService = async (id: string) => {
        const axiosPrivate = userAxiosPrivate();
        return await axiosPrivate.get(`/repair-services/${id}`)
    }

    getListFilterService = async (data: serviceFilter<string, number>) => {
        const axiosPrivate = userAxiosPrivate();
        if (data.name) {
            const encodeName = encodeURIComponent(data.name);
            const encodeStatus = encodeURIComponent(data.status);
            return await axiosPrivate.get(`/repair-services?name=${encodeName}&status=${encodeStatus}&pageNumber=${data.paginationNumber}`)
        }
    }
}

export const privateService = new Private();