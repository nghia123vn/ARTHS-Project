

export interface ILogin {
  client: {
    client_id: string;
    user_id: string;
    system_id: string;
    access_token: string;
    refresh_token: string;
    expired: string;
  };
  // viewer: IUser;
  // people: IUser[];
  // system: ISystem;
  // user_groups: IUserGroup[];
}

export enum EAuthStage {
  INITIAL = 'INITIAL',
  UNSIGNED = 'UNSIGNED',
  SIGNED = 'SIGNED',
  CHECKING = 'CHECKING',
  ERROR = 'ERROR',
  EXPIRED = 'EXPIRED',
}

export enum EAuthEvent {
  LOGGED_OUT = 'LOGGED_OUT',
  LOGGED_IN_OTHER = 'LOGGED_IN_OTHER',
  LOGGED_IN = 'LOGGED_IN',
  TOKEN_EXPIRED = 'TOKEN_EXPIRED',
  START_CHECK = 'START_CHECK',
}
