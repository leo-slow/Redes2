import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function Card({ navigation, region, date, deaths, confirmed, active }){
  return(
    <TouchableOpacity style={[styles.container]} onPress={() => navigation.navigate("Graph", 
    {
      region: region,
      date: date,
      deaths: deaths,
      confirmed: confirmed,
      active: active
    })}>
      <View>
        <Text>Region: {region}</Text>
        <Text>Date: {date}</Text>
        <Text>Deaths: {deaths}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "100px",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: "1%",
    backgroundColor: "rgba(107, 205, 255, 0.7)",
    padding: 20,
    borderWidth: 2,
    borderColor: '#000',
    borderRadius: 10,
  }
});