import AsyncStorage from "@react-native-async-storage/async-storage";

// store data functions
const storeStringData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    throw e;
  }
};

const storeObjectData = async (key: string, value: object) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    throw e;
  }
};

// get data functions
const getStringData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value != null ? value : null;
  } catch (e) {
    throw e;
  }
};

const getObjectData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    throw e;
  }
};

// export functions
export { getObjectData, getStringData, storeObjectData, storeStringData };
