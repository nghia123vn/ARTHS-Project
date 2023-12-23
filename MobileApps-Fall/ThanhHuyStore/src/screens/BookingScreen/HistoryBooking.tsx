import React, { memo, useEffect } from "react";
import styled from "styled-components/native";
import { FlatList, View } from "react-native";
import { Fonts } from "@/theme/Fonts";
import { requestBookings } from "@/store/booking/function";
import { useBookingByQuery } from "@/store/booking";
import { useAccount } from "@/zustand/account";
import { EmptyView } from "@/components/EmptyView";
import { BookingItem } from "@/screens/BookingScreen/BookingItem";
import { EBookingStatus } from "@/store/booking/type";

export const HistoryBooking = memo(function HistoryBooking() {
  const listIdsBookingConfirmed = useBookingByQuery(EBookingStatus.CANCELLED);
  const listIdsBookingPending = useBookingByQuery(EBookingStatus.COMPLETED);
  const account = useAccount();

  useEffect(() => {
    requestBookings({
      customerId: account?.id || "",
      bookingDate: "",
      bookingStatus: EBookingStatus.COMPLETED,
      excludeBookingStatus: "",
      pageNumber: 1,
      pageSize: 10
    }).then();
    requestBookings({
      customerId: account?.id || "",
      bookingDate: "",
      bookingStatus: EBookingStatus.CANCELLED,
      excludeBookingStatus: "",
      pageNumber: 1,
      pageSize: 10
    }).then();
  }, [account]);

  return (
    <FlatList data={[
      ...listIdsBookingConfirmed,
      ...listIdsBookingPending
    ]}
              style={{
                flex: 1
              }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                gap: 12
              }}
              renderItem={({ item }) => <BookingItem id={item} />}
              ListEmptyComponent={<EmptyView title="Hiện tại chưa có lịch nào được đăt" />}
              ListFooterComponent={<View style={{
                height: 100
              }} />}
    />
  );
});
const SContainer = styled.View`
  flex: 1;
  background-color: white;
  gap: 20px;
  padding: 20px;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.061px;
`;
const STextBold = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Medium};
  font-size: 16px;
  line-height: 20px; /* 125% */
  letter-spacing: 0.2px;
`;
const SInfoWrapper = styled.View`
  padding: 12px;
  gap: 20px;
`;
const SIcon = styled.Image`
  width: 20px;
  height: 20px;
`;
const STabWrapper = styled.View<{ active: boolean }>`
  width: 50%;
  padding: 16px 0;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  background: ${({ active }) => active ? "#fff" : "rgba(131, 131, 131, 0.23)"};
`;

const SActionButton = styled.TouchableOpacity`
  display: flex;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 12px;
  bottom: 80px;
  padding: 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: #BD3505;
`;
const STextButton = styled(STextNormal)`
  color: white;
`;
