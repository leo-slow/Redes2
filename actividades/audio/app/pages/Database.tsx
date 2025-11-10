import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { getAll } from '../../scripts/database.js';

export default function Database() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getData() {
      try {
        const result = await getAll();
        setData(result);
      } catch (error) {
        console.error('Error al obtener canciones:', error);
      }
    }

    getData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.label}>Logo:</Text>
      <Text style={styles.value}>{item.img_route}</Text>

      <Text style={styles.label}>Canción:</Text>
      <Text style={styles.value}>{item.song_route}</Text>

      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.value}>{item.name}</Text>

      <Text style={styles.label}>Artistas:</Text>
      <Text style={styles.value}>{item.artistas}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ paddingVertical: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    paddingTop: 20,
  },
  card: {
    width: '90%',
    backgroundColor: "#111",
    borderRadius: 10,
    marginVertical: 10,
    padding: 15,
    alignSelf: 'center',
  },
  label: {
    color: "gray",
    fontSize: 14,
    fontWeight: "bold",
  },
  value: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
  },
});

