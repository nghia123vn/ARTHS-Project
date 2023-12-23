import React, { useCallback, useMemo } from "react";
import { memoForwardRef } from "@/utils/functions";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { IC_CLOSE } from "@/assets";
import { SDefaultTabView, TabViewItem } from "@/components/Tabs/TabView";

interface FilterBottomSheetProps {

}

export const FilterBottomSheet = memoForwardRef(function FilterBottomSheet(props: FilterBottomSheetProps, ref: React.RefObject<BottomSheetModal>) {
  // variables
  const snapPoints = useMemo(() => ["50%"], []);

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
  const onChangeTab = (val: any) => {
  };
  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      keyboardBlurBehavior={"restore"}
      android_keyboardInputMode={"adjustPan"}
      backdropComponent={renderBackdrop}
    >
      <View style={styles.contentContainer}>
        <SHeader>
          <STitle>Lọc & sắp xếp</STitle>
          <TouchableOpacity onPress={()=>{
            ref.current?.dismiss();
          }}>
            <SIcon source={IC_CLOSE} />
          </TouchableOpacity>
        </SHeader>
        <SDefaultTabView locked={true} onChangeTab={onChangeTab}>
          <TabViewItem tabLabel={"Lọc"}>
            <SRowSection>
              <STitle>Dầu nhớt</STitle>
              <SCheckBox source={{uri:''}}/>
            </SRowSection>
            <SRowSection>
              <STitle>Đồ chơi xe máy</STitle>
              <SCheckBox source={{uri:''}}/>
            </SRowSection>
            <SRowSection>
              <STitle>Phụ kiện thay thế</STitle>
              <SCheckBox source={{uri:''}}/>
            </SRowSection>
            <SRowSection>
              <STitle>Vỏ xe máy</STitle>
              <SCheckBox source={{uri:''}}/>
            </SRowSection>
          </TabViewItem>
          <TabViewItem tabLabel={"Sắp xếp"}>
            <SRowSection>
              <STitle>Tên (A-Z)</STitle>
              <SRoundCheckBox source={{uri:''}}/>
            </SRowSection>
            <SRowSection>
              <STitle>Tên (Z-A)</STitle>
              <SRoundCheckBox source={{uri:''}}/>
            </SRowSection>
            <SRowSection>
              <STitle>Giá (Cao-Thấp)</STitle>
              <SRoundCheckBox source={{uri:''}}/>
            </SRowSection>
            <SRowSection>
              <STitle>Giá (Thấp-Cao)</STitle>
              <SRoundCheckBox source={{uri:''}}/>
            </SRowSection>
          </TabViewItem>
        </SDefaultTabView>
        <SRowSection>
          <SButtonOutlined>
            <STitle>Cài lại</STitle>
          </SButtonOutlined>
          <SButtonPrimary>
            <STitle style={{
              color:'#fff'
            }}>Áp dụng</STitle>
          </SButtonPrimary>
        </SRowSection>
      </View>
    </BottomSheetModal>
  );
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey"

  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 24
  }
});
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
const SHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  width: 100%;
`;
const SRowSection = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0;
  border-top-width: 1px;
  border-top-color: #E5E5E5;
  width: 100%;
`;
const SCheckBox = styled.Image`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 1px solid #C4C5C4;
`;
const SRoundCheckBox = styled(SCheckBox)`
border-radius: 12px;
`
const SButtonOutlined = styled.TouchableOpacity`
  display: flex;
  width: 48%;
  padding: 15px 0;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid  #0C1A30;
  background: #FFF;
`

const SButtonPrimary = styled(SButtonOutlined)`
background-color: #BD3505;
  border: none;
`
