import React, { memo, useEffect, useMemo } from "react";
import { CustomDropDown } from "@/components/CustomDropDown";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { TextInput } from "react-native";
import { apiProvinces } from "@/assets/address/vietnam-provinces";


export const SelectAddress = memo(function SelectAddress(
  { setValue, defaultValue }: {
    defaultValue?: {
      province: string,
      district: string,
      ward: string,
      addressDetail: string
    }
    setValue: (keyName: string, value: string) => void
  }
) {
  const [province, setProvince] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [ward, setWard] = React.useState("");
  const [addressDetail, setAddressDetail] = React.useState("");

  const listProvince = useMemo(() => {
    return apiProvinces.map(item => item.name);
  }, []);
  const listDistrict = useMemo(() => {
    return apiProvinces.find(item => item.name === province)?.districts.map(item => item.name);
  }, [province]);
  const listWard = useMemo(() => {
    return apiProvinces.find(item => item.name === province)?.districts.find(item => item.name === district)?.wards.map(item => item.name);
  }, [district]);
  useEffect(() => {
    if (defaultValue) {
      setProvince(defaultValue.province);
      setDistrict(defaultValue.district);
      setWard(defaultValue.ward);
      setAddressDetail(defaultValue.addressDetail);
    }
  }, [defaultValue]);
  return (
    <>
      <STextNormal>Tỉnh thành</STextNormal>
      <CustomDropDown defaultValue={defaultValue?.province} title={"Chọn tỉnh thành"} onSelect={(item, index) => {
        setValue("province", item);
        setProvince(item);
      }} options={listProvince} />
      <STextNormal>Quận huyện</STextNormal>
      <CustomDropDown title={"Chọn quận huyện"} defaultValue={defaultValue?.district} onSelect={(item, index) => {
        setValue("district", item);
        setDistrict(item);
      }} options={listDistrict || []} />
      <STextNormal>Phường xã</STextNormal>
      <CustomDropDown title={"Chọn phường xã"} defaultValue={defaultValue?.ward} onSelect={(item, index) => {
        setValue("ward", item);
        setWard(item);
      }} options={listWard || []} />
      <STextNormal>Địa chỉ cụ thể (số nhà, đường)</STextNormal>
      <TextInput placeholder={"Nhập địa chỉ cụ thể"} defaultValue={defaultValue?.addressDetail} value={addressDetail} onChangeText={(value) => {
        setValue("address", value);
        setAddressDetail(value);
      }} style={{
        borderWidth: 1,
        borderColor: "#EBEBEB",
        paddingHorizontal: 12,
        borderRadius: 8
      }} />
    </>
  );
});
const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Regular};
  font-size: 14px;
`;
