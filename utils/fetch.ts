import { getData, storeData } from "./datastore";
import { getEndpoint } from "./urlparse";

async function loadLocally(url: string) {
  /*
   * load data locally from local storage.
   * Returns the fetched data in a JavaScript object.
   * If the fetch fails, it throws an error.
   */
  const endpoint = getEndpoint(url);
  const storedData = await getData(endpoint);
  return storedData;
}

async function fetchOnline(url: string, options?: RequestInit) {
  /*
   * Fetch data from the API and store it locally.
   * Returns the fetched data in a JavaScript object.
   * If the fetch fails, it throws an error.
   */
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Bad response: ${response.status}`);
  }
  const json = await response.json();
  console.log("fetched data from: ", url);
  storeData(json, getEndpoint(url));
  return JSON.parse(json);
}

export default async function fetchData<Type>(
  url: string,
  options?: RequestInit,
): Promise<Type> {
  /*
   * Function that fetches data.
   * First tries to load data from local storage.
   * If that fails, it fetches data from the API.
   */
  let fetchedData = await loadLocally(url);
  if (fetchedData) return fetchedData;
  return await fetchOnline(url, options);
}
