import React, { useCallback, useEffect, useMemo } from "react";
import { memoForwardRef } from "@/utils/functions";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { IC_CLOSE } from "@/assets";
import { requestAddToCart } from "@/zustand/cart/function";
import SimpleToast from "react-native-simple-toast";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { LoadingModal } from "@/components/LoadingModal";
import { formatCurrency } from "@/utils/format";
import useAutoToastError from "@/hooks/useAutoToastError";

interface CartBottomSheetProps {
  totalPrice: number;
  productId: string;
}

export const CartBottomSheet = memoForwardRef(function CartBottomSheet(props: CartBottomSheetProps, ref: React.RefObject<BottomSheetModal>) {
  const [quantity, setQuantity] = React.useState(1);
  const { totalPrice, productId } = props;
  // variables
  const snapPoints = useMemo(() => ["30%"], []);

  const [{loading,error},onToCart] = useAsyncFn(async ()=>{
    await requestAddToCart([{
      quantity,
      productId
    }]);
    ref.current?.dismiss();
  },[quantity])
  useAutoToastError(error)
  const onAddQuantity = useCallback(() => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  }, [quantity]);
  const onRemoveQuantity = useCallback(() => {
    setQuantity(quantity - 1);
  }, [quantity]);

  useEffect(() => {
    if(quantity === 10){
      SimpleToast.show("Số lượng sản phẩm tối đa là 10", SimpleToast.SHORT);
    }
  }, [quantity]);

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
        <LoadingModal isVisible={loading} />
        <SRowSection>
          <STitle>Thêm vào giỏ hàng</STitle>
          <SIcon source={IC_CLOSE} />
        </SRowSection>
        <SRowSection>
          <STextNormal>Số lượng</STextNormal>
          <FlexCenter style={{
            gap: 12
          }}>
            <TouchableOpacity onPress={onRemoveQuantity}>
              <STextNormal>-</STextNormal>
            </TouchableOpacity>
            <STextNormal>{quantity}</STextNormal>
            {
              quantity < 10 ? <TouchableOpacity onPress={onAddQuantity}>
                <STextNormal>+</STextNormal>
              </TouchableOpacity> : <View />
            }
          </FlexCenter>
        </SRowSection>
        <SRowSection>
          <STextNormal>Tổng số tiền</STextNormal>
          <STextBold>{formatCurrency(totalPrice * quantity)}</STextBold>
        </SRowSection>
        <SBtnAddToCart onPress={onToCart}>
          <STextNormal style={{
            color: "#fff"
          }}>Thêm vào giỏ hàng</STextNormal>
        </SBtnAddToCart>
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
const STextBold = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
`;
const SBtnAddToCart = styled.TouchableOpacity`
  padding: 15px 20px;
  justify-content: center;
  margin: 20px 0;
  align-items: center;
  border-radius: 10px;
  background-color: #BD3505;
  width: 100%;
`;
const FlexCenter = styled.View`
  align-items: center;
  flex-direction: row;
`;
