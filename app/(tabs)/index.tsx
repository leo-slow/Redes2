import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import ParallaxScrollView from '@/components/parallax-scroll-view';
import Nombre from '../../components/nombre.tsx';
import Matricula from '../../components/Matricula.tsx';
import Carrera from '../../components/Carrera.tsx';
import Hobby from '../../components/Hobby.tsx';
import Viaje from '../../components/Viaje.tsx';
import Libro from '../../components/Libro.tsx';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      style={styles.center}
       >
       <Nombre/>
       <Matricula/>
       <Carrera/>
       <Hobby/>
       <Viaje/>
       <Libro/>
      </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
