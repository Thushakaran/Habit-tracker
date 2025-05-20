import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HabitListScreen from '../screens/habits/HabitListScreen';
import CreateHabitScreen from '../screens/habits/CreateHabitScreen';
import ProgressScreen from '../screens/progress/ProgressScreen';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HabitList" component={HabitListScreen} options={{ title: 'My Habits' }} />
      <Tab.Screen name="CreateHabit" component={CreateHabitScreen} options={{ title: 'Add Habit' }} />
      <Tab.Screen name="Progress" component={ProgressScreen} options={{ title: 'Progress' }} />
    </Tab.Navigator>
  );
};

export default MainTabs;