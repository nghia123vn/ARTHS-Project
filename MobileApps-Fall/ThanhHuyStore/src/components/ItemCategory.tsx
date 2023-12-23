import React, { memo, useMemo } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { SERVICE_CATEGORY, useCategory } from "@/store/category";
import { IC_ACCESSORIES, IC_BIKE_OIL, IC_BIKE_SERVICE, IC_BIKE_TIRES, IC_MINI_SERVICE, IC_MOTORBIKE } from "@/assets";
import {
  navigateToCategoriesScreen,
  navigateToServicesScreen,
  navigateToShowCategoriesScreen
} from "@/utils/navigation";
import { ECategory } from "@/store/category/type";

export const getConfigCategory = (name: string) => {
  switch (name) {
    case "đồ chơi xe máy":
      return {
        color: "#E4F3EA",
        image: IC_MOTORBIKE,
        name:'Đồ chơi xe máy'
      };
    case "phụ kiện thay thế":
      return {
        color: "#FFECE8",
        image: IC_ACCESSORIES,
        name:'Phụ kiện thay thế'
      };
    case "vỏ xe máy":
      return {
        color: "rgba(255, 246, 228, 1)",
        image: IC_BIKE_TIRES,
        name:'Vỏ xe máy'
      };
    case "dầu nhớt":
      return {
        color: "#F1EDFC",
        image: IC_BIKE_OIL,
        name:'Dầu nhớt'
      };
    case "Dịch vụ":
      return {
        color: "#E4F3EA",
        image: IC_MINI_SERVICE,
        name:'Dịch vụ'
      };
    default:
      return {
        color: "#E4F3EA",
        image: IC_MINI_SERVICE,
        name:'Dịch vụ'
      };
  }
};

export const ItemCategory = memo(function ItemCategory({ id, onPress }: {
  id: string;
  onPress?: () => void;
}) {
  const config = useMemo(() => {
    return getConfigCategory(id);
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        if (id === 'service') {
          navigateToServicesScreen();
        } else onPress?.()
      }}
      style={{
        flex: 1,
        alignItems: "center",
        gap: 4
      }}>
      <SContainer background={config.color}>
        <SImage source={config.image} />
      </SContainer>
      <SText>{config.name}</SText>
    </TouchableOpacity>
  );
});
export const ItemCategoryHome = memo(function ItemCategory({ id, onPress }: {
  id: string;
  onPress?: () => void;
}) {
  const config = useMemo(() => {
    return getConfigCategory(id);
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        if (id === 'service') {
          navigateToServicesScreen();
        } else navigateToShowCategoriesScreen({
          category: id as ECategory
        })
      }}
      style={{
        flex: 1,
        alignItems: "center",
        gap: 4
      }}>
      <SContainer background={config.color}>
        <SImage source={config.image} />
      </SContainer>
      <SText>{config.name}</SText>
    </TouchableOpacity>
  );
});
const SContainer = styled.View<{
  background: string;
}>`
  border-radius: 10px;
  background-color: ${p => p.background ? p.background : "#fff"};
  align-items: center;
  justify-content: center;
  padding: 12px;
  border: 1px solid #C0C0C0;
`;
const SImage = styled.Image`
  width: 24px;
  height: 24px;
`;
const SText = styled.Text`
  text-align: center;
`;
