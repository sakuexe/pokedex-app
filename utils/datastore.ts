import AsyncStorage from "@react-native-async-storage/async-storage";

export async function storeData(value: any, key: string) {
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
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log("loaded data locally from: ", key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    await AsyncStorage.setItem(
      "error",
      `error: ${e}, key: ${key}, time: ${new Date()}`,
    );
  }
}
