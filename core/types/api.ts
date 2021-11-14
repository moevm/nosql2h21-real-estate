import { Advertisement, House, User } from "core/models";
import { NextApiRequest, NextApiResponse } from "next";

export type ApiRequest<Req, Res extends Response<any>> = (data?: Req) => Promise<Res>;
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

export type Response<T extends any = {}> = SuccessResponse<T> | ErrorResponse;

export type UserAuthInfoResponse = Response<User>;

export type SignInRequestData = {
  email: User["email"];
  password: User["password"];
};
export type SignInResponseData = Response<User>;

export type SignUpRequestData = {
  firstName: User["firstName"];
  lastName: User["lastName"];
  email: User["email"];
  password: User["password"];
};
export type SignUpResponseData = Response<User>;

export type SignOutResponseData = Response<null>;

export type UserCreateRequestData = User;
export type UserCreateResponseData = Response<User>;

export type UserReadRequestData = {};
export type UserReadResponseData = Response<User>;

export type UserUpdateRequestData = User;
export type UserUpdateResponseData = Response<User>;

// User current
export type UserRequestData = { id: string };
export type UserResponseData = Response<User | null>;
// User list
export type UserListRequestData = {};
export type UserListResponseData = Response<User[]>;
// Adv current
export type AdvRequestData = { id: string };
export type AdvResponseData = Response<Advertisement | null>;
// Adv list
export type AdvListRequestData = {};
export type AdvListResponseData = Response<Advertisement[]>;
// House current
export type HouseRequestData = { id: string };
export type HouseResponseData = Response<House | null>;
// House list
export type HouseListRequestData = {};
export type HouseListResponseData = Response<House[]>;

// Errors msgs
export enum ErrorMessagesTypes {
  err404 = "404",
  err401 = "401",
  // TODO: ...
}
