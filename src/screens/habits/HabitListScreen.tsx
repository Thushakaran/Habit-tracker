// src/screens/habits/HabitListScreen.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Container } from '../../components/common/Container';
import { Header } from '../../components/common/Header';
import { HabitList } from '../../components/habits/HabitList';
import { useAuth } from '../../context/AuthContext';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../types';

type HabitListScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'Habits'>;

interface HabitListScreenProps {
  navigation: HabitListScreenNavigationProp;
}

export const HabitListScreen: React.FC<HabitListScreenProps> = ({ navigation: _navigation }) => {
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  const renderLogoutButton = () => (
    <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
      <Text style={styles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );

  return (
    <Container style={styles.container}>
      <Header 
        title={`Hi, ${user?.name || 'User'}!`}
        rightComponent={renderLogoutButton()}
      />
      <HabitList />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
  logoutButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#FF3B30',
  },
  logoutText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});