import React, { memo, useCallback, useEffect, useState } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import styled from "styled-components/native";
import { ServiceItem } from "@/screens/ServicesScreen/ServiceItem";
import { useOrderByQuery } from "@/store/order";
import { requestAllOrders, requestLoadMoreOrders } from "@/store/order/function";
import { FlatList } from "react-native";
import { useAccount } from "@/zustand/account";
import { EmptyView } from "@/components/EmptyView";
import { EOrderStatus } from "@/store/order/type";

export const FinishedServicesScreen = memo(function FinishedServicesScreen() {
  const listOrders = useOrderByQuery(EOrderStatus.Finished);
  const account = useAccount();
  const [pageNumber, setPageNumber] = useState(0);
  const handleLoadMore = useCallback(async () => {
    setPageNumber(pageNumber + 1);
    await requestLoadMoreOrders({
      pageNumber: pageNumber + 1, staffId: account.id,
      orderStatus: EOrderStatus.Finished
    });
  }, [pageNumber]);
  const renderItem = useCallback(({ item }: any) => {
    return <ServiceItem id={item} />;
  }, []);

  useEffect(() => {
    requestAllOrders({
      pageNumber, staffId: account.id,
      orderStatus: EOrderStatus.Finished
    }).then();
  }, []);
  return (<FullScreenWrapper>
    <SContainer>
      <FlatList data={listOrders} renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={<EmptyView title={"Bạn chưa có đơn hàng nào"} />}
      />
    </SContainer>
  </FullScreenWrapper>);
});
const SContainer = styled.View`
  flex: 1;
  background-color: #fafafa;
`;
