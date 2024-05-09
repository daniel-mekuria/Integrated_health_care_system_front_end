import { useState, useEffect } from 'react';

const useAsyncData = (asyncFunction, dependencies) => {
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
  }, dependencies); // Run useEffect whenever the dependencies change

  return { data, isLoading, error };
};


export default useAsyncData;
