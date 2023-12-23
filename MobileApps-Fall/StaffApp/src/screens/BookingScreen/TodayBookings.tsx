import { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components/native";
import { FlatList, RefreshControl } from "react-native";
import { useAccount } from "@/zustand/account";
import { EmptyView } from "@/components/EmptyView";
import { useBookingByQuery } from "@/store/booking";
import { BookingItem } from "@/screens/BookingScreen/BookingItem";
import { requestBookings, requestLoadMoreBookings } from "@/store/booking/function";

export const TodayBookings = memo(function TodayBookings() {
  const listBookings = useBookingByQuery("today");
  const account = useAccount();
  const [pageNumber,  setPageNumber] = useState(0);

  const handleLoadMore = useCallback(async () => {
    setPageNumber(pageNumber + 1);
    await requestLoadMoreBookings({
      pageNumber: pageNumber + 1,
      staffId: account?.id
    });
  }, [pageNumber]);
  const renderItem = useCallback(({ item }: any) => {
    return <BookingItem id={item} />;
  }, []);

  useEffect(()=>{
    requestBookings({
      staffId: account?.id,
      pageNumber: 0
    }).then()
  },[])

  return (
    <SContainer>
      <FlatList data={listBookings} renderItem={renderItem}
                keyExtractor={(item: any) => item.id}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                ListEmptyComponent={<EmptyView title={"Bạn chưa có đơn hàng nào hôm nay"} />}
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
