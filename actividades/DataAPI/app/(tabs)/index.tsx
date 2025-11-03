import * as React from 'react';
import { createStackNavigator } from "@react-navigation/stack";

import Principal from "@/app/pages/Principal";
import Graph from '../pages/Graph';

const Stack = createStackNavigator();

export default function App(){
  return(
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Principal}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Graph"
        component={Graph}
        options={{ headerShown: false }}
        />
    </Stack.Navigator>
  );
}