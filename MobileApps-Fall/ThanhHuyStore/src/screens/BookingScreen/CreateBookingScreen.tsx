import React, { memo, useMemo, useState } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { FlexCenter } from "@/helper/styles";
import { IC_CALENDAR_EDIT, IC_DESCRIPTION_BOOKING, IC_LOCATION } from "@/assets";
import { Calendar } from "react-native-calendars";
import { Platform, View } from "react-native";
import { getALlBookingData } from "@/store/booking/function";
import { IBooking } from "@/store/booking/type";
import { navigateToConfirmBookingScreen } from "@/utils/navigation";
import { useBookingByQuery } from "@/store/booking";
import {KeyboardAvoidingView} from "react-native";
import { useAccount } from "@/zustand/account";
import SimpleToast from "react-native-simple-toast";
import { IConfiguration } from "@/zustand/configuration/type";
import { useConfiguration } from "@/zustand/configuration";

function transformArray(data: (IBooking | undefined)[], bookingSetting: IConfiguration, myId: string) {
  const result:any = {};

  data.forEach(item => {
    if(item){
      const dateBook = item.dateBook.split('T')[0];
      const idCustomer = item.customer.accountId
      if (!result[dateBook]) {
        result[dateBook] = 1;
      } else if(idCustomer === myId){
        result[dateBook] = 999;
      }
      else {
        result[dateBook]++;
      }
    }
  });

  const markedDates = {};


  Object.entries(result).forEach(([date, count,]) => {
    // @ts-ignore
    markedDates[date] = {marked:true,dots:[{color:'blue'}]
        // @ts-ignore
      ,disabled:count >= bookingSetting.dailyOnlineBookings };
  });

  return markedDates;
}
export const CreateBookingScreen = memo(function CreateBookingScreen() {
  const [selected, setSelected] = useState("");
  const [description, setDescription] = useState("");
  const configuration = useConfiguration();
  const listDataIds = useBookingByQuery("all")
  const account = useAccount();

  const data = useMemo(() => {
    return getALlBookingData();
  }, [listDataIds]);

  const dateAlreadySelected = useMemo(() => {
    return transformArray(data,configuration,account.id);
  }, [data,configuration,account]);


  return (
    <FullScreenWrapper>
      <CustomHeader isBack title="Đăt lịch hẹn" />
      <KeyboardAvoidingView style={{
        flex:1
      }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <SContainer>
          <FlexCenter gap={4} style={{
            marginHorizontal:8
          }}>
            <STabWrapper active={true}>
              <SIcon source={IC_CALENDAR_EDIT} active={true} />
              <STextNormal style={{
                color: "#BD3505"
              }}>Tạo thông tin</STextNormal>
            </STabWrapper>
            <STabWrapper active={false}>
              <SIcon source={IC_DESCRIPTION_BOOKING} active={false} />
              <STextNormal>Xem lại</STextNormal>
            </STabWrapper>
          </FlexCenter>
          <STextBold style={{
            textAlign: "center",
            marginVertical:12
          }}>Chọn thời gian làm dịch vụ</STextBold>
          <Calendar
            onDayPress={day => {
              setSelected(day.dateString);
            }}
            style={{
              borderWidth: 1,
              borderColor: "gray",
              marginHorizontal:12,
              borderRadius:12
            }}
            markedDates={{
              ...dateAlreadySelected,
              [selected]: {selected: true, selectedColor: "#BD3505"},
            }}
            markingType={'multi-dot'}
            minDate={new Date(Date.now() + ( 3600 * 1000 * 24)).toString()}
          />
          <SInfoWrapper>
            <FlexCenter gap={8} style={{
              alignItems: "flex-start",
              maxWidth:'90%'
            }}>
              <SIconSmall source={IC_LOCATION} />
              <View>
                <STextBold>Địa chỉ cửa hàng</STextBold>
                <STextNormal>73/16 Phạm Văn Chiêu
                  Phường 2, Quận Gò Vấp, TP. Hồ Chí Minh</STextNormal>
              </View>
            </FlexCenter>
            <STextBold>Nhập thông tin chi tiết</STextBold>
            <STextInputWrapper
              onChangeText={setDescription}
              placeholder={"Thêm mô tả về lỗi của xe hoặc dịch vụ bạn muốn sử dụng để giúp đại lý chuẩn bị tốt hơn "} />
          </SInfoWrapper>
          <SActionButton onPress={()=>{
            if(selected) {
              navigateToConfirmBookingScreen({
                address: "73/16 Phạm Văn Chiêu Phường 2, Quận Gò Vấp, TP. Hồ Chí Minh",
                time: selected,
                description: description,
              })
            }
              else {
                SimpleToast.show("Bạn chưa chọn ngày")
              }
          }}>
            <STextButton>Tiếp Theo</STextButton>
          </SActionButton>
        </SContainer>
      </KeyboardAvoidingView>
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
  font-family: ${Fonts.Medium};
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
  margin-top: 12px;
  gap: 20px;
`;
const SIconSmall = styled.Image`
  width: 20px;
  height: 20px;
`;
const STextInputWrapper = styled.TextInput`
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #616161;
  background: rgba(112, 112, 112, 0.15);
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
  margin: 0 12px;
`;
const STextButton = styled(STextNormal)`
  color: white;
`;


