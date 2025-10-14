import { View, StyleSheet } from "react-native";
import React, { useState } from "react";

/* Components */
import { Input } from "@/components/Input";
import { getData } from "@/scripts/retrieve";

export default function HomeScreen() {
  const [isR, setIsR] = useState(0);
  const [isG, setIsG] = useState(0);
  const [isB, setIsB] = useState(0);

  const retrieveData = ({ myData }) => {
    setIsR(myData[0]);
    setIsG(myData[1]);
    setIsB(myData[2]);
  };

  React.useEffect(() => {
    const loadData = async () => {
      const dData = await getData();
      if (
        dData &&
        dData[0] !== null &&
        dData[1] !== null &&
        dData[2] !== null
      ) {
        retrieveData({ myData: dData });
      }
    };
    loadData();
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={styles.inputs}>
        <Input
          placeholder="Introduce RED value"
          value={isR}
          onChangeText={setIsR}
          style={{ height: "15%" }}
          name="r"
        />
        <Input
          placeholder="Introduce GREEN value"
          value={isG}
          onChangeText={setIsG}
          style={{ height: "15%" }}
          name="g"
        />
        <Input
          placeholder="Introduce BLUE value"
          value={isB}
          onChangeText={setIsB}
          style={{ height: "15%" }}
          name="b"
        />
      </View>
      <View
        style={[
          styles.viewcolor,
          { backgroundColor: `rgba(${isR}, ${isG}, ${isB}, 1)` },
        ]}
      ></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "100%",
    alignItems: "100%",
  },
  text: {
    color: "black",
    fontSize: 20,
    fontFamily: "Gloock",
  },
  inputs: {
    width: "100%",
    height: "50%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  viewcolor: {
    width: "100%",
    height: "50%",
  },
});
