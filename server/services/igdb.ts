import axios from "axios";
import { API_CONFIG } from "../config/apiConfig.js";

export const igdbApiClient = axios.create({
    baseURL: API_CONFIG.IGDB_API.IGDB_API_BASE_URL,
    headers: {
        Accept: "application/json",
        "Content-Type": "text/plain",
        "x-api-key": API_CONFIG.IGDB_API.X_API_KEY,
    },
});
