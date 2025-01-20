import { useState, useEffect } from "react";

const useFetch = (fetchFn, dependencies = []) => {
  const [data, setData] = useState(null); // Holds the fetched data
  const [loading, setLoading] = useState(false); // Tracks the loading state
  const [error, setError] = useState(null); // Stores any error that occurs

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const result = await fetchFn();
        setData(result);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};

export default useFetch;