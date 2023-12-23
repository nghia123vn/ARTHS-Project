import { getToken, saveToken } from "@/utils/loginHandle";
import axios from "axios";
import { BASE_URL } from "@/global";
import { getAccount, setAccount } from "@/zustand/account/index";
import { IAccount, IRegisterAccount } from "@/zustand/account/type";
import { setGlobalValue } from "@/zustand/globalValue";

export const requestAccountDetail = async () => {
  const accessToken = await getToken()
  try {
    const { data } = await axios.get<IAccount>(`https://${BASE_URL}/api/auth`,
      {
        headers: {
          "accept": "text/plain",
          "Authorization": accessToken || ''
        }
      });
    if (data){
      setAccount(data)
    }
    return data;
  } catch (error) {
    console.error("Error sending request:", error);
  }
};
export const requestRefreshToken = async () => {
  const token = await getToken()
  try {
    const { data } = await axios.post(`https://${BASE_URL}/api/auth/refresh-token`
      ,{}, {
        headers: {
          "accept": "text/plain",
          "Content-Type": "application/json",
          "Authorization": token || ''
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
export const uploadAvatar = async (image:any) => {
  try {
    const apiUrl = `https://${BASE_URL}/api/staffs/avatar`;
    const token = await getToken();

    // Create a FormData object to send the image
    const formData = new FormData();
    formData.append('image',{
      // @ts-ignore
      uri: image.path,
      type: image.mime,
      name: image.path.split('/').pop()
    });
    // Make the PUT request
    const {data} = await axios.put<IRegisterAccount>(apiUrl, formData,{
      headers: {
        "accept": "text/plain",
        'Content-Type': 'multipart/form-data',
        "Authorization": token || ""
      }
    }   );
    if(data){
      console.log('avatar',data)
      const account= getAccount()
      setAccount({
        ...account,
        avatar:data.avatar
      })
    }
    // Handle the response here
  } catch (error) {
    console.error('Error uploading image:', error);
    // Handle errors here
  }
};
