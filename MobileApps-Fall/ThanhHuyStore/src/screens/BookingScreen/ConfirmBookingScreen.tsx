import React, { memo, useEffect, useRef } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { FlexCenter } from "@/helper/styles";
import { IC_CALENDAR_EDIT, IC_DESCRIPTION_BOOKING, IC_LOCATION } from "@/assets";
import { ActivityIndicator, View } from "react-native";
import { useBoolean, useNavigationParams } from "@/hooks";
import { useAsyncFn } from "@/hooks/useAsyncFn";
import { requestCreateBooking } from "@/store/booking/function";
import { ModalSuccess } from "@/screens/BookingScreen/ModalSuccess";
import Modal from "react-native-modal";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { SelectStaffBottomSheet } from "@/screens/BookingScreen/SelectStaffBottomSheet";
import { requestStaffs } from "@/store/staff/function";
import useAutoToastError from "@/hooks/useAutoToastError";
import { useAccount } from "@/zustand/account";

export interface ConfirmBookingScreenParams {
  address: string;
  time: string;
  description: string;
}

export const ConfirmBookingScreen = memo(function ConfirmBookingScreen() {
  const {
    address,
    time,
    description,
  } = useNavigationParams<ConfirmBookingScreenParams>();
  const [visible, show, hide] = useBoolean();
  const account =useAccount()
  const [id, setId] = React.useState<string>("");
  const [staffId, setStaffId] = React.useState<string>("");
  const [staffName, setStaffName] = React.useState<string>("");
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [{ loading, error: firstError }, onSubmit] = useAsyncFn(
    async (_staffId:string) => {
      const data = await requestCreateBooking({
        dateBook: time,
        description,
        staffId: _staffId,
      });
      show();
      setId(data?.id || "");
    },
    []
  );
  useAutoToastError(firstError)

  useEffect(()=>{
    requestStaffs().then()
  },[])

  return (
    <FullScreenWrapper>
      <CustomHeader isBack title="Đăt lịch hẹn" />
      <SContainer>
        <FlexCenter gap={4} style={{
          marginHorizontal:8
        }}>
          <STabWrapper active={false}>
            <SIcon source={IC_CALENDAR_EDIT} active={false} />
            <STextNormal>Địa chỉ cửa hàng</STextNormal>
          </STabWrapper>
          <STabWrapper active>
            <SIcon source={IC_DESCRIPTION_BOOKING} active={true} />
            <STextNormal style={{
              color: "#BD3505"
            }}>Xem lại</STextNormal>
          </STabWrapper>
        </FlexCenter>
        <SInfoWrapper>
          <FlexCenter gap={8} style={{
            alignItems: "flex-start"
          }}>
            <SIconSmall source={IC_LOCATION} />
            <View>
              <STextBold>Địa chỉ cửa hàng</STextBold>
              <STextNormal>{address}</STextNormal>
            </View>
          </FlexCenter>
          <SNoIconView style={{
            borderBottomWidth:1,
            borderBottomColor:"#EBEBEB",
          }}>
            <STextBold>Giờ làm việc
            </STextBold>
            <STextNormal>08:00 - 18:00</STextNormal>
          </SNoIconView>
          <SNoIconView style={{
            borderBottomWidth:1,
            borderBottomColor:"#EBEBEB",
          }}>
            <STextBold>Thông tin khách hàng
            </STextBold>
            <STextNormal>{`${account.fullName} | ${account.phoneNumber}`}</STextNormal>
          </SNoIconView>
          <SNoIconView>
            <STextBold>Thời gian đã chọn
            </STextBold>
            <STextNormal>{time}</STextNormal>
          </SNoIconView>
        </SInfoWrapper>
        <View style={{
          gap:20,
          marginHorizontal:12
        }}>
          <STextBold>Mô tả tình trạng xe</STextBold>
          <STextInputWrapper>
            <STextNormal>{description}</STextNormal>
          </STextInputWrapper>
          <SOutlinedButton onPress={()=>{
            bottomSheetRef.current?.present();
          }}>
            <STextButton style={{
              color: "#fff"
            }}>{staffId === '' ? 'Chọn thợ' : `Đã chọn thợ (${staffName})`}</STextButton>
          </SOutlinedButton>
          <SActionButton onPress={()=>{
            onSubmit(staffId).then()
          }}>
            {loading ? <ActivityIndicator /> : <STextButton>Hoàn thành</STextButton>}
          </SActionButton>
        </View>
        <Modal isVisible={visible} onModalHide={hide} onBackdropPress={hide}>
          <ModalSuccess id={id} hide={hide} />
        </Modal>
        <SelectStaffBottomSheet setStaffName={setStaffName} ref={bottomSheetRef} staffId={staffId} setStaffId={setStaffId}/>
      </SContainer>
    </FullScreenWrapper>
  );
});

const SContainer = styled.ScrollView`
  flex: 1;
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
const STabWrapper = styled.View<{active:boolean}>`
  align-items: center;
  justify-content: center;
  width: 50%;
  padding: 8px 0;
  border-radius: 15px;
  border:${({active})=>active ? "1px solid #000" : "1px solid #D4D4D4"};
  background: #FFF;
`;
const SIcon = styled.Image<{ active: boolean }>`
  width: 30px;
  height: 30px;
  tint-color: ${({ active }) => active ? "#BD3505" : "#838383"};
`;
const SInfoWrapper = styled.View`
  padding: 12px;
  gap: 20px;
  border-radius: 10px;
  border: 1px solid #000;
  background: #FFF;
  box-shadow: 0 -8px 12px rgba(0, 0, 0, 0.03);
  margin: 8px;
`;
const SIconSmall = styled.Image`
  width: 20px;
  height: 20px;
`;
const STextInputWrapper = styled.View`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #616161;
  min-height: 129px;
`;
const SActionButton = styled.TouchableOpacity`
  display: flex;
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
const SNoIconView = styled.View`
  padding-left: 28px;
`;
const SOutlinedButton = styled.TouchableOpacity`
  display: flex;
  padding: 4px 0;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: #9F8D86;
`;
