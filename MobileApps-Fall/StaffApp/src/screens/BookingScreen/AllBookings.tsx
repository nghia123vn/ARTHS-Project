import { memo, useCallback, useEffect, useState } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import styled from "styled-components/native";
import { ServiceItem } from "@/screens/ServicesScreen/ServiceItem";
import { useOrderByQuery } from "@/store/order";
import { requestAllOrders } from "@/store/order/function";
import { FlatList, RefreshControl } from "react-native";
import { useAccount } from "@/zustand/account";
import { EmptyView } from "@/components/EmptyView";
import { requestBookings, requestLoadMoreBookings } from "@/store/booking/function";
import { useBookingByQuery } from "@/store/booking";
import { BookingItem } from "@/screens/BookingScreen/BookingItem";

export const AllBookings = memo(function AllBookings() {
  const listBookings = useBookingByQuery("all");
  const account = useAccount();
  const [pageNumber, setPageNumber] = useState(0);
  const handleLoadMore = useCallback(async () => {
    setPageNumber(pageNumber + 1);
    await requestLoadMoreBookings({
      pageNumber:pageNumber+1, staffId: account.id
    });
  }, [pageNumber]);
  const renderItem = useCallback(({ item }: any) => {
    return <BookingItem id={item} />;
  }, []);

  return (
    <SContainer>
      <FlatList data={listBookings} renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item: any) => item.id}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={<EmptyView title={"Bạn chưa có đơn hàng nào"} />}
      />
    </SContainer>
  );
});
const SContainer = styled.View`
  flex: 1;
  background-color: #fafafa;
  padding: 12px 16px;
  gap: 20px;
`;
