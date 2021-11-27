import myaxios from "core/api/axios";
import { AdvReadRequestData, AdvReadResponseData, AdvListRequestData, AdvListResponseData, ApiQuery } from "core/types/api";

const read: ApiQuery<AdvReadRequestData, AdvReadResponseData> = (data) => myaxios.get(`/advs/${data.id}`);
const list: ApiQuery<AdvListRequestData, AdvListResponseData> = (data) => myaxios.post(`/advs`, data);
const advApi = { read, list };

export default advApi;
