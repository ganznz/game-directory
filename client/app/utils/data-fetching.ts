export const FetchFromServer = async (path: string) => {
    const env = import.meta.env;
    try {
        const apiUrl = env.DEV ? env.VITE_API_URL_DEV : env.VITE_API_URL_PROD;
        const res = await fetch(`${apiUrl}/api/${path}`);
        const data = await res.json();
        return data;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
