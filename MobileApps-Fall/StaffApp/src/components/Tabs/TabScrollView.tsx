import React, {memo} from 'react';
import {
  ScrollView,
  ScrollViewProps,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import { BaseRefreshControl } from "@/components/Common/BaseRefreshControl";
interface Props extends Partial<ScrollViewProps> {
  refreshing: boolean;
  onRefresh?: () => void;
  children: React.ReactNode | React.ReactNode[];
}

export const TabScrollView = memo(function TabScrollView(props: Props) {
  const {children, refreshing, onRefresh, ...restProps} = props;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.contentContainerStyle}
      keyboardShouldPersistTaps="handled"
      refreshControl={
        <BaseRefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      {...restProps}>
      {children}
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: 0,
    flexGrow: 1,
  },
});
