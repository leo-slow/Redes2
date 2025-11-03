import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Card({ navigator, region, date, deaths }){
  return(
    <TouchableOpacity style={[styles.container]}>
      <Text>Region: {region}</Text>
      <Text>Date: {date}</Text>
      <Text>Deaths: {deaths}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
    margin: "1%",
    backgroundColor: "rgba(107, 205, 255, 0.7)",
    padding: 20,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
  }
});