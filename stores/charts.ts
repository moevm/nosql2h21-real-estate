import advApi from "core/api/db/adv";
import { RadialChartElemet, XYPlotElemet } from "core/types/api";
import { makeAutoObservable } from "mobx";

class ChartsStore {
  target: RadialChartElemet[] = [];

  finishing: RadialChartElemet[] = [];

  priceCount: XYPlotElemet[] = [];

  priceSize: XYPlotElemet[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  loadChartTarget = () => {
    advApi
      .chartTarget()
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
      .chartFinishing()
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
      .chartPriceCount()
      .then((res) => {
        if (res.success) this.priceCount = res.data;
        else throw res.error;
      })
      .catch((err) => {
        console.log(`error loadChartPriceCount`, err);
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
