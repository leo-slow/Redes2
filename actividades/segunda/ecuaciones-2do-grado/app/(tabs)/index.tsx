import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AnimatedTitle } from '../../components/AnimatedTitle.tsx';
import { InstructionImage }  from '../../components/InstructionImage.tsx';
import { Input }  from '../../components/Input.tsx';
import { Button }  from '../../components/ButtonData.tsx';

export default function App() {
  const [valueA, setValueA] = useState('');
  const [valueB, setValueB] = useState('');
  const [valueC, setValueC] = useState('');

  return (
    <View
      style={ styles.main }
    >
      <AnimatedTitle/>
      <InstructionImage/>
      <View style={styles.inputs}>
        <Input label="a" value={valueA} setValue={setValueA}/>
        <Input label="b" value={valueB} setValue={setValueB}/>
        <Input label="c" value={valueC} setValue={setValueC}/>
      </View>

      <Button a={Number(valueA)} b={Number(valueB)} c={Number(valueC)} />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
  },
  inputs: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  });
