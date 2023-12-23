import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import { Fonts } from "@/theme/Fonts";
import { useOrderByQuery } from "@/store/order";
import { requestListOrders, requestListOrdersLoadMore } from "@/store/order/function";
import { EmptyView } from "@/components/EmptyView";
import { FlatList, RefreshControl, View } from "react-native";
import { EOrderStatus } from "@/store/order/type";
import { OrderThumbnail } from "@/screens/OrderScreen/OrderThumbnail";
import { useAccount } from "@/zustand/account";
import { useNavigationParams } from "@/hooks";
import { requestLoadMoreNoti, requestNotifications } from "@/store/notifications/function";

export interface OrderScreenParasm {
  defaultStatus?: EOrderStatus
}
export const OrderScreen = memo(function OrderScreen() {
  const {defaultStatus} = useNavigationParams<OrderScreenParasm>()
  const [refreshing, setRefreshing] = useState(false);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [status, setStatus] = useState<EOrderStatus>(EOrderStatus.PENDING);
  const account = useAccount();
  const listOrders = useOrderByQuery(status);
  useEffect(() => {
    requestListOrders({
      customerId: account?.id,
      status: status
    }).then();
  }, [status,account]);
  const handleLoadMore = useCallback(async ()=>{
    setPageNumber(pageNumber + 1)
    await requestListOrdersLoadMore({
      customerId: account?.id,
      status: status
    },pageNumber + 1)
  },[pageNumber,status,account])
  useEffect(()=>{
    if(defaultStatus) {
      setStatus(defaultStatus)
    }
  },[defaultStatus])

  const onChangeTab = useCallback((status: EOrderStatus) => {
    setStatus(status);
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      requestListOrders({
        customerId: account?.id,
        status: status
      }).then();
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <FullScreenWrapper>
      <CustomHeader title={"Đơn mua"} isBack />
      <SContainer>
        <View style={{
          height: 40
        }}>
          <SScrollView horizontal showsHorizontalScrollIndicator={false}>
            <SCustomTab active={status === EOrderStatus.PENDING} onPress={() => {
              onChangeTab(EOrderStatus.PENDING);
            }}>
              <SText active={status === EOrderStatus.PENDING}>{EOrderStatus.PENDING}</SText>
            </SCustomTab>
            <SCustomTab active={status === EOrderStatus.SUCCESS} onPress={() => {
              onChangeTab(EOrderStatus.SUCCESS);
            }}>
              <SText active={status === EOrderStatus.SUCCESS}>{EOrderStatus.SUCCESS}</SText>
            </SCustomTab>
            <SCustomTab active={status === EOrderStatus.PROCESSING} onPress={() => {
              onChangeTab(EOrderStatus.PROCESSING);
            }}>
              <SText active={status === EOrderStatus.PROCESSING}>{EOrderStatus.PROCESSING}</SText>
            </SCustomTab>
            <SCustomTab active={status === EOrderStatus.TRANSFER} onPress={() => {
              onChangeTab(EOrderStatus.TRANSFER);
            }}>
              <SText active={status === EOrderStatus.TRANSFER}>{EOrderStatus.TRANSFER}</SText>
            </SCustomTab>
            <SCustomTab active={status === EOrderStatus.CANCEL} onPress={() => {
              onChangeTab(EOrderStatus.CANCEL);
            }}>
              <SText active={status === EOrderStatus.CANCEL}>{EOrderStatus.CANCEL}</SText>
            </SCustomTab>
          </SScrollView>
        </View>
        <FlatList data={listOrders}
                  style={{
                    flex: 1,
                    marginTop: 24
                  }}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                  onEndReached={handleLoadMore}
                  onEndReachedThreshold={0.5}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => <OrderThumbnail id={item} />}
                  ListEmptyComponent={<EmptyView title="Không tìm thấy đơn hàng nào" />}
        />
      </SContainer>
    </FullScreenWrapper>
  );
});
const SContainer = styled.View`
  flex: 1;
  background-color: #E7E7E7;
  padding: 12px 16px;
`;
const SCustomTab = styled.TouchableOpacity<{ active: boolean }>`
  height: 40px;
  width: 120px;
  padding: 4px 0;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-right: 12px;
  border: 1px solid #EDEDED;
  background: ${p => p.active ? "#FBEFEF" : "#FAFAFA"};
`;
const SText = styled.Text<{ active: boolean }>`
  color: ${p => p.active ? "#BD3505" : "#000000"};
  text-align: center;
  font-family: ${Fonts.Regular};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;
const SScrollView = styled.ScrollView`
`;
