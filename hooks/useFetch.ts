import { useEffect, useState } from "react";
import fetchData from "../utils/fetch";

export default function useFetch<Type>(url: string, options?: RequestInit) {
  const [data, setData] = useState<Type>();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dataLoading = async (url: string) => {
    try {
      const fetchedData = await fetchData<Type>(url, options);
      setData(fetchedData);
    } catch (error) {
      setError(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    dataLoading(url);
    setIsLoading(false);
  }, []);

  const refetch = (url?: string) => {
    setIsLoading(true);
    dataLoading(url);
    setIsLoading(false);
  };

  return { data, error, isLoading, refetch };
}
