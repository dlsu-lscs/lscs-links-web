import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url: string, token: string) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);
  const [errorCode, setErrorCode] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setData(response.data);
      } catch (e: any) {
        if (axios.isAxiosError(e)) {
          setError(e);
          setErrorCode(e.response?.status || null);
        } else {
          setError(null);
        }
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error, errorCode };
};
