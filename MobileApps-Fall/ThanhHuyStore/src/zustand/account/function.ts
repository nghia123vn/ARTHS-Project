import { getToken, saveToken } from "@/utils/loginHandle";
import axios from "axios";
import { BASE_URL } from "@/global";
import { getAccount, setAccount } from "@/zustand/account/index";
import { IAccount, IRegisterAccount } from "@/zustand/account/type";
import { setGlobalValue } from "@/zustand/globalValue";
import { getAddressByQuery, setAddressQueries, syncAddress } from "@/store/address";
import { batch } from "react-redux";
import SimpleToast from "react-native-simple-toast";

export const requestAccountDetail = async () => {
  const accessToken = await getToken();
  const address = getAddressByQuery('all');
  try {
    const { data } = await axios.get<IAccount>(`https://${BASE_URL}/api/auth`,
      {
        headers: {
          "accept": "text/plain",
          "Authorization": accessToken || ""
        }
      });
    if (data) {
      if (address.length === 0) {
        batch(()=>{
          syncAddress([
            {
              id: "default",
              name: data.fullName,
              address: data.address,
              phoneNumber: data.phoneNumber
            }
          ])
          setAddressQueries(prev => ({
            ...prev,
            ['all']: ["default"],
          }))
        })
      }
      setAccount(data);
    }
    return data;
  } catch (error) {
    console.error("Error sending request:", error);
  }
};
export const requestRefreshToken = async () => {
  const token = await getToken();
  try {
    const { data } = await axios.post(`https://${BASE_URL}/api/auth/refresh-token`
      , {}, {
        headers: {
          "accept": "text/plain",
          "Content-Type": "application/json",
          "Authorization": token || ""
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
export interface IUpdateAccountParams {
  fullName: string;
  gender: string;
  address: string;
  oldPassword?: string;
  newPassword?: string;
}
export const requestUpdateCustomerInfo = async (params:IUpdateAccountParams,id:string) => {
  const token = await getToken();
    const { data } = await axios.put(`https://${BASE_URL}/api/customers/${id}`,params,
       {
        headers: {
          "accept": "text/plain",
          "Content-Type": "application/json",
          "Authorization": token || ""
        }
      });
    if(data){
      console.log('data',data)
      setAccount(data)
      SimpleToast.show('Cập nhật thành công',SimpleToast.SHORT)
    }
    return data;
};

export const uploadAvatar = async (image:any) => {
    const apiUrl = `https://${BASE_URL}/api/customers/avatar`;
    const token = await getToken();
    const formData = new FormData();
    formData.append('image',
      {
        // @ts-ignore
        uri: image.path,
        type: image.mime,
        name: image.path.split('/').pop()
      }
  );
    // Make the PUT request
    const {data} = await axios.put<IRegisterAccount>(apiUrl, formData,{
      headers: {
        "accept": "text/plain",
        'Content-Type': 'multipart/form-data',
        "Authorization": token || ""
      }
    }
    );
    if(data){
      const account= getAccount()
      setAccount({
        ...account,
        avatar:data.avatar
      })
    }
    // Handle the response here
};
