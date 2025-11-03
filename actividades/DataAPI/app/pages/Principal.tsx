import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { fetchApiData } from '../../scripts/fetchApiData';

import Card from "@/components/Card";

// Definicion las interfaces para los datos
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

export default function Principal({ navigation }) {
  const [data, setData] = useState<CovidData[] | null>(null);a

  useEffect(() => {
    const fetchData = async () => {
      try {
        const info = await fetchApiData();
        setData(info);
        console.log(info);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, padding: 10 }}>COVID-19 DATA FROM API</Text>
      
      {data ? (
        <ScrollView contentContainerStyle={ styles.data } style={styles.dataContainer}>
          {data.map((item, index) => (
              <Card
                region={item.region.name}
                date={item.date}
                deaths={item.deaths}
                navigation={navigation}
                confirmed={item.confirmed}
                active={item.active}
                />
          ))}
        </ScrollView>
      ) : (
        <Text>Loading data...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: '10%',
  },
  dataContainer: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
    data: {
    justifyContent: "flex-start",
    alignItems: 'center',
  },
});