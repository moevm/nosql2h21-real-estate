import myaxios from "core/api/axios";
import {
  HouseReadRequestData,
  HouseReadResponseData,
  HouseListRequestData,
  HouseListResponseData,
  ApiQuery,
} from "core/types/api";

const readMy: ApiQuery<HouseListRequestData, HouseListResponseData> = (data) => myaxios.get(`/houses/my`, data);
const read: ApiQuery<HouseReadRequestData, HouseReadResponseData> = (data) => myaxios.get(`/houses/${data.id}`);
const list: ApiQuery<HouseListRequestData, HouseListResponseData> = (data) => myaxios.post(`/houses`, data);
const houseApi = { read, list, readMy };

export default houseApi;
