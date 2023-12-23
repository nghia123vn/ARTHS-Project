import AsyncStorage from "@react-native-async-storage/async-storage";
export const saveToken = async (token:string) => {
  try {
    await AsyncStorage.setItem('accessToken', token);
  } catch (error) {
    console.error('Could not save token', error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem('accessToken');
  } catch (error) {
    console.error('Could not fetch token', error);
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem('accessToken');
  } catch (error) {
    console.error('Could not remove token', error);
  }
};
