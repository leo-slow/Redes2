import React, { useState } from 'react';
import { TextInput, Text, View, StyleSheet } from 'react-native';

type Props = {
  label: string;
  value: string;
  setValue: (text: string) => void;
}

export function Input({ label, value, setValue }: Props){

  return(
    <View style={styles.main}>
      <Text style={styles.text}>{label}:</Text>
      <TextInput 
      placeholder={`Ingresa ${label}`}
      value={value}
      onChangeText={text => setValue(text)}
      style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
  },
  text: {
    width: '10%',
  },
  input: {
    flex: 1,
    width: '90%',
    height: '90%',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
});
