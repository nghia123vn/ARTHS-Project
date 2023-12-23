import {useEffect} from 'react';
import SimpleToast from "react-native-simple-toast";
import { Axios, AxiosError } from "axios";

export const useAutoToastError = (
  error: any,
  action?: string,
  defaultMessage?: string,
) => {
  useEffect(() => {
    const axiosError = error as AxiosError<any>
    if(!axiosError?.response) return
    SimpleToast.show(axiosError?.response.data.Message || defaultMessage || "Có lỗi xảy ra");
  }, [error, defaultMessage]);
};

export default useAutoToastError;
