import React from 'react';
import { Container } from '../../components/common/Container';
import { Header } from '../../components/common/Header';
import { HabitForm } from '../../components/habits/HabitForm';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../types';

type CreateHabitScreenNavigationProp = BottomTabNavigationProp<MainTabParamList, 'CreateHabit'>;

interface CreateHabitScreenProps {
  navigation: CreateHabitScreenNavigationProp;
}

export const CreateHabitScreen: React.FC<CreateHabitScreenProps> = ({ navigation }) => {
  const handleHabitCreated = () => {
    // Navigate to Habits tab after creating a habit
    navigation.navigate('Habits');
  };

  return (
    <Container>
      <Header title="Create Habit" />
      <HabitForm onHabitCreated={handleHabitCreated} />
    </Container>
  );
};