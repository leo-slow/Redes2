import { Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { Calculate } from '../controllers/Calculate.tsx';
import { Responser } from '../components/Response.tsx';

type Props = {
  a: number;
  b: number;
  c: number;
}

export function Button({ a, b, c }: Props){
    const [isCalculate, setIsCalculate] = useState(false);
    const [result, setResult] = useState<{ x1: number; x2: number } | null>(null);
  
    const handlePress = () => setIsCalculate(true);

    useEffect(() => {
      if(isCalculate){
        const res = Calculate(a, b, c);
        if (res === 0) {
          Alert.alert('Tipo de dato incorrecto', 'Ingrese números.');
        } else if (typeof res === 'string') {
          Alert.alert('Aviso', res);
        } else {
          setResult(res); // {x1, x2}
        }
        setIsCalculate(false);
      }
    }, [isCalculate])

    return(
      <View style={styles.main}>
        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={styles.buttontext}>Resolver</Text>
        </TouchableOpacity>

      {result && ( <Responser response={result} />)}
      </View>
    );
}


const styles = StyleSheet.create({
  button: {
    marginTop: '4%',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttontext: {
    color: 'blue',
    fontSize: 20,
  },
  main: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
});
