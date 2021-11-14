import {
  ApiRequest,
  SignInResponseData,
  SignInRequestData,
  SignOutResponseData,
  SignUpResponseData,
  SignUpRequestData,
  UserAuthInfoResponse,
} from "core/types/api";
import myaxios from "../axios";

export const signIn: ApiRequest<SignInRequestData, SignInResponseData> = (data) => myaxios.post(`/api/auth/signin`, data);
export const signUp: ApiRequest<SignUpRequestData, SignUpResponseData> = (data) => myaxios.post(`/api/auth/signup`, data);
export const signOut: ApiRequest<void, SignOutResponseData> = () => myaxios.post(`/api/auth/signout`);
export const getMe: ApiRequest<undefined, UserAuthInfoResponse> = () => myaxios.get(`/api/auth/me`);

const authApi = {
  signIn,
  signUp,
  signOut,
  getMe,
};
export default authApi;
