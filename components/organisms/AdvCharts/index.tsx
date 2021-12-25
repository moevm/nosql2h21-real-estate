import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
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
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Тип(круг)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadialChart data={chartsStore.target} width={300} height={300} showLabels colorType="literal" />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Ремонт(круг)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <RadialChart data={chartsStore.finishing} width={300} height={300} showLabels colorType="literal" />
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Цена(линейный)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <XYPlot width={600} height={300} stackBy="y">
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis left={0} />
            <CustomAxisLabel title="Цена (т.р.)" xAxis />
            <CustomAxisLabel title="Количество объявлений" />
            <VerticalBarSeries data={chartsStore.priceCount} barWidth={0.5} />
          </XYPlot>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default observer(AdvGraphs);
