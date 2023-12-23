import React, { memo, useCallback } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { ActivityIndicator, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import { useNavigationParams } from "@/hooks";
import { goBack, navigateToCartScreen, navigateToOrderScreen, navigateToPaymentStatus } from "@/utils/navigation";

export interface VnPayScreenParams {
  url: string;
}
export const VnPayScreen = memo(function VnPayScreen() {
  const {url} = useNavigationParams<VnPayScreenParams>()
  // Render loading indicator while the WebView is loading
  const renderLoadingView = () => {
    return (
      <ActivityIndicator
        color="#009b88"
        size="large"
        style={styles.activityIndicatorStyle}
      />
    );
  };
  const handleResponse = useCallback((data:any)=>{
    if(data.url){
      if (data.url.includes('vnp_ResponseCode=00')) {
        navigateToPaymentStatus({status:'success'})
      } else if (data.url.includes('vnp_ResponseCode=24')) {
        navigateToPaymentStatus({
          status:'fail'
        })
      }
    }
  },[])
  return (
    <FullScreenWrapper>
      <WebView
        source={{ uri: url }}
        style={styles.webview}
        startInLoadingState={true}  // Show a loading indicator while content is loading
        renderLoading={renderLoadingView}  // Function to render the loading indicator
        onNavigationStateChange={handleResponse}
      />
    </FullScreenWrapper>
  )
})
const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  activityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
