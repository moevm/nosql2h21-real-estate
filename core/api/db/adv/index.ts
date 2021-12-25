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
  HouseTypeChartRequestData,
  HouseTypeChartResponseData,
} from "core/types/api";

const read: ApiQuery<AdvReadRequestData, AdvReadResponseData> = (data) => myaxios.get(`/advs/${data.id}`);
const list: ApiQuery<AdvListRequestData, AdvListResponseData> = (data) => myaxios.post(`/advs`, data);
const chartTarget: ApiQuery<TargetChartRequestData, TargetChartResponseData> = (data) =>
  myaxios.post(`/advs/charts/target`, data);
const chartFinishing: ApiQuery<FinishingChartRequestData, FinishingChartResponseData> = (data) =>
  myaxios.post(`/advs/charts/finishing`, data);
const chartPriceCount: ApiQuery<PriceCountChartRequestData, PriceCountChartResponseData> = (data) =>
  myaxios.post(`/advs/charts/price-count-xy`, data);
const chartPriceSize: ApiQuery<PriceSizeChartRequestData, PriceSizeChartResponseData> = (data) =>
  myaxios.post(`/advs/charts/price-size-xy`, data);
const chartHouseType: ApiQuery<HouseTypeChartRequestData, HouseTypeChartResponseData> = (data) =>
  myaxios.post(`/advs/charts/housetype`, data);

const advApi = { read, list, chartTarget, chartFinishing, chartPriceCount, chartPriceSize, chartHouseType };

export default advApi;
