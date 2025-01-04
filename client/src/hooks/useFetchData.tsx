import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchData = (path: string) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [err, setErr] = useState<Error | null>(null);
    const controller = new AbortController();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/${path}`, {
                    signal: controller.signal,
                });
                setData(res.data);
            } catch (err) {
                setErr(err as Error);
            }
        };
        fetchData();

        return () => {
            controller.abort();
            setData(null);
            setLoading(false);
            setErr(null);
        };
    }, []);

    return { data, loading, err };
};
