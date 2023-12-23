import React, { memo, useCallback, useMemo } from "react";
import { memoForwardRef } from "@/utils/functions";
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { useStaff, useStaffByQuery } from "@/store/staff";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { FlexCenter, FlexSpaceBetween } from "@/helper/styles";
import { IC_CLOSE } from "@/assets";
import { EStaffStatus } from "@/store/staff/type";

interface SelectStaffBottomSheetProps {
  staffId: string;
  setStaffId: (id: string) => void;
  setStaffName: (name: string) => void;
}

export const SelectStaffBottomSheet = memoForwardRef(function CartBottomSheet(props: SelectStaffBottomSheetProps, ref: React.RefObject<BottomSheetModal>) {
  const { staffId, setStaffId,setStaffName } = props;
  const snapPoints = useMemo(() => ["70%"], []);
  const listStaffIds = useStaffByQuery(EStaffStatus.INACTIVE);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        onPress={() => {
          ref.current?.dismiss();
        }}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        isCustomAnimatedIndex={props.hasFlashList}
        {...props.backDropProps}
      />
    ),
    []
  );
  const renderItem = useCallback(({ item }: any) => {
    return <StaffItem setStaffName={setStaffName} id={item} setStaffId={setStaffId} staffId={staffId} />;
  }, [staffId,setStaffId]);
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      keyboardBlurBehavior={"restore"}
      android_keyboardInputMode={"adjustPan"}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.container}>
        <SRowSection>
          <STitle>Chọn thợ để kiểm tra dịch vụ của bạn</STitle>
          <TouchableOpacity onPress={()=>{
            ref.current?.dismiss();
          }}>
            <SIcon source={IC_CLOSE} />
          </TouchableOpacity>
        </SRowSection>
        <BottomSheetFlatList style={styles.container} data={listStaffIds} renderItem={renderItem} ListHeaderComponent={
          <TouchableOpacity onPress={()=>{
            setStaffId('');
          }}>
            <FlexSpaceBetween style={{
              padding: 12,
              borderBottomWidth: 1,
              borderBottomColor: "#E5E5E5",
            }}>
              <STextBold>Không chọn thợ</STextBold>
              <SCheckBoxWrapper>
                {staffId === '' ? <SChecked/> : null}
              </SCheckBoxWrapper>
            </FlexSpaceBetween>
          </TouchableOpacity>
        } />
      </View>
    </BottomSheetModal>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24
  }
});

const SAvatarWrapper = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: #F2F2F2;
  justify-content: center;
  align-items: center;
  border: 1px solid #E5E5E5;
`;
const SAvatar = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 20px;
`;
const STextBold = styled.Text`
  font-family: ${Fonts.Bold};
  font-size: 16px;
  color: #000000;
`;
const SPhoneNumber = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 16px;
`;
const STitle = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 16px;
  font-weight: 700;
  line-height: 24px; /* 150% */
`;
const SIcon = styled.Image`
  width: 24px;
  height: 24px;
`;
const SRowSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  border-bottom-width: 1px;
  border-bottom-color: #E5E5E5;
  width: 100%;
`;
const SCheckBoxWrapper = styled.TouchableOpacity`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  border: 2px solid  #E2E8F0;
`;
const SChecked = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 6px solid #BD3505;
  background: #FFF;
`;

const StaffItem = memo(function StaffItem({ id,staffId,setStaffId,setStaffName }: { id: string,staffId:string,setStaffId:(id:string)=>void,setStaffName:(name:string)=>void}){
  const staff = useStaff(id);
  return (
   <TouchableOpacity onPress={()=>{
      setStaffId(id);
      setStaffName(staff?.fullName || '');
   }}>
     <FlexSpaceBetween style={{
       padding: 12,
       borderBottomWidth: 1,
       borderBottomColor: "#E5E5E5",
     }}>
       <FlexCenter gap={12}>
         <SAvatarWrapper>
           <SAvatar source={{ uri: staff?.avatar || '' }} />
         </SAvatarWrapper>
         <View style={{
           gap: 4
         }}>
           <STextBold>{staff?.fullName}</STextBold>
           <SPhoneNumber>{staff?.phoneNumber}</SPhoneNumber>
         </View>
       </FlexCenter>
       <SCheckBoxWrapper>
         {id === staffId ? <SChecked/> : null}
       </SCheckBoxWrapper>
     </FlexSpaceBetween>
   </TouchableOpacity>
  );
});
