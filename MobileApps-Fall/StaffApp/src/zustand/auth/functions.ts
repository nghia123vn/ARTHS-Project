// import { DeviceInfo } from "../../services/DeviceInfo";
// import { SECRET_AUTH_KEY } from "@env";
// import { Fetch } from "../../services/Fetch";
// import md5 from "md5";
// import { Core } from "../../services/Core";
// import { BasicProjectSInfo } from "../../services";
// import { ILogin, resetAllStore } from "../index";
// import { authBatch } from "./utils";
// import { wait } from "../../utils/wait";
//
// export const createClient = async (params: {
//   email: string;
//   password: string;
//   "catpcha-version": string;
//   recaptcha_response: string;
//   "v3-failsafe"?: number;
// }) => {
//   const { os, id, name } = DeviceInfo;
//   const ts = Math.floor(new Date().valueOf() / 1000);
//   await wait(100);
//   const AuthKey = SECRET_AUTH_KEY;
//   const text = `${os}&${id}&${ts}&${AuthKey}`;
//
//   const { data } = await Fetch.simplePost<{
//     client: {
//       client_key: string;
//       client_secret: string;
//     };
//   }>("@login/mobile/create.client", {
//     device_os: os,
//     device_name: name,
//     device_signature: id,
//     content: `${name} with ${os} is request client key at ${ts}`,
//     authentic: md5(text),
//     ts,
//   });
//   if (data?.client) {
//     resetAllStore();
//     Core.reset();
//     Core.clientKey = data.client?.client_key;
//     Core.clientSecret = data.client?.client_secret;
//     await manualLogin(params);
//   }
// };
//
// export const manualLogin = async (params: {
//   email: string;
//   password: string;
//   "catpcha-version": string;
//   recaptcha_response: string;
//   "g-recaptcha-response"?: string;
//   "v3-failsafe"?: number;
// }) => {
//   const app_version = DeviceInfo.appVersion;
//   const { data } = await Fetch.postWithToken<ILogin>(
//     "@login/ajax/mobile/login",
//     {
//       app_version,
//       ...params,
//     }
//   );
//
//   if (data) {
//     authBatch(data);
//
//     Core.accessToken = data.client.access_token;
//
//     // set client_key, access_token, client_secret into Sensitive info
//     await BasicProjectSInfo.setItem((prev) => ({
//       ...prev,
//       currentEmail: params.email,
//       allEmails: [...new Set([...(prev?.allEmails || []), params.email])],
//       byEmail: {
//         ...prev.byEmail,
//         [params.email]: {
//           ...(prev?.byEmail?.[params.email] || {}),
//           client_key: Core.clientKey,
//           client_secret: Core.clientSecret,
//           access_token: data?.client.access_token,
//         },
//       },
//     }));
//   }
// };
//
// export const autoLogin = async (param: {
//   access_token: string;
//   client_key: string;
// }) => {
//   const { data } = await Fetch.postWithToken<ILogin>("@login/ajax/mobile/me", {
//     ...param,
//   });
//   authBatch(data);
// };
//
// export const logout = async () => {
//   await BasicProjectSInfo.setItem((prev) => {
//     let currentEmail = prev.currentEmail;
//     let newByEmail = { ...prev.byEmail };
//     let newAllEmails = [...prev.allEmails];
//
//     delete newByEmail?.[currentEmail];
//     newAllEmails = newAllEmails.filter((email) => email !== currentEmail);
//
//     let newEmail = newAllEmails.length
//       ? newAllEmails[newAllEmails.length - 1]
//       : "";
//
//     return {
//       ...prev,
//       currentEmail: newEmail,
//       byEmail: newByEmail,
//       allEmails: newAllEmails,
//     };
//   });
// };
//
// export const logoutEmail = (email: string) => {
//   return BasicProjectSInfo.setItem((prev) => {
//     let newByEmail = { ...prev.byEmail };
//     let newAllEmails = [...prev.allEmails];
//
//     delete newByEmail?.[email];
//     newAllEmails = newAllEmails.filter((_email) => _email !== email);
//     return {
//       ...prev,
//       byEmail: newByEmail,
//       allEmails: newAllEmails,
//     };
//   });
// };
//
// export const changeAcc = async (email: string) => {
//   const _currentEmail = BasicProjectSInfo.data.currentEmail;
//   if (_currentEmail !== email) {
//     await BasicProjectSInfo.setItem((prev) => ({
//       ...prev,
//       currentEmail: email,
//       allEmails: [...new Set([...prev.allEmails, email])],
//     }));
//   }
// };
