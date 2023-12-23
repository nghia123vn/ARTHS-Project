import React, { useCallback, useMemo } from "react";
import { memoForwardRef } from "@/utils/functions";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { StyleSheet, View } from "react-native";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { IC_CLOSE } from "@/assets";
import { EPaymentMethod } from "@/utils/format";

interface PaymentBottomSheetProps {
  paymentMethod: EPaymentMethod;
  setPaymentMethod: (method: EPaymentMethod) => void;
}

export const PaymentBottomSheet = memoForwardRef(function CartBottomSheet(props: PaymentBottomSheetProps, ref: React.RefObject<BottomSheetModal>) {
  const snapPoints = useMemo(() => ["30%"], []);
const {paymentMethod,setPaymentMethod} = props;
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
          <STitle>Chọn hình thức thanh toán</STitle>
          <SIcon source={IC_CLOSE} />
        </SRowSection>
        <SRowSection onPress={()=>{
          ref.current?.dismiss();
          setPaymentMethod(EPaymentMethod.VNPAY)

        }}>
          <STextNormal>VN PAY</STextNormal>
          <SCheckBoxWrapper>
            {paymentMethod === EPaymentMethod.VNPAY ? <SChecked/> : null}
          </SCheckBoxWrapper>
        </SRowSection>
        <SRowSection onPress={()=>{
          setPaymentMethod(EPaymentMethod.COD)
          ref.current?.dismiss();
        }}>
          <STextNormal>Tiền mặt</STextNormal>
          <SCheckBoxWrapper>
            {paymentMethod === EPaymentMethod.COD ? <SChecked/> : null}
          </SCheckBoxWrapper>
        </SRowSection>
      </View>
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
const SRowSection = styled.TouchableOpacity`
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
