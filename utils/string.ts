export function capitalize(str: string): string {
  /*
   * Capitalize the first letter of a string and return it.
   * Example: capitalize('hello') => 'Hello'
   */
  return str.charAt(0).toUpperCase() + str.slice(1);
}
