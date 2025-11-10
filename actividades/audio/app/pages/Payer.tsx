import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av';

let currentSound: Audio.Sound | null = null;

export default function PlayerScreen({ route }) {
  const { song } = route.params;
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const songFileMap = {
    "ConfettiHot.mp3": require('../../assets/songs/ConfettiHot.mp3'),
    "Enemy.mp3": require('../../assets/songs/Enemy.mp3'),
    "Starboy.mp3": require('../../assets/songs/Starboy.mp3'),
    "SantaAlegria.mp3" : require('../../assets/songs/SantaAlegria.mp3'),
    "Levatating.mp3" : require('../../assets/songs/Levatating.mp3'),
    "DADY_YANKEE.mp3" : require('../../assets/songs/DADY_YANKEE.mp3'),
  };

  const songFile = songFileMap[song.song_route];

  useEffect(() => {
    console.log("Cargando canción:", song.name);
    return () => {
      if (sound) {
        console.log("Deteniendo canción:", song.name);
        sound.unloadAsync();
      }
      currentSound = null;
    };
  }, [sound]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.error) {
      console.log('Error en la reproducción:', status.error);
      Alert.alert(
        'Error de reproducción',
        'Ocurrió un problema durante la reproducción del archivo.'
      );
    }
  };

  const handlePlayPause = async () => {
    try {
      if (!sound) {
        if (!songFile) {
          console.log("No se encontró el archivo de audio para esta canción:", song.song_route);
          return;
        }

        if (currentSound) {
          await currentSound.stopAsync();
          await currentSound.unloadAsync();
          currentSound = null;
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
          songFile,
          { shouldPlay: true }
        );

        setSound(newSound);
        setIsPlaying(true);
        console.log("Reproduciendo:", song.name);
        currentSound = newSound;
      } else {
        if (isPlaying) {
          console.log("Pausando canción:", song.name);
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          console.log("Reanudando canción:", song.name);
          await sound.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error('Error al cargar o reproducir la canción:', error);
      Alert.alert(
        'Error al reproducir',
        'No se pudo cargar el archivo de audio. Puede estar dañado o no existir.',
        [{ text: 'Aceptar' }]
      );
    }
  };

  // Retrocede 10 segundos
  const handleRewind = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        console.log("Retrocediendo 10 segundos en canción:", song.name);
        const newPosition = Math.max(0, (status.positionMillis || 0) - 10000);
        await sound.setPositionAsync(newPosition);
      }
    }
  };

  // Adelanta 10 segundos
  const handleForward = async () => {
    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        console.log("Adelantando 10 segundos en canción:", song.name);
        const duration = status.durationMillis || 0;
        const newPosition = Math.min(duration, (status.positionMillis || 0) + 10000);
        await sound.setPositionAsync(newPosition);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: song.img_route }} style={styles.cover} />
      <Text style={styles.title}>{song.name}</Text>
      <Text style={styles.artist}>{song.artistas}</Text>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={handleRewind}>
          <Text style={styles.buttonText}>« 10s</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handlePlayPause}>
          <Text style={styles.buttonText}>{isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleForward}>
          <Text style={styles.buttonText}>10s »</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  cover: {
    width: 300,
    height: 300,
    borderRadius: 10,
    marginBottom: 30,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  artist: {
    color: "gray",
    fontSize: 18,
    marginBottom: 30,
  },
  controls: {
    flexDirection: "row",
    gap: 15,
  },
  button: {
    backgroundColor: "#1DB954",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

