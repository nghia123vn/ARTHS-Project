import React, { useCallback, useMemo } from "react";
import { memoForwardRef } from "@/utils/functions";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { IC_CLOSE } from "@/assets";
import { FlexSpaceBetween } from "@/helper/styles";
import { IUpdateOrderParams, requestCancelOrder } from "@/store/order/function";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { navigateToOrderScreen } from "@/utils/navigation";
import { EOrderStatus } from "@/store/order/type";
import { LoadingModal } from "@/components/LoadingModal";
import useAutoToastError from "@/hooks/useAutoToastError";

interface CancelBottomSheetProps {
  orderId: string;
}

const listReason = [
  "Đặt nhầm sản phẩm",
  "Tôi muốn thêm sản phẩm",
  "Tôi muốn thay đổi sản phẩm",
  "Tôi muốn thay đổi hình thức thanh toán",
  "Tôi tìm thấy sản phẩm khác tốt hơn",
  "Tôi không còn nhu cầu mua",
  "Tôi không tìm thấy lý do phù hợp"
];

export const CancelOrderBottomSheet = memoForwardRef(function CancelOrderBottomSheet(props: CancelBottomSheetProps, ref: React.RefObject<BottomSheetModal>) {
  // variables
  const { orderId } = props;
  const snapPoints = useMemo(() => ["70%"], []);
  const [selectedReason, setSelectedReason] = React.useState<string>(listReason[0]);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        onPress={() => {
          ref.current?.dismiss();
        }}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        isCustomAnimatedIndex={props.hasFlashList}
        {...props.backDropProps}
      />
    ),
    []
  );

  const [{ loading, error: firstError }, onSubmit] = useAsyncFn(
    async (params:IUpdateOrderParams,id:string) => {
      await requestCancelOrder(params,id);
      navigateToOrderScreen({
        defaultStatus:EOrderStatus.PENDING
      })
    },
    [orderId]
  );
  useAutoToastError(firstError)

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      keyboardBlurBehavior={"restore"}
      android_keyboardInputMode={"adjustPan"}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.contentContainer}>
        <SRowSection>
          <STitle>Lý do hủy</STitle>
          <SIcon source={IC_CLOSE} />
        </SRowSection>
        {
          listReason.map((item, index) => {
            return (
              <SItemWrapper>
                <STextNormal>{item}</STextNormal>
                <SCheckBoxWrapper onPress={()=>{
                  setSelectedReason(item)
                }}>
                  {selectedReason === item ? <SChecked/> : null}
                </SCheckBoxWrapper>
              </SItemWrapper>
            );
          })
        }
        <SActionButton onPress={()=>{
          onSubmit({
            status: EOrderStatus.CANCEL,
            cancellationReason: selectedReason
          },orderId).then()
        }}>
       <STextNormal style={{
            color: 'white'
          }}>Gửi</STextNormal>
        </SActionButton>
      </View>
      <LoadingModal isVisible={loading} />
    </BottomSheetModal>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey"

  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24
  }
});
const STitle = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 16px;
  font-weight: 700;
  line-height: 24px; /* 150% */
`;
const SIcon = styled.Image`
  width: 24px;
  height: 24px;
`;
const SRowSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom-width: 1px;
  border-bottom-color: #E5E5E5;
  width: 100%;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 14px;
`;
const SCheckBoxWrapper = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  border: 2px solid  #E2E8F0;
`;
const SChecked = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 6px solid #BD3505;
  background: #FFF;
`;
const SItemWrapper = styled(FlexSpaceBetween)`
  border-bottom-width: 1px;
  border-bottom-color: #E5E5E5;
  padding:12px 0;
`;
const SActionButton = styled.TouchableOpacity`
  border-radius: 4px;
  background: #BD3505;
  width: 100%;
  padding: 12px 0;
  align-items: center;
  justify-content: center;
`;
