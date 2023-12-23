import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator, DrawerContentComponentProps} from "@react-navigation/drawer";
import React, {memo, PropsWithChildren, useCallback, useState} from "react";
import {Platform} from "react-native";
import {NavigationContainer} from "@react-navigation/native";
import {FullScreenWrapper} from "@/components/ScreenWrap";
import {MyBottomTabBar} from "@/components/MyBottomTabBar";
import {bottomTabBarRef, navigationRef} from "@/utils/navigation";
import {LoginScreen} from "@/screens/LoginScreen";
import {RegisterScreen} from "@/screens/RegisterScreen";
import {ConfirmScreen} from "@/screens/ConfirmScreen";
import {PreloadScreen} from "@/screens/PreloadScreen";
import {NotificationScreen} from "@/screens/NotificationScreen";
import {HomeScreen} from "@/screens/HomeScreen";
import {DetailServiceScreen} from "@/screens/DetailServiceScreen";
import Home from "react-native-sensitive-info/example/src/pages/Home";
import {ServicesScreen} from "@/screens/ServicesScreen";
import { BookingScreen } from "@/screens/BookingScreen";
import { DetailBookingScreen } from "@/screens/DetailBookingScreen";
import { DetailAccountScreen } from "@/screens/ProfileScreen/DetailAccountScreen";


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

export const TabBarStackComponent = memo(function (props: TabBarProps) {
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

export const DrawStackComponent = memo(function (props: DrawProps) {
    return (
        <DrawerStack.Navigator
            initialRouteName={"Main" || props.initialRouteName}
            screenOptions={{drawerType: "front", headerShown: false}}
            drawerContent={props.drawerContent}
        >
            {props.children}
        </DrawerStack.Navigator>
    );
});

interface MainProps extends PropsWithChildren {
    initialRouteName?: string;
}

export const MainStackComponent = memo(function (props: MainProps) {
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

export const MiniRootStackComponent = memo(function (props: MainProps) {
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

export const ModalStackComponent = memo(function (props: ModalProps) {
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
                screenOptions={{headerShown: false}}
            >
                {props.children}
            </RootStack.Navigator>
        </NavigationContainer>
    );
});

const Main = memo(() => {
    return (
        <MainStackComponent>
            <MainStack.Screen name={"Main"} component={HomeScreen}/>
            <MainStack.Screen name={"NotificationScreen"} component={NotificationScreen}/>
            <MainStack.Screen name={"DetailServiceScreen"} component={DetailServiceScreen}/>
            <MainStack.Screen name={"DetailBookingScreen"} component={DetailBookingScreen}/>
            <MainStack.Screen name={"ServicesScreen"} component={ServicesScreen}/>
            <MainStack.Screen name={"BookingScreen"} component={BookingScreen}/>
            <MainStack.Screen name={"DetailAccountScreen"} component={DetailAccountScreen}/>
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
            <RootStack.Screen name={"Main"} component={Main}/>
        </RootStackComponent>
    );
});
