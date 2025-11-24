import { supabase } from '../models/supabaseClient.js';

export async function setUser(matricula, nombre, semestre) {
  try {
    const { data, error } = await supabase
      .from('alumnos')
      .insert([
        {
          matricula: matricula,
          nombre: nombre,
          semestre: semestre
        }
      ])
      .select();

    if (error) {
      console.error("Error de Supabase:", error.message);
      console.error("Detalles:", error.details);
      return { data: null, error };
    }

    console.log("Guardado exitoso:", data);
    return { data, error: null };

  } catch (e) {
    console.error("Error inesperado:", e);
    return { data: null, error: e };
  }
}
