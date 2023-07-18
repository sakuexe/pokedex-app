export function getEndpoint(url: string) {
  /*
   * Return the endpoint of a pokeapi URL.
   * Example: getEndpoint('https://pokeapi.co/api/v2/pokemon/1/') => 'pokemon/1/'
   * Example: getEndpoint('https://pokeapi.co/api/v2/pokemon?limit=255') => 'pokemon?limit=255'
   * This is done for caching purposes. The endpoint will be used as the key in the cache,
   * instead of the entire URL. e.g. cache['pokemon/1/'] instead of cache['https://pokeapi.co/api/v2/pokemon/1/']
   */
  const API_BASE_URL = "https://pokeapi.co/api/v2/";
  const endpoint = url.replace(API_BASE_URL, "");
  return endpoint;
}
