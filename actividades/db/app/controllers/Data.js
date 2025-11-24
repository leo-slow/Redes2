import { setUser } from '../models/setData.js';
import { getUsers } from '../models/getData.js';

export async function setData(matricula, nombre, semestre) {
  try {
    const { data, error } = await setUser(matricula, nombre, semestre);

    if (error) {
      console.error("Error al guardar:", error);
      return false;
    } 
    
    return true;

  } catch (e) {
    console.log("Error inesperado:", e);
    return false;
  }
}

export async function getData() {
  const { data, error } = await getUsers();
  if (error) return [];
  return data;
}
