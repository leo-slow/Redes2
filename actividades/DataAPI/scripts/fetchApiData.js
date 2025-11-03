import axios from 'axios';

export async function fetchApiData() {
  try {
    const response = await axios.get('https://covid-api.com/api/reports');
    return response.data.data;  // 'data' es el arreglo que contiene los reportes
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Failed to fetch data');
  }
}
