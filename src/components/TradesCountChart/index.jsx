import { Line } from "react-chartjs-2";
import { mapEventsToChartData } from "services/events.mapper";

import {
  chartExample1,
} from "variables/charts";

export default function TradesCountChart({symbol, events}) {
  return (
    <div className="chart-area">
      <Line
        data={mapEventsToChartData(events)}
        options={chartExample1.options}
      />
    </div>
  );
}
