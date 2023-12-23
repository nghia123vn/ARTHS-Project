import React, { memo, useCallback, useEffect, useState } from "react";
import { FullScreenWrapper } from "@/components/ScreenWrap";
import { CustomHeader } from "@/components/CustomHeader";
import { FlatList, RefreshControl, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { Fonts } from "@/theme/Fonts";
import { useNotification, useNotificationByQuery } from "@/store/notifications";
import moment from "moment";
import { EmptyView } from "@/components/EmptyView";
import {
  markedAllNoti,
  putNotification,
  requestDeleteNoti, requestLoadMoreNoti,
  requestNotifications
} from "@/store/notifications/function";
import { navigateToBookingScreen, navigateToDetailServiceScreen } from "@/utils/navigation";
import { LoadingModal } from "@/components/LoadingModal";
import useAsyncFn from "react-use/lib/useAsyncFn";
import { FlexSpaceBetween } from "@/helper/styles";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import { IC_REMOVE } from "@/assets";


const ItemNotification = memo(function ItemNotification({ id }: { id: string }) {
  const data = useNotification(id);
  const [{ loading: loadingDelete }, onDelete] = useAsyncFn(async (id: string) => {
    await requestDeleteNoti(id);
  }, [id]);

  const renderRightActions = useCallback(() => {
    return (
      <SDeleteButton style={{
        backgroundColor: "rgba(255, 63, 63, 0.38)",
        padding: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }} onPress={() => {
        onDelete(id).then();
      }}>
        <SImage source={IC_REMOVE} />
      </SDeleteButton>
    );
  }, []);

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <SContentBox onPress={async ()=>{
        await putNotification(data?.id || "");
        if (data?.data.link) {
          if (data?.data.type === "RepairService") {
            navigateToDetailServiceScreen({
              id: data?.data.link
            })
          }
          if (data?.data.type === "Booking") {
            navigateToBookingScreen();
          }
        }
      }}>
        <FlexSpaceBetween>
          <View>
            <STextBold>{data?.title}</STextBold>
            <STextNormal>{data?.body}</STextNormal>
            <STextBold>{moment(data?.data.createAt).format("DD-MM-YYYY")}</STextBold>
          </View>
          {data?.data.isRead ? null : <SDotNoti />}
        </FlexSpaceBetween>
        <LoadingModal isVisible={loadingDelete} />
      </SContentBox>
    </Swipeable>
  );
});
export const NotificationScreen = memo(function NotificationScreen() {
  const listNotifications = useNotificationByQuery("all");
  const [pageNumber, setPageNumber] = useState(1)
  const [refreshing, setRefreshing] = useState(false);
  const renderItem = useCallback(({ item }: any) => {
    return <ItemNotification id={item} />;
  }, []);
  useEffect(() => {
    requestNotifications().then();
  },[]);
  const [{ loading }, onMarkAll] = useAsyncFn(async () => {
    await markedAllNoti();
  }, []);

  const handleLoadMore = useCallback(async ()=>{
    setPageNumber(pageNumber + 1)
    await requestLoadMoreNoti(pageNumber + 1)
  },[pageNumber])

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      requestNotifications().then();
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <FullScreenWrapper>
      <CustomHeader isBack title={"Thông báo"} />
      <SContainer>
        {listNotifications.length > 0 ? <TouchableOpacity onPress={onMarkAll}>
          <STextBold style={{
            color: "#0d45d2",
            textAlign: "right",
            fontSize: 14
          }}>Đánh dấu tất cả là đã đọc</STextBold>
        </TouchableOpacity> : null}
        <FlatList data={listNotifications} renderItem={renderItem}
                  showsVerticalScrollIndicator={false}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                  onEndReached={handleLoadMore}
                  onEndReachedThreshold={0.5}
                  ListEmptyComponent={<EmptyView title={"Hiện tại không có thông báo nào"} />} />
      </SContainer>
      <LoadingModal isVisible={loading} />
    </FullScreenWrapper>
  );
});
const SContainer = styled.View`
  padding: 0 16px;
  gap: 12px;
`;
const SContentBox = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  border-bottom-color: #939393;
  border-bottom-width: 1px;
  background: #FFF;
  padding: 12px;
`;
const STextBold = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Bold};
  font-size: 12px;
  line-height: 20px; /* 166.667% */
`;

const STextNormal = styled.Text`
  color: #0C1A30;
  font-family: ${Fonts.Medium};
  font-size: 12px;
  line-height: 20px;
`;
const SImage = styled.Image`
  width: 24px;
  height: 24px;
`;
const SDotNoti = styled.View`
  background-color: #0d45d2;
  width: 8px;
  height: 8px;
  border-radius: 4px;
`;


const SDeleteButton = styled(RectButton)`
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
`;
