import { observer } from "mobx-react";
import { useEffect } from "react";
import { RadialChart, RadarChart } from "react-vis";
import chartsStore from "stores/charts";

const TargetChart = () => {
  useEffect(() => {
    chartsStore.loadChartTarget();
  }, []);
  return <RadialChart data={chartsStore.target} width={300} height={300} showLabels />;
};

export default observer(TargetChart);
