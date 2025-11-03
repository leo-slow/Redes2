import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { fetchApiData } from '../../scripts/fetchApiData';

// Definir las interfaces para los datos
interface Region {
  iso: string;
  name: string;
  province: string;
  lat: string;
  long: string;
  cities: string[];
}

interface CovidData {
  date: string;
  confirmed: number;
  deaths: number;
  recovered: number;
  active: number;
  fatality_rate: number;
  region: Region;
}

export default function Principal() {
  const [data, setData] = useState<CovidData[] | null>(null); // Cambié a un array de CovidData

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await fetchApiData();
        setData(info); // Ahora 'info' debería ser un array de CovidData
        console.log(info); // Depuración
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={style.container}>
      <Text style={{ fontSize: 24, padding: 10 }}>COVID-19 DATA FROM API</Text>
      
      {data ? (
        <ScrollView style={{ width: '100%' }}>
          {data.map((item, index) => (
            <View key={index} style={style.dataContainer}>
              <Text>Region: {item.region.name}</Text>
              <Text>Date: {item.date}</Text>
              <Text>Deaths: {item.deaths}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '10%',
  },
  dataContainer: {
    marginTop: 10,
    padding: 10,
    alignItems: 'flex-start',
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
});