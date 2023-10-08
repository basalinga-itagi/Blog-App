import React, { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(url);
        const data = res.data;
        if (data) {
          setData(data);
          setLoading(false);
          console.log("fetchData", data);
        }
      } catch (e) {
        setLoading(false);
        setError(e.message);
        console.log("error", e);
      }
    };
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetch;
