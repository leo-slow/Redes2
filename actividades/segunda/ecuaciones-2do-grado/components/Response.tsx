import { View, Text, StyleSheet } from 'react-native';

type ResponserProps = {
  response: { x1: number; x2: number } | string;
};

export function Responser({ response }: ResponserProps) {
  return (
    <View style={styles.main}>
      {typeof response === 'object' ? (
        <View style={styles.result}>
          <Text style={styles.text}>x1 = {response.x1}</Text>
          <Text style={styles.text}>x2 = {response.x2}</Text>
        </View>
      ) : (
        <Text style={styles.text}>{response}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 18,
    marginVertical: 2,
  },
  result: {
    backgroundColor: '#111111',
    width: '70%',
    alignItems: 'center',
    borderRadius: 5,
  },
});

