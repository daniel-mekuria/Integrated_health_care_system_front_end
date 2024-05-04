// useAsyncCustomHook.js
import { useState, useEffect } from 'react';

const useAsyncData = asyncFunction => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await asyncFunction();
        setData(data);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [asyncFunction]);

  return { data, isLoading, error };
};

export default useAsyncData;
