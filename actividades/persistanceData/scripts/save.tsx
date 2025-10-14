import AsyncStorage from "@react-native-async-storage/async-storage";

export async function save({ name, value }) {
  try {
    await AsyncStorage.setItem(name, JSON.stringify(value));
  } catch (e) {
    console.error("Error al guardar", e);
  }
}
