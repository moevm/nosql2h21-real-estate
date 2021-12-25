import { Typography } from "@mui/material";
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import {
  HorizontalGridLines,
  LineSeries,
  RadialChart,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis";
import chartsStore from "stores/charts";
import CustomAxisLabel from "./CustomAxisLabel.js";

const AdvGraphs: React.FC = () => {
  useEffect(() => {
    chartsStore.loadChartTarget();
    chartsStore.loadChartFinishing();
    chartsStore.loadChartPriceCount();
    chartsStore.loadChartPriceSize();
  }, []);

  return (
    <div>
      <Typography>Тип(круг)</Typography>
      <RadialChart data={chartsStore.target} width={300} height={300} showLabels colorType="literal" />
      <Typography>Ремонт(круг)</Typography>
      <RadialChart data={chartsStore.finishing} width={300} height={300} showLabels colorType="literal" />
      <Typography>Цена(линейный)</Typography>
      <XYPlot width={600} height={300} stackBy="y">
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis left={0} />
        <CustomAxisLabel title="Цена объявления" xAxis />
        <CustomAxisLabel title="Количество объявлений" />
        <VerticalBarSeries data={chartsStore.priceCount} barWidth={0.5} />
      </XYPlot>
      <Typography>Площадь(линейный)</Typography>
      <XYPlot width={600} height={300} stackBy="y">
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis />
        <YAxis left={0} />
        <CustomAxisLabel title="Цена объявления" xAxis />
        <CustomAxisLabel title="Количество объявлений" />
        {/* <VerticalBarSeries data={chartsStore.priceSize} barWidth={0.5} /> */}
        <LineSeries data={chartsStore.priceSize} />
        {/* <LineSeries data={chartsStore.priceSize} /> */}
      </XYPlot>
    </div>
  );
};

export default observer(AdvGraphs);
