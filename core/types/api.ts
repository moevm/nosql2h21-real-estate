import { Advertisement, House, Reply, Tag, User } from "core/models";
import { NextApiRequest, NextApiResponse } from "next";
import * as mongoose from "mongoose";

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

// TODO: clean up request/response types.

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

// General
export type LoggedInRequestData = {};

// User one
export type UserRequestData = { id: string };
export type UserResponseData = Response<User | null>;
// User list
export type UserListRequestData = {};
export type UserListResponseData = Response<User[]>;
// Adv one
export type AdvRequestData = { id: string };
export type AdvCreateRequestData = {
  title: Advertisement["title"];
  price: Advertisement["price"];
  house: mongoose.Types.ObjectId;
  target: Advertisement["target"];
  tags: string[];
};
export type AdvResponseData = Response<Advertisement | null>;
// Adv list
export type AdvListRequestData = {};
export type AdvListResponseData = Response<Advertisement[]>;
// House one
export type HouseRequestData = { id: string };
export type HouseCreateRequestData = {
  address: House["address"];
  photo: House["photo"];
  description: House["description"];
  type: House["type"];
  size: House["size"];
  hasBalcony: House["hasBalcony"];
  countBathrooms: House["countBathrooms"];
  countRoom: House["countRoom"];
  year: House["year"];
  finishing: House["finishing"];
};
export type HouseResponseData = Response<House | null>;
// House list
export type HouseListRequestData = {};
export type HouseListResponseData = Response<House[]>;
// Tag list
export type TagListRequestData = {};
export type TagListResponseData = Response<Tag[]>;
// Reply one
export type ReplyRequestData = { id: string };
export type ReplyResponseData = Response<Reply | { house: string } | null>;
// Reply list
export type ReplyListRequestData = {};
export type ReplyListResponseData = Response<Reply[]>;

// Errors msgs
export enum ErrorMessagesTypes {
  err404 = "404",
  err401 = "401",
  // TODO: ...
}
