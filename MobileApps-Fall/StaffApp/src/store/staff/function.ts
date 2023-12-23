import axios from "axios";
import {BASE_URL} from "@/global";
import {setGlobalValue} from "@/zustand/globalValue";
import {saveToken} from "@/utils/loginHandle";
import {IRegisterAccount} from "@/zustand/account/type";
import { IStaffDetail } from "@/store/staff/type";


export interface ILoginParams {
    phoneNumber: string;
    password: string;
}

export const requestLogin = async (params: ILoginParams) => {
    try {
        const {data} = await axios.post(`https://${BASE_URL}/api/auth`,
            params
            , {
                headers: {
                    "accept": "text/plain",
                    "Content-Type": "application/json"
                }
            });
        if (data) {
            setGlobalValue({
                accessToken: data.accessToken
            });
            await saveToken(data.accessToken);
        }
        return data.accessToken;
    } catch (error) {
        console.error("Error sending request:", error);
    }
};

export interface IRegisterParams {
    phoneNumber: string;
    password: string;
    fullName: string;
    gender: string;
}

export const requestRegister = async (params: IRegisterParams) => {
    try {
        const {data} = await axios.post<IRegisterAccount>(`https://${BASE_URL}/api/staffs`,
            params
            , {
                headers: {
                    "accept": "text/plain",
                    "Content-Type": "application/json"
                }
            });
        if (data) {
            return data;
        }
        return data;
    } catch (error) {
        console.error("Error sending request:", error);
    }
};
export const requestStaffById = async (id: string) => {
    try {
        const { data } = await axios.get<IStaffDetail>(`https://${BASE_URL}/api/staffs/${id}`, {
            headers: {
                "accept": "text/plain"
            }
        });
        return data;
    } catch (error) {
        console.error("Error sending request:", error);
    }
}
