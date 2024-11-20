export const API_CONFIG = {
    IGDB_API: {
        IGDB_CLIENT_ID: process.env.IGDB_CLIENT_ID,
        IGDB_ACCESS_TOKEN: process.env.IGDB_ACCESS_TOKEN,
        IGDB_PROXY_BASE_URL: process.env.IGDB_AWS_PROXY_URL,
        IGDB_API_BASE_URL: `${process.env.IGDB_AWS_PROXY_URL}/v4`,
        X_API_KEY: process.env.IGDB_AWS_X_API_KEY,
    },
};
