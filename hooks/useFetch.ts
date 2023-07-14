import { useEffect, useState } from "react";
import { getData, storeData } from "../utils/datastore";
import { getEndpoint } from "../utils/urlparse";

export default function useFetch<Type>(url: string, options?: RequestInit) {
  const [data, setData] = useState([] as Type[]);
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
      storeData(json.results, getEndpoint(url));
      setData(json.results);
    } catch (error) {
      setError(error);
    }
  };

  const dataLoading = async () => {
    setIsLoading(true);
    if (await loadLocalData()) {
      setIsLoading(false);
      return true;
    }
    fetchData();
    setIsLoading(false);
  };

  useEffect(() => {
    dataLoading();
  }, []);

  return { data, error, isLoading };
}
