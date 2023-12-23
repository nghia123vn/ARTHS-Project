import { axiosPrivate } from "../api/axios";
// import { useEffect } from "react";
import userRefreshToken from "./useRefreshToken";
// import { AccessTokenLogin } from "@/types/useSelector/loginReducer";
// import { useSelector } from "react-redux";
// import useAuth from "./useAuth";

let requestIntercept: number | null = null;
let responseIntercept: number | null = null;

const cleanupInterceptors = () => {
    if (requestIntercept !== null) {
        axiosPrivate.interceptors.request.eject(requestIntercept);
        requestIntercept = null;
    }

    if (responseIntercept !== null) {
        axiosPrivate.interceptors.response.eject(responseIntercept);
        responseIntercept = null;
    }
};

const userAxiosPrivate = () => {
    const refresh = userRefreshToken();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // const { auth }: any = useAuth();
    const storedAuth = localStorage.getItem('auth');
    const initialAuth = storedAuth ? JSON.parse(storedAuth) : {};
    // const loginInfo = useSelector((state: AccessTokenLogin) => state?.loginReducer);

    cleanupInterceptors();

    requestIntercept = axiosPrivate.interceptors.request.use(
        config => {
            if (!config.headers['Authorization']) {
                config.headers['Authorization'] = `Bearer ${initialAuth?.accessToken}`;
            }
            return config;
        }, (error) => Promise.reject(error)
    );

    responseIntercept = axiosPrivate.interceptors.response.use(
        response => response,
        async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 403 && !prevRequest?.sent) {
                prevRequest.sent = true;
                const newAccessToken = await refresh();
                prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axiosPrivate(prevRequest);
            }
            return Promise.reject(error);
        }

    );


    return axiosPrivate;
}

export default userAxiosPrivate;