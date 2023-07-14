export function getEndpoint(url: string) {
  const API_BASE_URL = "https://pokeapi.co/api/v2/";
  const endpoint = url.replace(API_BASE_URL, "");
  return endpoint;
}
