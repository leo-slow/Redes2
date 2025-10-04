import { Image, View, Text, StyleSheet } from 'react-native';

export function InstructionImage(){

  return(
    <View style={styles.container}>
      <Image source={require('../assets/images/ecuacion-de-segundo-grado.jpg')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '15%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
