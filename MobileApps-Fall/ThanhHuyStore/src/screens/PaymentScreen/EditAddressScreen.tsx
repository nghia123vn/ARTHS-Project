import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import styled from "styled-components/native";
import { useNavigationParams } from "@/hooks";
import { CustomDropDown } from "@/components/CustomDropDown";
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { apiProvinces } from "@/assets/address/vietnam-provinces";
import { goBack } from "@/utils/navigation";
import SimpleToast from "react-native-simple-toast";
import { getAddress, setAddressQueries, syncAddress, useAddress, useAddressByQuery } from "@/store/address";
import { batch } from "react-redux";

export interface EditAddressScreenParams {
  index: number;
}

export const EditAddressScreen = memo(function EditAddressScreen() {
  const { index } = useNavigationParams<EditAddressScreenParams>();
  const addressIds = useAddressByQuery('all')
  const [address, setAddress] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    id: Date.now().toString()
  });
  const onChangeValue = useCallback((keyName: string, value: string) => {
    setAddress(prev => ({
      ...prev,
      [keyName]: value
    }));
  }, []);

  const [addressInfo, setAddressInfo] = useState<{
    province: string,
    district: string,
    ward: string,
    address: string
  }>({
    province: "",
    district: "",
    ward: "",
    address: ""
  });

  const listProvince = useMemo(() => {
    return apiProvinces.map(item => item.name);
  }, []);

  const listDistrict = useMemo(() => {
    return apiProvinces.find(item => item.name === addressInfo.province)?.districts.map(item => item.name);
  }, [addressInfo.province]);

  const listWard = useMemo(() => {
    return apiProvinces.find(item => item.name === addressInfo.province)?.districts.find(item => item.name === addressInfo.district)?.wards.map(item => item.name);
  }, [addressInfo]);

  useEffect(() => {
    const _address = addressIds[index];
    const data = getAddress(_address);
    if (_address && data) {
      setAddress({
        name: data.name,
        phoneNumber: data.phoneNumber,
        address: data.address.split(",")[0]?.trim() || "",
        id: data.id
      })
      setAddressInfo({
        province: data.address.split(",")[3]?.trim() || "",
        district: data.address.split(",")[2]?.trim() || "",
        ward: data.address.split(",")[1]?.trim() || "",
        address: data.address.split(",")[0]?.trim() || ""
      });
    }
  }, [index,addressIds]);
  const onChangeAddressInfo = useCallback((keyName: string, value: string) => {
    setAddressInfo(prev => ({
      ...prev,
      [keyName]: value
    }));
  }, []);
  const onSave = useCallback(() => {
    if (index === -1) {
      batch(()=>{
        syncAddress([{
          ...address,
          address: `${addressInfo.address}, ${addressInfo.ward}, ${addressInfo.district}, ${addressInfo.province}`
        }])
        setAddressQueries(prev=>({
          ...prev,
          ['all']:[...prev['all'],address.id]
        }))
      })
    } else {
      syncAddress([address])
    }
    goBack();
    SimpleToast.show("Tạo mới địa chỉ thành công");
  }, [index,addressInfo,address]);
  return (
    <FullScreenWrapper isGrey>
      <CustomHeader isBack title={address ? "Chỉnh sửa địa chỉ" : "Địa chỉ mới"} rightComponent={
        <TouchableOpacity onPress={onSave}>
          <STextNormal style={{
            color: "#BD3505"
          }}>Lưu lại</STextNormal>
        </TouchableOpacity>
      } />
      <KeyboardAvoidingView style={{
        flex:1
      }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <SContentContainer>
          <SInputWrapper>
            <STextNormal>Tên:</STextNormal>
            <STextInput placeholder="Nhập tên người nhận" value={address.name || ""} onChangeText={(text) => {
              onChangeValue("name", text);
            }} />
          </SInputWrapper>
          <SInputWrapper>
            <STextNormal>SĐT</STextNormal>
            <STextInput placeholder="Nhập số điện thoại" value={address.phoneNumber || ""} onChangeText={(text) => {
              onChangeValue("phoneNumber", text);
            }} />
          </SInputWrapper>
          <SInputWrapper>
            <STextNormal>Tỉnh thành</STextNormal>
            <CustomDropDown defaultValue={addressInfo.province} title={"Chọn tỉnh thành"} onSelect={(item, index) => {
              onChangeAddressInfo("province", item);
            }} options={listProvince} />
          </SInputWrapper>
          <SInputWrapper>
            <STextNormal>Quận huyện</STextNormal>
            <CustomDropDown defaultValue={addressInfo.district} title={"Chọn quận huyện"} onSelect={(item, index) => {
              onChangeAddressInfo("district", item);
            }} options={listDistrict || []} />
          </SInputWrapper>
          <SInputWrapper>
            <STextNormal>Phường xã</STextNormal>
            <CustomDropDown title={"Chọn phường xã"} defaultValue={addressInfo.ward} onSelect={(item, index) => {
              onChangeAddressInfo("ward", item);
            }} options={listWard || []} />
          </SInputWrapper>
          <SInputWrapper>
            <STextNormal>Địa chỉ cụ thể (số nhà, đường)</STextNormal>
            <TextInput placeholder={"Nhập địa chỉ cụ thể"} defaultValue={addressInfo.address} onChangeText={(value) => {
              onChangeAddressInfo("address", value);
            }} style={{
              borderWidth: 1,
              borderColor: "#EBEBEB",
              paddingHorizontal: 12,
              borderRadius: 8
            }} />
          </SInputWrapper>
        </SContentContainer>
      </ScrollView>
      </KeyboardAvoidingView>
    </FullScreenWrapper>
  );
});
const SContentContainer = styled.View`
  background-color: white;
  margin-top: 14px;
`;
const SInputWrapper = styled.View`
  padding: 10px 20px;
`;
const STextNormal = styled.Text`
  color: #0C1A30;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: 0.2px;
`;
const STextInput = styled.TextInput`
`;
