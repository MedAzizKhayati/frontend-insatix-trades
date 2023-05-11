import { fetchEventSource as subToEvent } from '@microsoft/fetch-event-source';
import axios from 'axios';
import Keycloak from "keycloak-js";

const API_URL = "http://localhost:5000/api";

// Fetch Event Source
export const fetchEventSource = (
    endpoint: string,
    onmessage: (event: any) => void,
    onerror?: (error: any) => void
) => {
    const controller = new AbortController();
    const url = `${API_URL}/${endpoint}`;
    subToEvent(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        onmessage: (event) => onmessage(JSON.parse(event.data)),
        onerror,
        signal: controller.signal,
    });
    return controller;
}

export const httpService = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

httpService.interceptors.response.use(
    ({ data }) => data
);



export const keycloak = new Keycloak({
    url: "http://localhost:8080/",
    realm: "spring-boot-microservices-realm",
    clientId: "spring-cloud-client",
});


