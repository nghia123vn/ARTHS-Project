import React, { memo, useMemo } from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { SERVICE_CATEGORY, useCategory } from "@/store/category";
import { IC_ACCESSORIES, IC_BIKE_OIL, IC_BIKE_SERVICE, IC_BIKE_TIRES, IC_MOTORBIKE } from "@/assets";
import { navigateToServicesScreen } from "@/utils/navigation";
import { ECategory } from "@/store/category/type";

export const getConfigCategory = (name: string) => {
  switch (name) {
    case "đồ chơi xe máy":
      return {
        color: "#E4F3EA",
        image: IC_MOTORBIKE
      };
    case "phụ kiện thay thế":
      return {
        color: "#FFECE8",
        image: IC_ACCESSORIES
      };
    case "vỏ xe máy":
      return {
        color: "rgba(255, 246, 228, 1)",
        image: IC_BIKE_TIRES
      };
    case "dầu nhớt":
      return {
        color: "#F1EDFC",
        image: IC_BIKE_OIL
      };
    case "Dịch vụ":
      return {
        color: "#E4F3EA",
        image: IC_BIKE_SERVICE
      };
    default:
      return {
        color: "#E4F3EA",
        image: IC_MOTORBIKE
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
        } else onPress?.();
      }}
      style={{
        flex: 1,
        alignItems: "center",
        gap: 4
      }}>
      <SContainer background={config.color}>
        <SImage source={config.image} />
      </SContainer>
      <SText>{id}</SText>
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
`;
const SImage = styled.Image`
  width: 24px;
  height: 24px;
`;
const SText = styled.Text`
  text-align: center;
`;
