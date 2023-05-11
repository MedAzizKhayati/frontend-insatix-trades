import { httpService } from "./api.config"

export const getAllSymbols = () => {
    return httpService.get("/trades/symbols");
}

export const getTodayTradesAnalytics = () => {
    return httpService.get("/trades/today-analytics");
}

export const getLatestTrades = (limit = 1000) => {
    return httpService.get(`/trades/latest?limit=${limit}`);
}