import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url: string, token: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(null);
    setError(null);
    const fetchData = async () => {
      try {
        setLoading(false);
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`, // Add your token here
            "Content-Type": "application/json",
          },
        });
        console.log(response);
        setData(response);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};
