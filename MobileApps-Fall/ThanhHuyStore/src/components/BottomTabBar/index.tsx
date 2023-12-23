import React, { memo } from "react";

import styled from "styled-components/native";
import { IC_CALENDAR, IC_HOME, IC_PLATFORM, IC_PROFILE } from "@/assets";
import { TabBarStack, TabBarStackComponent } from "@/Routes";
import { HomeScreen } from "@/screens/HomeScreen";
import { CalendarScreen } from "@/screens/CalendarScreen";
import { CategoriesScreen } from "@/screens/CategoriesScreen";
import { ProfileScreen } from "@/screens/ProfileScreen";
import { Colors } from "@/theme";
import { BookingScreen } from "@/screens/BookingScreen";


const TabIcon = styled.Image<{ active: boolean }>`
  width: 24px;
  height: 24px;
  tint-color: ${p => (p.active ? Colors.primary : "#666666")};
`;
const HomeIcon = memo(({ focused }: { focused: boolean }) => {
  return (
    <TabIcon
      source={IC_HOME}
      active={focused}
    />
  );
});
const CalendarIcon = memo(({ focused }: { focused: boolean }) => {
  return (
    <TabIcon
      source={IC_CALENDAR}
      active={focused}
    />
  );
});

const CategoryIcon = memo(({ focused }: { focused: boolean }) => {
  return (
    <TabIcon
      source={IC_PLATFORM}
      active={focused}
    />
  );
});


const ProfileIcon = memo(({ focused }: { focused: boolean }) => {
  return (
    <TabIcon
      source={IC_PROFILE}
      active={focused}
    />
  );
});


export const BottomTabBar = memo(function() {
  return (
    <TabBarStackComponent>
      <TabBarStack.Screen
        name={"HomeScreen"}
        component={HomeScreen}
        options={{
          title: "Trang Chủ",
          tabBarIcon: ({ focused }) => <HomeIcon focused={focused} />
        }}
      />
      <TabBarStack.Screen
        name={"CalendarScreen"}
        component={BookingScreen}
        options={{
          title: "Đặt lịch",
          tabBarIcon: ({ focused }) => <CalendarIcon focused={focused} />
        }}
      />
      <TabBarStack.Screen
        name={"CategoriesScreen"}
        component={CategoriesScreen}
        options={{
          title: "Danh mục",
          tabBarIcon: ({ focused }) => <CategoryIcon focused={focused} />
        }}
      />
      <TabBarStack.Screen
        name={"ProfileScreen"}
        component={ProfileScreen}
        options={{
          title: "Tài khoản",
          tabBarIcon: ({ focused }) => <ProfileIcon focused={focused} />
        }}
      />
    </TabBarStackComponent>
  );
});
