import { useEffect, useState } from "react";
import { fetchEventSource } from "../services/api.config";
import { getLatestTrades } from "../services/trades-aggregations.service";

export interface TradesAggregation {
  id: string;
  volume: {
    total: number;
    min: number;
    max: number;
    avg: number;
  };
  price: {
    total: number;
    min: number;
    max: number;
    avg: number;
  };
  timestamp: {
    first: number;
    last: number;
    avg: number;
  };
  symbol: string;
  createdAt: number;
  numberOfTrades: number;
}

export default function useTradeEvents(
  symbols: string[],
  maxEvents: number = 100
) {
  const [events, setEvents] = useState<TradesAggregation[]>([]);

  useEffect(() => {
    getLatestTrades(maxEvents).then(({ content } : any) => {
      setEvents(content);
    });
  }, []);

  useEffect(() => {
    const controller = fetchEventSource(
      `trades/stream-v2?'${
        symbols?.map((s) => `symbols=${s}`).join("&") || ""
      }`,
      (event: any) => {
        setEvents((prevEvents: any) => {
          const newEvents = [...prevEvents];
          const eventIndex = newEvents.findIndex((e) => e.id === event.id);
          if (eventIndex === -1) {
            newEvents.push(event);
          } else {
            newEvents[eventIndex] = event;
          }

          if (newEvents.length > maxEvents) {
            newEvents.shift();
          }
          return newEvents;
        });
      }
    );
    return () => {
      controller.abort();
    };
  }, [symbols]);

  return events;
}
