import { useEffect, useState } from "react";
import fetchData from "../utils/fetch";

export default function useFetch<Type>(url: string, options?: RequestInit) {
  const [data, setData] = useState<Type>();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const dataLoading = async () => {
    setIsLoading(true);
    try {
      const fetchedData = await fetchData<Type>(url, options);
      setData(fetchedData);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    dataLoading();
  }, []);

  const refetch = () => {
    dataLoading();
  };

  return { data, error, isLoading, refetch };
}
