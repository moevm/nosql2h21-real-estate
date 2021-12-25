import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from "@mui/material";
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
import s from "./styles.module.scss";

const AdvGraphs: React.FC = () => {
  useEffect(() => {
    chartsStore.loadAll();
  }, []);

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Тип(круг)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container justifyContent="center">
            <RadialChart
              className={s.chart}
              data={chartsStore.target}
              width={300}
              height={300}
              showLabels
              colorType="literal"
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Тип дома(круг)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container justifyContent="center">
            <RadialChart
              className={s.chart}
              data={chartsStore.houseType}
              width={300}
              height={300}
              showLabels
              colorType="literal"
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Ремонт(круг)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container justifyContent="center">
            <RadialChart
              className={s.chart}
              data={chartsStore.finishing}
              width={300}
              height={300}
              showLabels
              colorType="literal"
            />
          </Grid>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
          <Typography>Цена(линейный)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container justifyContent="center">
            <XYPlot width={600} height={400} stackBy="y" className={s.chart}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis left={0} />
              <CustomAxisLabel title="Цена (т.р.)" xAxis />
              <CustomAxisLabel title="Количество объявлений" />
              <VerticalBarSeries data={chartsStore.priceCount} barWidth={0.5} />
            </XYPlot>
          </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default observer(AdvGraphs);
