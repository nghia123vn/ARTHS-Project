import { StackActions } from "@react-navigation/native";
import React, { createRef } from "react";
import { MyBottomTabBar } from "@/components/MyBottomTabBar";
import { DetailCurrencyParams } from "@/screens/DetailCurrency";
import { DetailExchangeParams } from "@/screens/DetailExchange";
import { DetailProductScreenParams } from "@/screens/DetailProductScreen";
import { VnPayScreenParams } from "@/screens/VnPayScreen";
import { DetailServicesScreen, DetailServicesScreenParams } from "@/screens/DetailServiceScreen";
import { PaymentStatusParams } from "@/screens/VnPayScreen/PaymentStatus";
import { ConfirmBookingScreenParams } from "@/screens/BookingScreen/ConfirmBookingScreen";
import { DetailBookingScreenParams } from "@/screens/BookingScreen/DetailBookingScreen";
import { DetailOrderScreenParams } from "@/screens/OrderScreen/DetailOrderScreen";
import { ConfirmScreenParams } from "@/screens/ConfirmScreen";
import { DetailProductReview, FeedbackScreenParams } from "@/screens/DetailProductReview";
import { PaymentScreenParams } from "@/screens/PaymentScreen";
import { ChangeAddressScreen, ChangeAddressScreenParams } from "@/screens/PaymentScreen/ChangeAddressScreen";
import { EditAddressScreenParams } from "@/screens/PaymentScreen/EditAddressScreen";
import { FeedbackBookingScreen, FeedbackBookingScreenParams } from "@/screens/BookingScreen/FeedbackBookingScreen";
import { CategoriesScreenParams, ShowCategoriesScreen } from "@/screens/ShowCategoriesScreen";
import { CreateFeedbackScreen, CreateFeedbackScreenParams } from "@/screens/CreateFeedbackScreen";
import { OrderScreenParasm } from "@/screens/OrderScreen";

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
    routes: [{ name: "PreloadScreen" }]
  });

// export const navigateToPreloadScreen = createNavigate("PreloadScreen")

export const replaceToMain = createReplace("Main");
export const navigateToMain = createNavigate("Main");
export const navigateToNotificationScreen = createNavigate("NotificationScreen");

export const navigateToPreloadScreen = createNavigate("PreloadScreen");

export const navigateToDetailCurrencyScreen = createNavigate<DetailCurrencyParams>("DetailCurrencyScreen");
export const navigateToDetailExchangeScreen = createNavigate<DetailExchangeParams>("DetailExchangeScreen");
export const openSearchScreen = createNavigate("SearchScreen");
export const navigateToDetailProductScreen = createNavigate<DetailProductScreenParams>("DetailProductScreen");
export const navigateToPriceAlertScreen = createNavigate("PriceAlertScreen");
export const navigateToSearchPriceAlertScreen = createNavigate("SearchPriceAlertScreen");
export const navigateToLoginScreen = createNavigate("LoginScreen");
export const replaceToLoginScreen = createReplace("LoginScreen");

export const navigateToAlertScreen = createNavigate("AlertScreen");
export const navigateToRegisterScreen = createNavigate("RegisterScreen");
export const navigateToConfirmScreen = createNavigate<ConfirmScreenParams>("ConfirmScreen");

export const navigateToCategoriesScreen = createNavigate("CategoriesScreen");
export const navigateToDetailAccountScreen = createNavigate("DetailAccountScreen");
export const navigateToCartScreen = createNavigate("CartScreen");

export const navigateToDetailProductReview = createNavigate<FeedbackScreenParams>("DetailProductReview");

export const navigateToPaymentScreen = createNavigate<PaymentScreenParams>("PaymentScreen");
export const navigateToVnPayScreen = createNavigate<VnPayScreenParams>("VnPayScreen");

export const navigateToServicesScreen = createNavigate("ServicesScreen");
export const navigateToShowCategoriesScreen = createNavigate<CategoriesScreenParams>("ShowCategoriesScreen");

export const navigateToCreateBookingScreen = createNavigate("CreateBookingScreen");
export const navigateToConfirmBookingScreen = createNavigate<ConfirmBookingScreenParams>("ConfirmBookingScreen");
export const navigateToDetailBookingScreen = createNavigate<DetailBookingScreenParams>("DetailBookingScreen");

export const navigateToDetailOrderScreen = createNavigate<DetailOrderScreenParams>("DetailOrderScreen");
export const navigateToPaymentStatus = createNavigate<PaymentStatusParams>("PaymentStatus");
export const navigateToDetailServicesScreen = createNavigate<DetailServicesScreenParams>("DetailServicesScreen");

export const navigateToCalendarScreen = createNavigate("CalendarScreen");
export const navigateToOrderScreen = createNavigate<OrderScreenParasm>("OrderScreen");
export const navigateToFeedbackBookingScreen = createNavigate<FeedbackBookingScreenParams>("FeedbackBookingScreen");
export const navigateToEditAccountScreen = createNavigate("EditAccountScreen");
export const navigateToDiscountDetailScreen = createNavigate("DetailDiscountScreen");
export const navigateToCreateFeedbackScreen = createNavigate<CreateFeedbackScreenParams>("CreateFeedbackScreen");
export const navigateToChangeAddressScreen = createNavigate<ChangeAddressScreenParams>("ChangeAddressScreen");
export const navigateToEditAddressScreen = createNavigate<EditAddressScreenParams>("EditAddressScreen");
/*---------------Bottom tab bar-----------------*/
export const bottomTabBarRef = createRef<MyBottomTabBar>();

export const bottomNavigation = () => bottomTabBarRef.current;
