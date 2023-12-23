import { memo, useCallback, useMemo } from "react";
import styled from "styled-components/native";
import { IC_STAR_FILLED } from "@/assets";
import { Fonts } from "@/theme/Fonts";
import { FlexCenter } from "@/helper/styles";
import { useProduct } from "@/store/product";
import { navigateToDetailProductScreen } from "@/utils/navigation";
import { View } from "react-native";

interface ProductThumbnailProps {
  id: number | string;
}

export const MiniProductThumbnail = memo(function MiniProductThumbnail(props: ProductThumbnailProps) {
  const { id } = props;
  const data = useProduct(id);
  const onGoToDetail = useCallback(() => {
    navigateToDetailProductScreen({
      id
    });
  }, [id]);
  return (
    <SContainer onPress={onGoToDetail}>
      <View style={{
        alignItems: "center",
        justifyContent: "center",
        width: '100%',
      }}>
        <SImageThumbnail source={{ uri: data?.images[0].imageUrl }} resizeMode={"center"} />
      </View>
      <STitle numberOfLines={2}>{data?.name}</STitle>
    </SContainer>
  );
});
const SContainer = styled.TouchableOpacity`
  display: flex;
  flex: 1;
  border-radius: 12px;
  padding:4px 8px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  border: 1px solid #F1F1F1;
`;
const STitle = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Medium};
  font-size: 14px;
  letter-spacing: 0.2px;
`;

const SImageThumbnail = styled.Image`
  width: 100%;
  height: 100px;
`;
