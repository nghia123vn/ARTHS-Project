import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator, DrawerContentComponentProps } from "@react-navigation/drawer";
import React, { memo, PropsWithChildren, Suspense, useCallback, useState } from "react";
import { Platform, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { MyBottomTabBar } from "@/components/MyBottomTabBar";
import { bottomTabBarRef, navigationRef } from "@/utils/navigation";
import { BottomTabBar } from "@/components/BottomTabBar";
import { LoginScreen } from "@/screens/LoginScreen";
import { RegisterScreen } from "@/screens/RegisterScreen";
import { ConfirmScreen } from "@/screens/ConfirmScreen";
import { PreloadScreen } from "@/screens/PreloadScreen";
import { NotificationScreen } from "@/screens/NotificationScreen";
import SearchScreen from "@/screens/SearchScreen";
import { DetailProductScreen } from "@/screens/DetailProductScreen";
import { CategoriesScreen } from "@/screens/CategoriesScreen";
import { CartScreen } from "@/screens/CartScreen";
import { PaymentScreen } from "@/screens/PaymentScreen";
import { VnPayScreen } from "@/screens/VnPayScreen";
import { ServicesScreen } from "@/screens/ServicesScreen";
import { DetailServicesScreen } from "@/screens/DetailServiceScreen";
import { OrderScreen } from "@/screens/OrderScreen";
import { PaymentStatus } from "@/screens/VnPayScreen/PaymentStatus";
import { CreateBookingScreen } from "@/screens/BookingScreen/CreateBookingScreen";
import { ConfirmBookingScreen } from "@/screens/BookingScreen/ConfirmBookingScreen";
import { DetailBookingScreen } from "@/screens/BookingScreen/DetailBookingScreen";
import { DetailOrderScreen } from "@/screens/OrderScreen/DetailOrderScreen";
import { DetailProductReview } from "@/screens/DetailProductReview";
import { EditAccountScreen } from "@/screens/ProfileScreen/EditAccountScreen";
import { DetailDiscountScreen } from "@/screens/DetailDiscountScreen";
import { ChangeAddressScreen } from "@/screens/PaymentScreen/ChangeAddressScreen";
import { EditAddressScreen } from "@/screens/PaymentScreen/EditAddressScreen";
import { DetailAccountScreen } from "@/screens/ProfileScreen/DetailAccountScreen";
import { FeedbackBookingScreen } from "@/screens/BookingScreen/FeedbackBookingScreen";
import { ShowCategoriesScreen } from "@/screens/ShowCategoriesScreen";
import { CreateFeedbackScreen } from "@/screens/CreateFeedbackScreen";

export const RootStack = createNativeStackNavigator();
export const MiniRootStack = createNativeStackNavigator();
export const ModalStack = createNativeStackNavigator();
export const MainStack = createNativeStackNavigator();
export const TabBarStack = createBottomTabNavigator();
export const DrawerStack = createDrawerNavigator();

interface TabBarProps extends PropsWithChildren {
  initialRouteName?: string;
  centerElement?: JSX.Element;
}

export const TabBarStackComponent = memo(function(props: TabBarProps) {
  return (
    <FullScreenWrapper>
      <TabBarStack.Navigator
        initialRouteName={props.initialRouteName}
        screenOptions={{
          headerShown: false,
          tabBarHideOnKeyboard: true
        }}
        tabBar={(p) => (
          <MyBottomTabBar
            ref={bottomTabBarRef}
            {...p}
            centerElement={props.centerElement}
          />
        )}
      >
        {props.children}
      </TabBarStack.Navigator>
    </FullScreenWrapper>
  );
});

interface DrawProps extends PropsWithChildren {
  drawerContent: (props: DrawerContentComponentProps) => JSX.Element;
  initialRouteName?: string;
}

export const DrawStackComponent = memo(function(props: DrawProps) {
  return (
    <DrawerStack.Navigator
      initialRouteName={"Main" || props.initialRouteName}
      screenOptions={{ drawerType: "front", headerShown: false }}
      drawerContent={props.drawerContent}
    >
      {props.children}
    </DrawerStack.Navigator>
  );
});

interface MainProps extends PropsWithChildren {
  initialRouteName?: string;
}

export const MainStackComponent = memo(function(props: MainProps) {
  return (
    <MainStack.Navigator
      initialRouteName={"Main" || props.initialRouteName}
      screenOptions={{
        headerShown: false,
        animation:
          Platform.OS == "ios" ? "slide_from_left" : "fade_from_bottom"
      }}
    >
      {props.children}
    </MainStack.Navigator>
  );
});

export const MiniRootStackComponent = memo(function(props: MainProps) {
  return (
    <MiniRootStack.Navigator
      initialRouteName={"Main" || props.initialRouteName}
      screenOptions={{
        headerShown: false,
        animation:
          Platform.OS == "ios" ? "slide_from_left" : "fade_from_bottom"
      }}
    >
      {props.children}
    </MiniRootStack.Navigator>
  );
});

interface ModalProps extends PropsWithChildren {
  initialRouteName?: string;
}

export const ModalStackComponent = memo(function(props: ModalProps) {
  return (
    <ModalStack.Navigator
      initialRouteName={"Main" || props.initialRouteName}
      screenOptions={{
        // presentation: 'containedModal',
        headerShown: false,
        animation:
          Platform.OS == "ios" ? "slide_from_bottom" : "fade_from_bottom"
      }}
    >
      {props.children}
    </ModalStack.Navigator>
  );
});

interface RoutesProps extends PropsWithChildren {
  initialRouteName?: string;
}

export const RootStackComponent = memo(function Routes(props: RoutesProps) {
  const routeNameRef = React.useRef<string>("");
  const onStateChange = useCallback(() => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

    if (currentRouteName && previousRouteName !== currentRouteName) {
      routeNameRef.current = currentRouteName;
    }
  }, []);

  const [initialState, setInitialState] = useState();

  return (
    <NavigationContainer
      ref={navigationRef}
      initialState={initialState}
      onStateChange={onStateChange}
    >
        <RootStack.Navigator
          initialRouteName={props.initialRouteName}
          screenOptions={{ headerShown: false }}
        >
          {props.children}
        </RootStack.Navigator>
    </NavigationContainer>
  );
});

const Tab = memo(() => {
  return <BottomTabBar />;
});
const Main = memo(() => {
  return (
    <MainStackComponent>
      <MainStack.Screen name={"Main"} component={Tab} />
      <MainStack.Screen name={"NotificationScreen"} component={NotificationScreen} />
      <MainStack.Screen name={"CategoriesScreen"} component={CategoriesScreen} />
      <MainStack.Screen name={"DetailProductScreen"} component={DetailProductScreen} />
      <MainStack.Screen name={"CartScreen"} component={CartScreen} />
      <MainStack.Screen name={"PaymentScreen"} component={PaymentScreen} />
      <MainStack.Screen name={"ServicesScreen"} component={ServicesScreen} />
      <MainStack.Screen name={"DetailServicesScreen"} component={DetailServicesScreen} />
      <MainStack.Screen name={"OrderScreen"} component={OrderScreen} />
      <MainStack.Screen name={"PaymentStatus"} component={PaymentStatus} />
      <MainStack.Screen name={"VnPayScreen"} component={VnPayScreen} />
      <MainStack.Screen name={"CreateBookingScreen"} component={CreateBookingScreen} />
      <MainStack.Screen name={"ConfirmBookingScreen"} component={ConfirmBookingScreen} />
      <MainStack.Screen name={"DetailBookingScreen"} component={DetailBookingScreen} />
      <MainStack.Screen name={"DetailOrderScreen"} component={DetailOrderScreen} />
      <MainStack.Screen name={"DetailProductReview"} component={DetailProductReview} />
      <MainStack.Screen name={"EditAccountScreen"} component={EditAccountScreen} />
      <MainStack.Screen name={"DetailDiscountScreen"} component={DetailDiscountScreen} />
      <MainStack.Screen name={"ChangeAddressScreen"} component={ChangeAddressScreen} />
      <MainStack.Screen name={"EditAddressScreen"} component={EditAddressScreen} />
      <MainStack.Screen name={"DetailAccountScreen"} component={DetailAccountScreen} />
      <MainStack.Screen name={"FeedbackBookingScreen"} component={FeedbackBookingScreen} />
      <MainStack.Screen name={"ShowCategoriesScreen"} component={ShowCategoriesScreen} />
      <MainStack.Screen name={"CreateFeedbackScreen"} component={CreateFeedbackScreen} />
      <MainStack.Screen
        name={'SearchScreen'}
        component={SearchScreen}
        options={{
          animation: 'fade_from_bottom',
        }}
      />

    </MainStackComponent>
  );
});


export const Routes = memo(() => {
  return (
    <RootStackComponent initialRouteName={"PreloadScreen"}>
      <RootStack.Screen
        name={"LoginScreen"}
        component={LoginScreen}
      />
      <RootStack.Screen
        name={"RegisterScreen"}
        component={RegisterScreen}
      />
      <RootStack.Screen
        name={"ConfirmScreen"}
        component={ConfirmScreen}
      />
      <RootStack.Screen
        name={"PreloadScreen"}
        component={PreloadScreen}
      />
      <RootStack.Screen name={"Main"} component={Main} />
    </RootStackComponent>
  );
});
