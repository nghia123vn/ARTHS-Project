import {memo} from "react";
import styled from "styled-components/native";
import {IC_ARROW, IC_INVOICE} from "@/assets";
import {useOrder} from "@/store/order";
import {navigateToDetailServiceScreen} from "@/utils/navigation";
import { FlexSpaceBetween } from "@/helper/styles";
import { EOrderStatus } from "@/store/order/type";

export const ServiceItem = memo(function ServiceItem({id}:{id:string}) {
  const order = useOrder(id)
  return (
    <SContainer onPress={()=>{
      navigateToDetailServiceScreen({id})
    }}>
      <SIcon source={IC_INVOICE}/>
      <SInfoWrapper>
        <STextBold>{`Mã đơn hàng: ${order?.id}`}</STextBold>
        <STextBold>Thông tin khách hàng</STextBold>
        <STextNormal>{`Tên: ${order?.customerName}`}</STextNormal>
        <STextNormal>{`Số điện thoại: ${order?.customerPhoneNumber}`}</STextNormal>
        <FlexSpaceBetween>
          <STextNormal>{`Biển số xe: ${order?.licensePlate}`}</STextNormal>
        </FlexSpaceBetween>
      </SInfoWrapper>
      <SIcon source={IC_ARROW}/>
    </SContainer>
  )
})
const SContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  border-radius: 4px;
  background: #FFF;
  padding: 12px;
  gap:12px;
  border: 1px solid #000;
  /* base */
  margin: 16px 16px 0 16px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06)
  /* base */
`
const SInfoWrapper = styled.View`
  flex: 1;
  flex-wrap: wrap;
`
const STextNormal = styled.Text`
  color: #0C1A30;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.2px;
`
const STextGreen = styled.Text`
  color: #11CE00;
`
const STextBold = styled(STextNormal)`
  font-weight: 700;
`
const SIcon = styled.Image`
  width: 20px;
  height: 20px;
`
