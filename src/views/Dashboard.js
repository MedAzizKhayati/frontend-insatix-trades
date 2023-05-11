import React, { useEffect } from "react";
import classNames from "classnames";
import { Line, Bar, Pie } from "react-chartjs-2";

// reactstrap components
import {
  Button,
  ButtonGroup,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import {
  getAllSymbols,
  getTodayTradesAnalytics,
} from "services/trades-aggregations.service";
import {
  mapEventsToBarChartData,
  mapEventsToTradedVolume,
} from "services/events.mapper";

// core components
import { chartExample3, chartExample4 } from "variables/charts.js";
import TradesCountChart from "components/TradesCountChart";
import { getRandomHashColor } from "utils/colors";
import useTradeEvents from "hooks/useTradeEvents";
import { useState } from "react";

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function Dashboard() {
  const [currentSymbol, setCurrentSymbol] = useState("BINANCE:BTCUSDT");
  const [symbols, setSymbols] = useState([]);
  const [todayTrades, setTodayTrades] = useState([]);
  const [numberOfTradesPerSymbol, setNumberOfTradesPerSymbol] = useState({});
  const allTradeEvents = useTradeEvents(symbols, 1000);
  const tradeEvents = allTradeEvents
    .filter((event) => event.symbol === currentSymbol)
    .slice(-50);

  useEffect(() => {
    setNumberOfTradesPerSymbol((old) => {
      const newSet = { ...old };
      if (allTradeEvents.length === 0) {
        return newSet;
      }
      allTradeEvents.forEach((e) => {
        newSet[e.symbol] = e.numberOfTrades;
      });
      return newSet;
    });
  }, [allTradeEvents]);

  useEffect(() => {
    getAllSymbols().then(setSymbols);
    getTodayTradesAnalytics().then((trades) => {
      trades.map((trade) => {
        trade.color = getRandomHashColor();
      });
      setTodayTrades(trades);
    });
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Trades</h5>
                    <CardTitle tag="h2">Live Price</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup
                      className="btn-group-toggle float-right"
                      data-toggle="buttons"
                    >
                      {symbols.map((symbol) => (
                        <Button
                          tag="label"
                          className={classNames("btn-simple", {
                            active: currentSymbol === symbol,
                          })}
                          color="info"
                          id={symbol}
                          size="sm"
                          onClick={() => setCurrentSymbol(symbol)}
                          key={symbol}
                        >
                          <span className="d-none d-sm-block d-md-block d-lg-block d-xl-block">
                            {symbol.includes(":")
                              ? symbol.split(":")[1]
                              : symbol}
                          </span>
                          <span className="d-block d-sm-none">
                            <i className="tim-icons icon-single-02" />
                          </span>
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <TradesCountChart events={tradeEvents} symbol={currentSymbol} />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">
                  Today's Analytics (Number Of Trades Per Symbol)
                </h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" />
                  N# Of Trades:{" "}
                  {todayTrades?.reduce((a, b) => a + b.numberOfTrades, 0)}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Pie
                    data={{
                      legend: {
                        display: false,
                      },
                      labels: todayTrades?.map((trade) => trade.symbol),
                      datasets: [
                        {
                          label: "# of Votes",
                          data: todayTrades?.map(
                            (trade) => trade.numberOfTrades
                          ),
                          backgroundColor: todayTrades.map(
                            (trade) => trade.color
                          ),
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      animation: false,
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Trades Per Second</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" />{" "}
                  {Object.values(numberOfTradesPerSymbol).reduce(
                    (a, b) => a + b,
                    0
                  )}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar
                    data={mapEventsToBarChartData(numberOfTradesPerSymbol)}
                    options={chartExample3.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Live Traded Volume</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" />$
                  {tradeEvents.at(-1)?.price?.total > 1
                    ? tradeEvents.at(-1)?.price?.total.toFixed(2)
                    : tradeEvents.at(-1)?.price?.total}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line
                    data={mapEventsToTradedVolume(tradeEvents)}
                    options={chartExample4.options}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="6" md="12">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">
                  Today's Analytics (Value Of Trades Per Symbol)
                </h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" />
                  {USDollar.format(
                    todayTrades?.reduce((a, b) => a + b.price.total, 0)
                  )}
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area" style={{ height: 407 }}>
                  <Pie
                    data={{
                      labels: todayTrades?.map((trade) => trade.symbol),
                      datasets: [
                        {
                          label: "# of Votes",
                          data: todayTrades?.map((trade) => trade.price.total),
                          backgroundColor: todayTrades.map(
                            (trade) => trade.color
                          ),
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      animation: false,
                    }}
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="6" md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Latest Trades</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Symbol</th>
                      <th>Date Time</th>
                      <th>Price Unit</th>
                      <th className="text-center">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      // reverse the array to show the latest data first
                      allTradeEvents
                        .slice(-8)
                        .reverse()
                        .map((e) => {
                          return (
                            <tr>
                              <td>{e.symbol}</td>
                              <td>
                                {new Date(e?.timestamp?.avg).toLocaleString()}
                              </td>
                              <td>{USDollar.format(e.price.avg)}</td>
                              <td className="text-center">
                                {USDollar.format(e.price.total)}
                              </td>
                            </tr>
                          );
                        })
                    }
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
