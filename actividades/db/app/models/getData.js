import { supabase } from '../models/supabaseClient';

export async function getUsers() {
  try {
    const { data, error } = await supabase
      .from('alumnos')
      .select('*')
      .order('id', { ascending: false });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error("Error obteniendo datos:", error);
    return { data: [], error };
  }
}
