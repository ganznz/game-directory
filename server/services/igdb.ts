import axios from "axios";
import { API_CONFIG } from "../config/apiConfig.js";

const igdbApiClient = axios.create({
    baseURL: API_CONFIG.IGDB_API.BASE_URL,
    headers: {
        "x-api-key": API_CONFIG.IGDB_API.X_API_KEY,
    },
});

// test api call, delete later
export const getGameData = async () => {
    try {
        const res = await igdbApiClient.get("/v4/games");
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
