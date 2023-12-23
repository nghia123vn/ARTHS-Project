import { memo } from "react";
import styled from "styled-components/native";
import { IC_ARROW, IC_INVOICE } from "@/assets";
import { navigateToDetailBookingScreen, navigateToDetailServiceScreen } from "@/utils/navigation";
import { useBooking } from "@/store/booking";
import moment from "moment";

export const BookingItem = memo(function ServiceItem({ id }: { id: string }) {
  const booking = useBooking(id);
  return (
    <SContainer onPress={() => {
      navigateToDetailBookingScreen({ id });
    }}>
      <SIcon source={IC_INVOICE} />
      <SInfoWrapper>
        <STextBold>{`Ngày đặt lịch: ${moment(booking?.dateBook).format('DD-MM-YYYY')}`}</STextBold>
        <STextBold>Thông tin khách hàng</STextBold>
        {
          booking?.customer ? (
            <>
              <STextNormal>{`Tên: ${booking?.customer.fullName}`}</STextNormal>
              <STextNormal>{`Số điện thoại: ${booking?.customer.phoneNumber}`}</STextNormal>
            </>
          ) : null
        }
      </SInfoWrapper>
      <SIcon source={IC_ARROW} />
    </SContainer>
  );
});
const SContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-items: flex-start;
  border-radius: 4px;
  background: #FFF;
  padding: 12px;
  gap: 12px;
  border: 1px solid #000;
  /* base */
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  margin-bottom: 16px;
  /* base */
`;
const SInfoWrapper = styled.View`
  flex: 1;
  flex-wrap: wrap;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.2px;
`;
const STextBold = styled(STextNormal)`
  font-weight: 700;
`;
const SIcon = styled.Image`
  width: 20px;
  height: 20px;
`;
