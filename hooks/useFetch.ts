import { useEffect, useState } from "react";
import { getData, storeData } from "../utils/datastore";
import { getEndpoint } from "../utils/urlparse";

export default function useFetch<Type>(url: string, options?: RequestInit) {
  const [data, setData] = useState<Type>();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const loadLocalData = async () => {
    const storedData = await getData(getEndpoint(url));
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
      storeData(json, getEndpoint(url));
      setData(json);
    } catch (error) {
      setError(error);
    }
  };

  const dataLoading = async () => {
    if (await loadLocalData()) {
      return true;
    }
    fetchData();
  };

  useEffect(() => {
    setIsLoading(true);
    dataLoading();
    setIsLoading(false);
  }, []);

  const refetch = () => {
    setIsLoading(true);
    dataLoading();
    setIsLoading(false);
  };

  return { data, error, isLoading, refetch };
}
