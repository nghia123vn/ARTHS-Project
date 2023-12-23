import { memo, useCallback, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { navigateToLoginScreen, replaceToMain } from "@/utils/navigation";
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
    <ActivityIndicator />
  );
});
