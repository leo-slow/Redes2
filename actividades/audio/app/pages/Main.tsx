import { View, StyleSheet, TouchableOpacity, Text, Image, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { initDB, insert, getAll, clearDatabase } from '../../scripts/database.js';

export default function HomeScreen({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function setup() {
      await clearDatabase();
      await initDB();

      const existing = await getAll();
      if (existing.length === 0) {
        await insert(
          "Music Session #0",
          "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd21tucfpen3j82.cloudfront.net%2Fwp-content%2Fuploads%2F2025%2F11%2F06113115%2FBizarrap-y-Daddy-Yankee-lanzan-BZRP-Music-Session-066.webp&f=1&nofb=1&ipt=2d78d6adc66f948b3f8d22d8100e82475eb87fc11f504c5f0d0563c57fa9fdf7",
          "DADY_YANKEE.mp3",
          "BZRP, DADY YANKEE"
        );
        await insert(
          "Levitating",
          "https://music-b26f.kxcdn.com/wp-content/uploads/2020/04/dua-lipa-future-nostalgia.jpg",
          "Levatating.mp3",
          "Dua Lipa"
        );
        await insert(
          "Santa Alegría",
          "http://p1.music.126.net/d0rAf2vuTW0AJ8HnMukguw==/109951172117967945.jpg",
          "SantaAlegria.mp3",
          "Alvaro Soler"
        );
        await insert(
          "Starboy",
          "https://i.pinimg.com/736x/9d/18/fa/9d18fa5c8540392f9d64074de7722b41.jpg",
          "Starboy.mp3",
          "The Weeknd"
        );
        await insert(
          "Hot",
          "https://i.ytimg.com/vi/owxpPgpYXvg/maxresdefault.jpg",
          "ConfettiHot.mp3",
          "Confetti"
        );
        await insert(
          "Enemy",
          "https://i.scdn.co/image/ab67616d0000b273aa597e50829169e6994eb403",
          "Enemy.mp3",
          "Imagine Dragons"
        );
      }

      const result = await getAll();
      setData(result);
    }

    setup();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => navigation.navigate('Player', { song: item })}
    >
      <Image source={{ uri: item.img_route }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.artist}>{item.artistas}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={{ paddingBottom: 100 }}
      />

      <TouchableOpacity
        style={styles.bottomButton}
        onPress={() => navigation.navigate('Database', { data: data })}
      >
        <Text style={styles.bottomButtonText}>Database Info</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 50,
  },
  card: {
    backgroundColor: "#111",
    borderRadius: 10,
    margin: 10,
    flex: 1,
    overflow: "hidden",
    elevation: 3,
  },
  image: {
    width: "100%",
    height: 150,
  },
  info: {
    padding: 10,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  artist: {
    color: "gray",
    fontSize: 14,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 20,
    left: '5%',
    width: '90%',
    backgroundColor: '#1DB954',
    paddingVertical: 15,
    borderRadius: 50,
    alignItems: 'center',
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
