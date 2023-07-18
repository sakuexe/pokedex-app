import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeData(value: any, key: string) {
  /*
   * Store data into device's local storage asynchronously. This can be used for caching for example.
   * Example: storeData({ name: 'John' }, 'user')
   */
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
    console.log("stored locally to: ", key);
  } catch (e) {
    console.log(e);
    await AsyncStorage.setItem(
      "error",
      `error: ${e}, key: ${key}, value: ${value}, time: ${new Date()}`,
    );
  }
}

export async function getData(key: string) {
  /*
   * Get data from device's local storage asynchronously. This can be used for caching for example.
   * Example: getData('user') => { name: 'John' }
   * This is done so that the number of API calls can be reduced. Instead of calling the API
   * every time we need data, we can check if the data is already stored locally.
   */
  try {
    // console.log("all keys: ", await AsyncStorage.getAllKeys());
    const jsonValue = await AsyncStorage.getItem(key);
    console.log("loaded data locally from: ", key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
    const errorLog = { error: e, key: key, time: new Date() };
    await AsyncStorage.setItem(`error-${key}`, JSON.stringify(errorLog));
    return null;
  }
}
