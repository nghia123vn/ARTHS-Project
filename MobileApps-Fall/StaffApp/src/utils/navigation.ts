import { StackActions } from "@react-navigation/native";
import React, { createRef } from "react";
import { MyBottomTabBar } from "@/components/MyBottomTabBar";

import { ConfirmScreenParams } from "@/screens/ConfirmScreen";
import {DetailServiceScreenParams} from "@/screens/DetailServiceScreen";
import { BookingScreen } from "@/screens/BookingScreen";
import { DetailBookingScreenParams } from "@/screens/DetailBookingScreen";
import { DetailAccountScreen } from "@/screens/ProfileScreen/DetailAccountScreen";

export const navigationRef = React.createRef<any>();

export const navigation = () => navigationRef.current!;

export const createReplace =
  <T extends object>(screenName: string) =>
  (params?: T) => {
    return navigation().dispatch(StackActions.replace(screenName, params));
  };

export const createNavigate =
  <T extends object>(screenName: string) =>
  (params?: T) =>
    navigation().navigate(screenName, params);

export const createPush =
  <T extends object>(screenName: string) =>
  (params?: T) =>
    navigation().dispatch(StackActions.push(screenName, params));

export const goBack = () => navigation().goBack();

export const resetPreload = () =>
  navigation().reset({
    index: 0,
    routes: [{ name: "PreloadScreen" }],
  });

// export const navigateToPreloadScreen = createNavigate("PreloadScreen")

export const replaceToMain = createReplace("Main");
export const navigateToMain = createNavigate("Main")
export const navigateToNotificationScreen = createNavigate("NotificationScreen")

export const navigateToPreloadScreen = createNavigate('PreloadScreen');


export const openSearchScreen = createNavigate('SearchScreen');
export const navigateToLoginScreen = createNavigate('LoginScreen');
export const navigateToAlertScreen = createNavigate('AlertScreen');
export const navigateToRegisterScreen = createNavigate('RegisterScreen')
export const navigateToConfirmScreen = createNavigate<ConfirmScreenParams>('ConfirmScreen')

export const navigateToCategoriesScreen = createNavigate('CategoriesScreen')
export const navigateToCartScreen = createNavigate('CartScreen')


export const navigateToBookingScreen = createNavigate('BookingScreen')

export const navigateToServicesScreen = createNavigate('ServicesScreen')
export const navigateToDetailAccountScreen = createNavigate('DetailAccountScreen')

export const navigateToCreateBookingScreen = createNavigate('CreateBookingScreen')
export const navigateToDetailServiceScreen = createNavigate<DetailServiceScreenParams>('DetailServiceScreen')
export const navigateToDetailBookingScreen = createNavigate<DetailBookingScreenParams>('DetailBookingScreen')

/*---------------Bottom tab bar-----------------*/
export const bottomTabBarRef = createRef<MyBottomTabBar>();

export const bottomNavigation = () => bottomTabBarRef.current;
