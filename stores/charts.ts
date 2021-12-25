import advApi from "core/api/db/adv";
import { RadialChartElemet, XYPlotElemet } from "core/types/api";
import { makeAutoObservable } from "mobx";
import advsStore from "./advs";

class ChartsStore {
  target: RadialChartElemet[] = [];

  finishing: RadialChartElemet[] = [];

  priceCount: XYPlotElemet[] = [];

  priceSize: XYPlotElemet[] = [];

  houseType: XYPlotElemet[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadAll() {
    this.loadChartTarget();
    this.loadChartFinishing();
    this.loadChartPriceCount();
    this.loadChartPriceSize();
    this.loadChartPriceSize();
    this.loadChartHouseType();
  }

  loadChartTarget = () => {
    advApi
      .chartTarget(advsStore.filters)
      .then((res) => {
        if (res.success) this.target = res.data;
        else throw res.error;
      })
      .catch((err) => {
        console.log(`error loadChartTarget`, err);
      });
  };

  loadChartFinishing = () => {
    advApi
      .chartFinishing(advsStore.filters)
      .then((res) => {
        if (res.success) this.finishing = res.data;
        else throw res.error;
      })
      .catch((err) => {
        console.log(`error loadChartFinishing`, err);
      });
  };

  loadChartPriceCount = () => {
    advApi
      .chartPriceCount(advsStore.filters)
      .then((res) => {
        if (res.success) this.priceCount = res.data;
        else throw res.error;
      })
      .catch((err) => {
        console.log(`error loadChartPriceCount`, err);
      });
  };

  loadChartHouseType = () => {
    advApi
      .chartHouseType(advsStore.filters)
      .then((res) => {
        if (res.success) this.houseType = res.data;
        else throw res.error;
      })
      .catch((err) => {
        console.log(`error loadChartHouseType`, err);
      });
  };

  loadChartPriceSize = () => {
    // advApi
    //   .chartPriceSize()
    //   .then((res) => {
    //     if (res.success) this.priceSize = res.data;
    //     else throw res.error;
    //   })
    //   .catch((err) => {
    //     console.log(`error loadChartPriceSize`, err);
    //   });
  };
}
const chartsStore = new ChartsStore();

export default chartsStore;
