import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabs from './MainTabs';
import { MainStackParamList } from './types';

const Stack = createStackNavigator<MainStackParamList>();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
};

export default MainStack;