import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getData() {
  try {
    const Rvalue = await AsyncStorage.getItem("r");
    const Gvalue = await AsyncStorage.getItem("g");
    const Bvalue = await AsyncStorage.getItem("b");

    const r = Rvalue != null ? JSON.parse(Rvalue) : null;
    const g = Gvalue != null ? JSON.parse(Gvalue) : null;
    const b = Bvalue != null ? JSON.parse(Bvalue) : null;

    return [r, g, b];
  } catch (e) {
    console.error("Error al recuperar datos:", e);
    return null; // devuelve null si hay error
  }
}
