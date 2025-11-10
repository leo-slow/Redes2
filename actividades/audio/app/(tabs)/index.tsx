import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../pages/Main.tsx";
import PlayerScreen from "../pages/Payer.tsx";
import DatabaseScreen from "../pages/Database.tsx";

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
        name="Player"
        component={PlayerScreen}
        options={{ headerShown: false }}
      />
    <Stack.Screen
        name="Database"
        component={DatabaseScreen}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}
