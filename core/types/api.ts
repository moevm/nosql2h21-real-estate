import { Advertisement, AdvTargetType, FinishingType, House, Reply, Tag, User } from "core/models";
import { NextApiRequest, NextApiResponse } from "next";
import * as mongoose from "mongoose";

export type ApiQuery<Req, Res extends ResponseData<any>> = (data: Req) => Promise<Res>;
export type ApiQueryWithPagintaion<Req extends RequestDataWithPagintaion, Res extends ResponseDataWithPagintaion> = (
  data: Req,
) => Promise<Res>;

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
export type AdvListFilters = {
  title?: string;
  target?: AdvTargetType;
  finishing?: FinishingType;
  price: { max?: number; min?: number };
  size: { max?: number; min?: number };
  countBathrooms: { max?: number; min?: number };
  rating: { max?: number; min?: number };
  ownerRating: { max?: number; min?: number };
  hasBalcony?: boolean;
};

export type AdvListRequestData = RequestDataWithPagintaion<AdvListFilters>;
export type AdvListResponseData = ResponseDataWithPagintaion<Advertisement[]>;
// House current
export type HouseReadRequestData = RequestData<{ id: string }>;
export type HouseReadResponseData = ResponseData<House | null>;
// House list
export type HouseListRequestData = RequestDataWithPagintaion<{}>;
export type HouseListResponseData = ResponseDataWithPagintaion<House[]>;
// General
export type LoggedInRequestData = {};

// charts

export type TargetChartRequestData = RequestData<AdvListFilters>;
export type TargetChartResponseData = ResponseData<RadialChartElemet[]>;
export type FinishingChartRequestData = RequestData<AdvListFilters>;
export type FinishingChartResponseData = ResponseData<RadialChartElemet[]>;
export type PriceCountChartRequestData = RequestData<AdvListFilters>;
export type PriceCountChartResponseData = ResponseData<XYPlotElemet[]>;
export type PriceSizeChartRequestData = RequestData<AdvListFilters>;
export type PriceSizeChartResponseData = ResponseData<XYPlotElemet[]>;
export type HouseTypeChartRequestData = RequestData<AdvListFilters>;
export type HouseTypeChartResponseData = ResponseData<XYPlotElemet[]>;
// // User one
// export type UserRequestData = { id: string };
// export type UserResponseData = Response<User | null>;
// User list
// export type UserListRequestData = {};
// export type UserListResponseData = Response<User[]>;
// Adv one
export type AdvCreateRequestData = {
  title: Advertisement["title"];
  price: Advertisement["price"];
  house: mongoose.Types.ObjectId;
  target: Advertisement["target"];
  tags: string[];
};
// export type AdvResponseData = ResponseData<Advertisement | null>;
// Adv list
// export type AdvListRequestData = {};
// export type AdvListResponseData = Response<Advertisement[]>;
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
// export type HouseResponseData = Response<House | null>;
// House list
// export type HouseListRequestData = {};
// export type HouseListResponseData = Response<House[]>;
// Tag list
export type TagListRequestData = {};
export type TagListResponseData = ResponseData<Tag[]>;
// Reply one
export type ReplyRequestData = { id: string };
export type ReplyResponseData = ResponseData<Reply | { house: string } | null>;
// Reply list
export type ReplyListRequestData = {};
export type ReplyListResponseData = ResponseData<Reply[]>;

// Errors msgs
export enum ErrorMessagesTypes {
  err404 = "404",
  err401 = "401",
  // TODO: ...
}

export type PaginatedAgregateResponse<T> = { data: T[]; totalRecords: [{ total: number }] };

export type RadialChartElemet = { angle: number; label: string; color?: string };
export type XYPlotElemet = { x: number; y: number };
