import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../types';
import { HabitListScreen } from '../screens/habits/HabitListScreen';
import { CreateHabitScreen } from '../screens/habits/CreateHabitScreen';
import { ProgressScreen } from '../screens/progress/ProgressScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E5EA',
          paddingTop: 8,
          paddingBottom: 8,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="Habits"
        component={HabitListScreen}
        options={{
          tabBarLabel: 'My Habits',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="📋" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateHabit"
        component={CreateHabitScreen}
        options={{
          tabBarLabel: 'Add Habit',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="➕" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarLabel: 'Progress',
          tabBarIcon: ({ color, size }) => (
            <TabIcon icon="📊" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

interface TabIconProps {
  icon: string;
  color: string;
  size: number;
}

const TabIcon: React.FC<TabIconProps> = ({ icon, size }) => {
  return (
    <Text style={{ fontSize: size * 0.8 }}>
      {icon}
    </Text>
  );
};