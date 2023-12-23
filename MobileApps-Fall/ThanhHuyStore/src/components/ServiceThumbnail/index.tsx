import { memo, useCallback, useMemo } from "react";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { navigateToDetailServicesScreen } from "@/utils/navigation";
import { useService } from "@/store/service";
import { formatCurrency } from "@/utils/format";
import { IC_DISCOUNT_WRAPPER } from "@/assets";

interface ServiceThumbnailProps {
  id: number | string;
}

export const ServiceThumbnail = memo(function ServiceThumbnail(props: ServiceThumbnailProps) {
  const { id } = props;
  const data = useService(id);

  const onGoToDetail = useCallback(() => {
    navigateToDetailServicesScreen({
      id
    });
  }, [id]);
  const discountPrice = useMemo(() => {
    if (data?.price && data?.discountAmount) return (100 - data.discountAmount) * data.price / 100;
    else return data?.price || 0;
  }, [data]);
  return (
    <SContainer onPress={onGoToDetail}>
      {data && data?.discountAmount > 0 ? <SImageWrapper source={IC_DISCOUNT_WRAPPER}>
        <STextNormal style={{
          color: "white",
          fontWeight: "bold"
        }}>{`-${data.discountAmount}%`}</STextNormal>
      </SImageWrapper> : null}
      <SImageThumbnail source={{ uri: data?.images[0].imageUrl }} resizeMode={"center"} />
      <STitle>{data?.name}</STitle>
      {data?.discountAmount ? <SDiscount>{formatCurrency(data?.price || 0)}</SDiscount> : null}
      <SPrice>{formatCurrency(discountPrice)}</SPrice>
    </SContainer>
  );
});
const SContainer = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  border-radius: 12px;
  padding: 15px 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  background-color: white;
  border: 1px solid #EBEBEB;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.075);

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
const SImage = styled.Image`
  width: 12px;
  height: 12px;
  tint-color: yellow;
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
