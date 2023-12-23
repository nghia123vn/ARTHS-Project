import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import { useCart } from "@/zustand/cart";
import { EmptyView } from "@/components/EmptyView";
import { CartItemThumbnail } from "@/screens/CartScreen/CartItem";
import { requestUpdateCart } from "@/zustand/cart/function";
import styled from "styled-components/native";
import { navigateToPaymentScreen } from "@/utils/navigation";
import { useBoolean } from "@/hooks";
import { CartItem } from "@/zustand/cart/type";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { LoadingModal } from "@/components/LoadingModal";
import { formatCurrency } from "@/utils/format";
import useAutoToastError from "@/hooks/useAutoToastError";


export const CartScreen = memo(function CartScreen() {
  const cart = useCart();
  const [cartParams, setCartParams] = useState<CartItem[]>([]);
  const [modified, on, off, toggle] = useBoolean(false);
  const totalPrice = useMemo(() => {
    let total = 0;
    cart.cartItems.forEach(item => {
      if (cartParams.map(item => item.motobikeProduct.id).includes(item.motobikeProduct.id)) {
        const priceDiscount = item.motobikeProduct.priceCurrent * (100-item.motobikeProduct.discountAmount) /100
        return total += priceDiscount * item.quantity;
      }
    });
    return total;
  }, [cart, cartParams]);

  useEffect(() => {
    setCartParams(cart.cartItems);
  }, []);

  const onModify = useCallback((productId: string, type: "add" | "minus") => {
    setCartParams((prev) => {
      return prev.map(item => {
        if (item.motobikeProduct.id === productId) {
          if (type === "add") {
            return {
              ...item,
              quantity: item.quantity + 1
            };
          }
          if (type === "minus") {
            if (item.quantity === 1) {
              return item;
            } else {
              return {
                ...item,
                quantity: item.quantity - 1
              };
            }
          }
        }
        return item;
      });
    });
    on();
  }, []);


  const [{loading,error},onUpdateCart] = useAsyncFn(async ()=>{
    await requestUpdateCart({
      cartItems: cartParams.map(item => ({
        productId: item.motobikeProduct.id,
        quantity: item.quantity
      }))
    }, cart.id);
    off();
  },[cartParams])
  useAutoToastError(error)

  useEffect(() => {
    if (modified) {
      onUpdateCart().then();
    }
  }, [modified]);


  const onDeleteProduct = useCallback((productId: string) => {
    setCartParams((prev) => {
      return prev.filter(item => item.motobikeProduct.id !== productId);
    });
    on();
  }, []);

  const onToggleCheck = useCallback((productId: string) => {
    setCartParams((prev) => {
      const productFromCart = cart.cartItems.find(item => item.motobikeProduct.id === productId);
      const findIndex = prev.findIndex(item => item.motobikeProduct.id === productId);
      if (findIndex != -1) {
        return [
          ...prev.slice(0, findIndex),
          ...prev.slice(findIndex + 1)
        ];
      } else {
        return [
          ...prev,
          productFromCart as CartItem
        ];
      }
    });
  }, []);


  return (
    <FullScreenWrapper>
      <CustomHeader isBack title={"Giỏ hàng"} />
      <LoadingModal isVisible={loading}/>
      <View style={styles.container}>
        <FlatList
          style={{
            flex:1
          }}
          data={cart.cartItems}
          keyExtractor={item => item.motobikeProduct.id.toString()}
          renderItem={({ item }) => (
            <CartItemThumbnail item={item} onModify={onModify} onToggleCheck={onToggleCheck} onDelete={onDeleteProduct} checked={
              cartParams.map(item => item.motobikeProduct.id).includes(item.motobikeProduct.id)
            } />
          )}
          ListEmptyComponent={<EmptyView title={"Giỏ hàng của bạn đang trống"} />}

        />
        <StyledBottomView>
          <View>
            <STextNormal>Tổng tiền</STextNormal>
            <STextBold>{formatCurrency(totalPrice)}</STextBold>
          </View>
          <BuyNowButton disabled={cartParams.length === 0} onPress={() => {
            navigateToPaymentScreen({
              cartItems: cartParams,
              cartId: cart.id
            });
          }}>
            <STextButton>{`Mua ngay (${cartParams.length})`}</STextButton>
          </BuyNowButton>
        </StyledBottomView>
      </View>
    </FullScreenWrapper>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fafafa"
  }
});
const StyledBottomView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 12px;
  background: #FFF;
`;
const STextNormal = styled.Text`
  color: #212529;
  font-size: 13px;
  font-weight: 400;
`;
const STextBold = styled.Text`
  color: #212529;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.36px;
`;

const BuyNowButton = styled.TouchableOpacity`
  border-radius: 4px;
  background: #BD3505;
  padding: 24px 12px;
`;
const STextButton = styled.Text`
  color: #FFF;
  text-align: center;
  font-size: 17px;
  font-weight: 400;
  line-height: 22px; /* 129.412% */
  letter-spacing: -0.41px;
`;
