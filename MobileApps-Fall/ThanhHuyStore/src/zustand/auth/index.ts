import createZ from 'zustand';
import {EAuthEvent, EAuthStage} from './types';

interface IAuthStore {
  authStage: EAuthStage;
  authEvent: EAuthEvent;
  setAuthStage: (value: EAuthStage) => void;
  setAuthEvent: (value: EAuthEvent) => void;
  resetAuth: () => void;
}

export const useAuthStore = createZ<IAuthStore>(set => ({
  authStage: EAuthStage.INITIAL,
  authEvent: EAuthEvent.START_CHECK,
  setAuthStage: value => {
    set(prev => ({
      ...prev,
      authStage: value,
    }));
  },
  setAuthEvent: value => {
    set(prev => ({
      ...prev,
      authEvent: value,
    }));
  },
  resetAuth: () => {
    set(prev => ({
      ...prev,
      authStage: EAuthStage.INITIAL,
      authEvent: EAuthEvent.START_CHECK,
    }));
  },
}));

export const setAuthStage = useAuthStore.getState().setAuthStage;
export const setAuthEvent = useAuthStore.getState().setAuthEvent;
export const resetAuth = useAuthStore.getState().resetAuth;

