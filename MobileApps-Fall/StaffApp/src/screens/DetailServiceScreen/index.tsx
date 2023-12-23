import React, { memo, useEffect, useMemo } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import styled from "styled-components/native";
import { ProductItem } from "@/screens/DetailServiceScreen/ProductItem";
import { FlexCenter, FlexSpaceBetween } from "@/helper/styles";
import { IC_BILL } from "@/assets";
import { useNavigationParams } from "@/hooks";
import { useOrder } from "@/store/order";
import moment from "moment";
import { formatCurrency } from "@/utils/format";
import { EmptyView } from "@/components/EmptyView";
import { LoadingModal } from "@/components/LoadingModal";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { requestOrderById, requestUpdateOrderById } from "@/store/order/function";
import { EOrderStatus } from "@/store/order/type";
import { ScrollView, View } from "react-native";
import { ServiceItem } from "@/screens/DetailServiceScreen/ServiceItem";

export interface DetailServiceScreenParams {
  id: string;
}

export const DetailServiceScreen = memo(function DetailServiceScreen() {
  const { id } = useNavigationParams<DetailServiceScreenParams>();
  const data = useOrder(id);
  const [{ loading }, updateOrderId] = useAsyncFn(async (status: string) => {
    await requestUpdateOrderById({ status }, id);
  }, [id]);

  console.log('data',data?.status)

  const [{ loading:firstLoad }, loadFirst] = useAsyncFn(async () => {
    await requestOrderById(id);
  }, [id]);

  useEffect(()=>{
    loadFirst().then();
  },[])

  const filterOrderDetail = useMemo(() => {
    return data?.orderDetails.filter(item => item.repairService);
  }, []);
  const filterOrderProduct = useMemo(() => {
    return data?.orderDetails.filter(item => item.motobikeProduct);
  }, []);
  return (<FullScreenWrapper>
    <CustomHeader isBack title={"Thông tin đơn hàng sửa chữa"} />
    <ScrollView showsVerticalScrollIndicator={false} style={{
      flex:1
    }}>
      <SContainer>
        <View style={{
          padding:12
        }}>
          {filterOrderProduct && filterOrderProduct.length > 0 ? <STextBold style={{
            fontSize:16,
            marginBottom:12
          }}>Sản phẩm</STextBold> : null}
          {
            filterOrderProduct && filterOrderProduct.map((item, index) => {
              return <ProductItem key={index} item={item} />;
            })
          }
          {filterOrderDetail && filterOrderDetail.length > 0 ? <STextBold style={{
            fontSize:16,
            marginBottom:12
          }}>Dịch vụ</STextBold> : null}
          {
            filterOrderDetail && filterOrderDetail.map((item, index) => {
              return <ServiceItem key={index} item={item} />;
            })
          }
        </View>
        <STaxWrapper>
          <FlexCenter gap={8}>
            <STaxIcon source={IC_BILL} />
            <STextBold>Chi tiết thanh toán</STextBold>
          </FlexCenter>
          <FlexSpaceBetween>
            <STextNormal>Mã</STextNormal>
            <STextNormal>{data?.id}</STextNormal>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <STextNormal>Số điện thoại</STextNormal>
            <STextNormal>{data?.customerPhoneNumber}</STextNormal>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <STextNormal>Tên</STextNormal>
            <STextNormal>{data?.customerName}</STextNormal>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <STextNormal>Biển số xe</STextNormal>
            <STextNormal>{data?.licensePlate}</STextNormal>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <STextNormal>Ngày thanh toán</STextNormal>
            <STextNormal>{moment(data?.orderDate).format("DD-MM-YYYY")}</STextNormal>
          </FlexSpaceBetween>
          <FlexSpaceBetween>
            <STextNormal>Tổng thanh toán </STextNormal>
            <STextNormal>{formatCurrency(data?.totalAmount || 0)}</STextNormal>
          </FlexSpaceBetween>
        </STaxWrapper>
        {data?.status == EOrderStatus.Repairing ?
          <SStatusButton active={data?.status === EOrderStatus.Repairing} onPress={() => {
            updateOrderId(EOrderStatus.WaitForPay).then();
          }}>
            <STextNormal>Đã Sửa Xong</STextNormal>
          </SStatusButton> : null}
        <SActionButton disabled={data?.status !== EOrderStatus.Processing}
                       active={data?.status === EOrderStatus.Processing} onPress={() => {
          updateOrderId(EOrderStatus.Repairing).then();
        }}>
          <STextWhite>Bắt đầu sửa chữa</STextWhite>
        </SActionButton>
      </SContainer>
    </ScrollView>
    <LoadingModal isVisible={loading} />
  </FullScreenWrapper>);
});
const SContainer = styled.View`
  flex: 1;
  background: #E8E8E8;
`;
const STaxWrapper = styled.View`
  background: #FFF;
  padding: 12px;
`;
const STaxIcon = styled.Image`
  width: 16px;
  height: 18px;
  tint-color: #FF0000;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.2px;
`;
const STextBold = styled(STextNormal)`
  font-weight: 700;
`;
const SActionButton = styled.TouchableOpacity<{ active: boolean }>`
  display: flex;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: ${p => p.active ? "#BD3505" : "rgba(189, 53, 5, 0.32)"};
  margin: 12px;
`;
const SStatusButton = styled.TouchableOpacity<{ active: boolean }>`
  display: flex;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  margin: 12px;
  border: 1px solid #000;
  background: ${p => p.active ? "#FFF" : "rgba(141, 141, 141, 0.50)"};
`;

const STextWhite = styled(STextNormal)`
  color: white;
`;
