import {
  ApiQuery,
  SignInResponseData,
  SignInRequestData,
  SignOutResponseData,
  SignUpResponseData,
  SignUpRequestData,
  UserAuthInfoResponse,
} from "core/types/api";
import myaxios from "../axios";

export const signIn: ApiQuery<SignInRequestData, SignInResponseData> = (data) => myaxios.post(`/auth/signin`, data);
export const signUp: ApiQuery<SignUpRequestData, SignUpResponseData> = (data) => myaxios.post(`/auth/signup`, data);
export const signOut: ApiQuery<void, SignOutResponseData> = () => myaxios.post(`/auth/signout`);
export const getMe: ApiQuery<undefined, UserAuthInfoResponse> = () => myaxios.get(`/auth/me`);

const authApi = {
  signIn,
  signUp,
  signOut,
  getMe,
};
export default authApi;
