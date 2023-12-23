import { memo, useMemo } from "react";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { FlexSpaceBetween } from "@/helper/styles";
import { EBookingStatus } from "@/store/booking/type";
import { useBooking } from "@/store/booking";
import moment from "moment";
import { TouchableOpacity } from "react-native";
import { navigateToDetailBookingScreen } from "@/utils/navigation";

interface BookingItemProps {
  id: string | number;
}

export const BookingItem = memo(function BookingItem(props: BookingItemProps) {
  const { id } = props;
  const booking = useBooking(id);
  const colorStatusBox = useMemo(() => {
    switch (booking?.status) {
      case EBookingStatus.PENDING: {
        return "#F7893A";
      }
      case EBookingStatus.CONFIRMED: {
        return "#00A023";
      }
      case EBookingStatus.CANCELLED: {
        return "#FF0000";
      }
      case EBookingStatus.COMPLETED: {
        return "#00A023";
      }
      default: {
        return "#F7893A";
      }
    }
  }, [booking]);
  return (
    <SContainer onPress={() => {
      navigateToDetailBookingScreen({
        id: booking?.id || ""
      });
    }}>
      <FlexSpaceBetween>
        <STextBold>{`Thời gian: ${booking?.status === EBookingStatus.PENDING ? "Chờ cập nhật" : "8:00"}`}</STextBold>
        <StatusBox color={colorStatusBox}>
          <STextBold style={{
            color: "white"
          }}>{booking?.status}</STextBold>
        </StatusBox>
      </FlexSpaceBetween>
      <STextNormal>{moment(booking?.dateBook).format("DD-MM-YYYY")}</STextNormal>
      {booking?.status === EBookingStatus.PENDING ? <STextNormal>Nhân viên sẽ liên lạc tới bạn sớm nhất
        Sau 24h không liên lạc được với bạn lịch hẹn của bạn sẽ bị hủy</STextNormal> : null}
    </SContainer>
  );
});
const SContainer = styled.TouchableOpacity`
  padding: 16px;
  border: 1px solid #000000;
  border-radius: 4px;
  margin: 0 12px;
`;
const StatusBox = styled.View<{ color: string }>`
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 39px;
  background-color: ${({ color }) => color};
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
  font-family: ${Fonts.Bold};
  font-size: 16px;
  line-height: 20px; /* 125% */
  letter-spacing: 0.2px;
`;
