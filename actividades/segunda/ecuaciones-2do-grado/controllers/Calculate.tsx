import { Alert } from 'react-native';

type Props = {
  a: number;
  b: number;
  c: number;
}

export function Calculate({ a, b, c }: Props){

  if(isNaN(a) || isNaN(b) | isNaN(c)){
    return Alert.alert("Tipo de dato incorrecto", "Introduce numeros.");
  }
}
