import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (url: string, token: string) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response == null || response == undefined) {
          window.location.replace("/login");
        }
        setData(response);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        setError(e);
      }
      setLoading(false);
    };
    fetchData();
  }, [url, token]);

  return { data, loading, error };
};
