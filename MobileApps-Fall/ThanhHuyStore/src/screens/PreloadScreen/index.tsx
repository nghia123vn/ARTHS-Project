import { memo, useCallback, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { requestListProducts } from "@/store/product/function";
import { navigateToLoginScreen, replaceToMain } from "@/utils/navigation";
import { requestAllCategories } from "@/store/category/function";
import { requestRefreshToken } from "@/zustand/account/function";

export const PreloadScreen = memo(function PreloadScreen() {

  const autoLogin = useCallback(async ()=>{
    const accessToken = await requestRefreshToken()
    if(accessToken){
      replaceToMain();
    }
    else {
      navigateToLoginScreen();
    }
  },[])

 useEffect(() => {
    autoLogin().then();
  }, []);
  return (
    <View style={{
      flex:1,
      display:'flex',
      justifyContent:'center',
      alignItems:'center'
    }}>
      <ActivityIndicator />
    </View>
  );
});
