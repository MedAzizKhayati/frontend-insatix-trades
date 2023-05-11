import { httpService } from "./api.config";

export const login = (username: string, password: string) => {
    return httpService.post("/login", { username, password });
}