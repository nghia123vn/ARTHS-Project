import React, { memo, useEffect, useMemo, useRef } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { CustomHeader } from "@/components/CustomHeader";
import styled from "styled-components/native";
import { useNavigationParams } from "@/hooks";
import { Fonts } from "@/theme/Fonts";
import { ActivityIndicator, Dimensions, View } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { AnimatedBottomSpace } from "@/components/AnimatedBottomSpace";
import { useService } from "@/store/service";
import { requestService } from "@/store/service/function";
import RenderHtml from "react-native-render-html";
import { formatCurrency } from "@/utils/format";
import { Pagination } from "@/components/Pagination";
import { useSharedValue } from "react-native-reanimated";
import useAutoToastError from "@/hooks/useAutoToastError";

const PAGE_WIDTH = Dimensions.get("window").width;
const {width: DWidth} = Dimensions.get('screen');

export interface DetailServicesScreenParams {
  id: number | string;
}

export const DetailServicesScreen = memo(function DetailServicesScreen() {
  const { id } = useNavigationParams<DetailServicesScreenParams>();
  const ref = useRef<ICarouselInstance>(null);
  const progressValue = useSharedValue<number>(0);

  const data = useService(id);
  const discountPrice = useMemo(() => {
    if (data?.price && data?.discountAmount) return (100 - data.discountAmount) * data.price / 100;
    else return data?.price || 0;
  }, [data]);

  const [{ loading: firstLoading, error: firstError }, loadFirst] = useAsyncFn(
    () => requestService({ id }),
    [id]
  );
  useAutoToastError(firstError)


  useEffect(() => {
    loadFirst().then();
  }, []);
  const baseOptions =
    ({
      vertical: false,
      width: PAGE_WIDTH,
      height: PAGE_WIDTH / 2
    } as const);
  return (
    <FullScreenWrapper>
      <CustomHeader isBack title={"Chi tiết sản phẩm"} />
      {firstLoading ? <ActivityIndicator size="large" /> :
        <SContainer>
          <Carousel
            {...baseOptions}
            loop
            ref={ref}
            testID={"xxx"}
            style={{ width: "100%" }}
            autoPlayInterval={5000}
            onProgressChange={(_, absoluteProgress) =>
              (progressValue.value = absoluteProgress * DWidth)
            }
            data={data?.images || []}
            pagingEnabled
            renderItem={({ index }) => <SImageWrapper key={index}>
              <SImageThumbnail source={{ uri: data?.images[index].imageUrl || "" }} resizeMode={"contain"} />
            </SImageWrapper>}
          />
          <Pagination
            animatedOffset={progressValue}
            width={DWidth - 16 * 2}
            numberOfItems={data?.images.length}
          />
          <SInfoWrapper>
            <STitle>{data?.name}</STitle>
            <STextDiscount>{formatCurrency(data?.price || 0)}</STextDiscount>
            <STextPrice>{formatCurrency(discountPrice)}</STextPrice>
          </SInfoWrapper>
          <STextBold style={{
            marginTop: 12
          }}>Mô Tả Dịch vụ:</STextBold>
          <RenderHtml source={{ html: data?.description || "" }}/>
          {/*<FeedbackSection feedbackProducts={data?.feedbackProducts || []} averageRating={averageRating}/>*/}
          <View style={{
            height: 120
          }} />
        </SContainer>}
      {/*<SAbsoluteView>*/}
      {/*  <SBtnAddToCart onPress={() => {*/}
      {/*    sheetRef.current?.present();*/}
      {/*  }}>*/}
      {/*    <STextNormal style={{ color: "#FFF" }}>Thêm vào giỏ hàng</STextNormal>*/}
      {/*  </SBtnAddToCart>*/}
      {/*  <SBuyNow>*/}
      {/*    <STextNormal style={{ color: "#FFF" }}>Mua ngay</STextNormal>*/}
      {/*  </SBuyNow>*/}
      {/*</SAbsoluteView>*/}
      {/*<CartBottomSheet ref={sheetRef} totalPrice={data?.priceCurrent || 0} productId={data?.id || ""} />*/}
      <AnimatedBottomSpace />
    </FullScreenWrapper>
  );
});
const SContainer = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;
const SImageWrapper = styled.View`
  padding: 12px;
  align-items: center;
  border-radius: 10px;
  background-color: #FAFAFA;
`;
const SImageThumbnail = styled.Image`
  width: 100%;
  height: 200px;
`;
const SInfoWrapper = styled.View`
  gap: 8px;
  border-bottom-width: 1px;
  padding: 12px 0;
  border-bottom-color: #E5E5E5;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 14px;
`;
const STitle = styled(STextNormal)`
  font-size: 24px;
  font-family: ${Fonts.Bold};
  line-height: 32px; /* 133.333% */
  font-weight: 700;
`;
const STextDiscount = styled(STextNormal)`
  color: #888;
  text-decoration: line-through;
`;
const STextPrice = styled(STextNormal)`
  color: #FE3A30;
  font-size: 16px;
  font-family: ${Fonts.Medium};
`;
const STextBold = styled(STextNormal)`
  font-size: 16px;
  font-family: ${Fonts.Bold};
  font-weight: 700;
`;

const SIcon = styled.Image`
  width: 12px;
  height: 12px;
  tint-color: yellow;
`;
const SVehicleBox = styled.View`
  border-radius: 4px;
  border: 1px solid #0C1A30;
  background-color: #FFF;
  padding: 4px;
`;
const SAbsoluteView = styled.View`
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  gap: 12px;
`;
const SBtnAddToCart = styled.TouchableOpacity`
  padding: 15px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #000;
  flex: 1;
`;
const SBuyNow = styled(SBtnAddToCart)`
  background-color: #BD3505;
`;
