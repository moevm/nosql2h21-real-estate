import { Advertisement, House, User } from "core/models";
import { NextApiRequest, NextApiResponse } from "next";

export type ApiQuery<Req, Res extends ResponseData<any>> = (data: Req) => Promise<Res>;

export type SuccessResponse<T> = {
  success: true;
  data: T;
};
export type ErrorResponse = {
  success: false;
  error: string;
};

export type ServerApiHandler<Req, Res, Q extends Record<string, string> = {}> = (
  req: Omit<NextApiRequest, "body"> & { body: Req; query: Q },
  res: NextApiResponse<Res>,
) => Promise<any>;
export type ServerApiHandlerWithUser<Req, Res, Q extends Record<string, string> = {}> = (
  req: Omit<NextApiRequest, "body"> & { body: Req; query: Q },
  res: NextApiResponse<Res>,
  user: User,
) => Promise<any>;

export type ResponseData<T extends any = {}> = SuccessResponse<T> | ErrorResponse;
export type ResponseDataWithPagintaion<T extends any = {}> =
  | SuccessResponse<{ data: T; page: number; limit: number; total: number }>
  | ErrorResponse;

export type RequestData<T extends any = {}> = T;
export type RequestDataWithPagintaion<T extends any = {}> = RequestData<{
  data: T;
  page: number;
  limit: number;
}>;

export type UserAuthInfoResponse = ResponseData<User>;

export type SignInRequestData = {
  email: User["email"];
  password: User["password"];
};
export type SignInResponseData = ResponseData<User>;

export type SignUpRequestData = {
  firstName: User["firstName"];
  lastName: User["lastName"];
  email: User["email"];
  password: User["password"];
};
export type SignUpResponseData = ResponseData<User>;

export type SignOutResponseData = ResponseData<null>;

export type UserCreateRequestData = RequestData<User>;
export type UserCreateResponseData = ResponseData<User>;

export type UserReadRequestData = RequestData<{}>;
export type UserReadResponseData = ResponseData<User>;

export type UserUpdateRequestData = RequestData<User>;
export type UserUpdateResponseData = ResponseData<User>;

// User current
export type UserRequestData = RequestData<{ id: string }>;
export type UserResponseData = ResponseData<User | null>;
// User list
export type UserListRequestData = RequestDataWithPagintaion<{}>;
export type UserListResponseData = ResponseDataWithPagintaion<User[]>;
// Adv current
export type AdvReadRequestData = RequestData<{ id: string }>;
export type AdvReadResponseData = ResponseData<Advertisement | null>;
// Adv list
export type AdvListRequestData = RequestDataWithPagintaion<{}>;
export type AdvListResponseData = ResponseDataWithPagintaion<Advertisement[]>;
// House current
export type HouseRequestData = RequestData<{ id: string }>;
export type HouseResponseData = ResponseData<House | null>;
// House list
export type HouseListRequestData = RequestDataWithPagintaion<{}>;
export type HouseListResponseData = ResponseDataWithPagintaion<House[]>;

// Errors msgs
export enum ErrorMessagesTypes {
  err404 = "404",
  err401 = "401",
  // TODO: ...
}
