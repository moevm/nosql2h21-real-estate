import { User } from "core/models";

export type ApiRequest<Req, Res extends Response<any>> = (data?: Req) => Promise<Res>;
export type SuccessResponse<T> = {
  success: true;
  data: T;
};
export type ErrorResponse = {
  success: false;
  error: string;
};

export type Response<T> = SuccessResponse<T> | ErrorResponse;

export type UserAuthInfoResponse = Response<User>;

export type SignInResquestData = {
  email: User["email"];
  password: User["password"];
};
export type SignInResponseData = Response<User>;

export type SignUpResquestData = {
  firstName: User["firstName"];
  lastName: User["lastName"];
  email: User["email"];
  password: User["password"];
};
export type SignUpResponseData = Response<User>;

export type SignOutResponseData = Response<null>;

export type UserCreateResquestData = User;

export type UserCreateResponseData = Response<User>;
export type UserReadResquestData = {};

export type UserReadResponseData = Response<User>;
export type UserUpdateResquestData = User;

export type UserUpdateResponseData = Response<User>;
export type UserListResquestData = {};

export type UserListResponseData = Response<User[]>;
