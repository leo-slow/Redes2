import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../views/Home.tsx";
import DataScreen from "../views/Data.tsx";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Data"
        component={DataScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
