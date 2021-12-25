import myaxios from "core/api/axios";
import {
  AdvReadRequestData,
  AdvReadResponseData,
  AdvListRequestData,
  AdvListResponseData,
  ApiQuery,
  TargetChartRequestData,
  TargetChartResponseData,
  FinishingChartRequestData,
  FinishingChartResponseData,
  PriceCountChartRequestData,
  PriceCountChartResponseData,
  PriceSizeChartRequestData,
  PriceSizeChartResponseData,
} from "core/types/api";

const read: ApiQuery<AdvReadRequestData, AdvReadResponseData> = (data) => myaxios.get(`/advs/${data.id}`);
const list: ApiQuery<AdvListRequestData, AdvListResponseData> = (data) => myaxios.post(`/advs`, data);
const chartTarget: ApiQuery<TargetChartRequestData, TargetChartResponseData> = () => myaxios.get(`/advs/charts/target`);
const chartFinishing: ApiQuery<FinishingChartRequestData, FinishingChartResponseData> = () =>
  myaxios.get(`/advs/charts/finishing`);
const chartPriceCount: ApiQuery<PriceCountChartRequestData, PriceCountChartResponseData> = () =>
  myaxios.get(`/advs/charts/price-count-xy`);
const chartPriceSize: ApiQuery<PriceSizeChartRequestData, PriceSizeChartResponseData> = () =>
  myaxios.get(`/advs/charts/price-size-xy`);

const advApi = { read, list, chartTarget, chartFinishing, chartPriceCount, chartPriceSize };

export default advApi;
