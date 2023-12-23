import { memo, useCallback } from "react";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { navigateToDetailServicesScreen } from "@/utils/navigation";
import { formatCurrency } from "@/utils/format";
import { Dimensions, View } from "react-native";
import { DiscountRepairService } from "@/store/discount/type";
import { IC_DISCOUNT_WRAPPER } from "@/assets";

interface MiniServiceThumbnailProps {
  service: DiscountRepairService;
}
const DWidth = Dimensions.get('screen').width;


export const MiniItemService = memo(function MiniItemProduct(props: MiniServiceThumbnailProps) {
  const { service } = props;

  const onGoToDetail = useCallback(() => {
    navigateToDetailServicesScreen({
      id: service.id
    });
  }, [service]);
  return (
    <SContainer onPress={onGoToDetail}>
      {service?.discountAmount > 0 ? <SImageWrapper source={IC_DISCOUNT_WRAPPER}>
        <STextNormal style={{
          color: "white",
          fontWeight: "bold"
        }}>{`-${service.discountAmount}%`}</STextNormal>
      </SImageWrapper> : null}
      <SImageThumbnail source={{ uri: service.image }} resizeMode={"center"} />
      <View style={{
        gap: 10,
        justifyContent: "space-between",
        flex: 1
      }}>
        <View>
          <STitle>{service?.name}</STitle>
          <SPrice>{`${formatCurrency(service.price || 0)}`}</SPrice>
        </View>
      </View>
    </SContainer>
  );
});
const SContainer = styled.TouchableOpacity`
  display: flex;
  border-radius: 10px;
  padding: 15px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  background-color: white;
  border: 1px solid #C0C0C0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  width: ${DWidth / 2 - 20}px;
  margin-top: 12px;
`;
const STitle = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Medium};
  font-size: 14px;
  letter-spacing: 0.2px;
`;
const SDiscount = styled.Text`
  color: #888;
  font-family: ${Fonts.Bold};
  font-size: 10px;
  letter-spacing: 0.2px;
  text-decoration-line: line-through;
`;
const SPrice = styled.Text`
  color: #FE3A30;
  font-family: ${Fonts.Bold};
  font-size: 12px;
  letter-spacing: 0.2px;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 10px;
  letter-spacing: 0.2px;
`;
const SImageThumbnail = styled.Image`
  width: 100%;
  height: 120px;
`;
const SImageWrapper = styled.ImageBackground`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 10;
  align-items: center;
  justify-content: center;
  width: 33px;
  height: 40px;
`;
