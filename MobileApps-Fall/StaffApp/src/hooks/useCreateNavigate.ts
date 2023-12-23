import { useCallback } from "react";
import { StackActions, useNavigation } from "@react-navigation/native";

export const useCreateNavigate = <T extends object>(screenName: string) => {
  const navigation = useNavigation<any>();
  return useCallback(
    (params?: T) => navigation.navigate(screenName, params),
    []
  );
};
export const usePushNavigate = <T extends object>(screenName: string) => {
  const navigation = useNavigation<any>();
  return useCallback(
    (params?: T) => navigation.dispatch(
      StackActions.push(screenName, params),
    ),
    []
  );
};