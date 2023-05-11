import { TradesAggregation } from "../hooks/useTradeEvents";

export const mapEventsToChartData = (events: TradesAggregation[]) => {
  return (canvas: any) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: events.map((event) => new Date(event?.timestamp?.avg).toLocaleTimeString()),
      datasets: [
        {
          label: (events[0]?.symbol || "").includes('BINANCE') ? events[0]?.symbol?.split(':')[1] : events[0]?.symbol,
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: events.map((event) => event?.price?.avg > 1 ? event?.price?.avg.toPrecision(2) : event?.price?.avg)
        }
      ]
    };
  }
}

export const mapEventsToBarChartData = (events: { [key: string]: number }) => {
  return  (canvas) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
    gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
    gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

    return {
      labels: Object.keys(events).map((key) => key.split(':').at(-1)),
      datasets: [
        {
          label: "Trades",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: "#d048b6",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: Object.values(events) || []
        }
      ]
    };
  }
}

export const mapEventsToTradedVolume = (events: TradesAggregation[]) => {
  return (canvas: any) => {
    let ctx = canvas.getContext("2d");

    let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, "rgba(29,140,248,0.2)");
    gradientStroke.addColorStop(0.4, "rgba(29,140,248,0.0)");
    gradientStroke.addColorStop(0, "rgba(29,140,248,0)"); //blue colors

    return {
      labels: events.map((event) => new Date(event?.timestamp?.avg).toLocaleTimeString()),
      datasets: [
        {
          label: (events[0]?.symbol || "").includes('BINANCE') ? events[0]?.symbol?.split(':')[1] : events[0]?.symbol,
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: "#1f8ef1",
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: "#1f8ef1",
          pointBorderColor: "rgba(255,255,255,0)",
          pointHoverBackgroundColor: "#1f8ef1",
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: events.map((event) => event?.volume?.total > 1 ? event?.volume?.total.toFixed(2) : event?.volume?.total)
        }
      ]
    };
  }
}