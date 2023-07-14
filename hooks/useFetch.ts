import { useEffect, useState } from "react";
import { getData, storeData } from "../utils/datastore";

export default function useFetch<Type>(url: string, options?: RequestInit) {
  const [data, setData] = useState([] as Type[]);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkStorage = async () => {
    const storedData = await getData(url);
    if (!storedData) return false;
    setData(storedData);
    setIsLoading(false);
    return true;
  };

  const fetchData = async () => {
    try {
      const response = await fetch(url, options);
      const json = await response.json();
      console.log("fetched data from: ", url);
      storeData(json.results, url);
      setData(json.results);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (checkStorage()) {
      setIsLoading(false);
      return;
    }
    fetchData();
    setIsLoading(false);
  }, []);

  return { data, error, isLoading };
}
