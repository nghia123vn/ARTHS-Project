import React, { memo, useEffect } from "react";
import styled from "styled-components/native";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { FlatList, View } from "react-native";
import { Fonts } from "@/theme/Fonts";
import { useProductByQuery } from "@/store/product";
import { EmptyView } from "@/components/EmptyView";
import { AnimatedBottomSpace } from "@/components/AnimatedBottomSpace";
import { CustomHeader } from "@/components/CustomHeader";
import { ServiceThumbnail } from "@/components/ServiceThumbnail";
import { requestListService } from "@/store/service/function";
import { useServiceByQuery } from "@/store/service";


export const ServicesScreen = memo(function ServicesScreen() {
  const listServices = useServiceByQuery("all");

  const syncData = async () => {
    await requestListService();
  };

  useEffect(() => {
    syncData().then();
  }, []);

  return (
    <FullScreenWrapper>
      <CustomHeader isBack title={"Dịch vụ"} />
      <SContainer>
        <FlatList data={[...listServices]} numColumns={2}
                  columnWrapperStyle={{
                    gap: 12
                  }}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{
                    gap: 12
                  }}
                  ListHeaderComponent={
                    <View style={{
                      gap: 20
                    }}>
                      <STextNormal>Các dịch vụ nổi bật</STextNormal>
                    </View>}
                  renderItem={({ item }) => <ServiceThumbnail id={item} />}
                  ListEmptyComponent={<EmptyView title="Không tìm thấy dịch vụ nào" />}
        />
        <AnimatedBottomSpace />
      </SContainer>
    </FullScreenWrapper>
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
  font-family: ${Fonts.Medium};
  font-size: 16px;
  line-height: 25px;
  letter-spacing: 0.061px;
`;

