import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit, HabitCompletion } from '../types';
import { generateId } from '../utils/dateUtils';

const HABITS_KEY = '@HabitTracker:habits';
const COMPLETIONS_KEY = '@HabitTracker:completions';

export const habitService = {
  async getHabits(userId: string): Promise<Habit[]> {
    try {
      const habitsData = await AsyncStorage.getItem(HABITS_KEY);
      const allHabits: Habit[] = habitsData ? JSON.parse(habitsData) : [];
      return allHabits.filter(habit => habit.userId === userId);
    } catch (error) {
      console.error('Error getting habits:', error);
      return [];
    }
  },

  async addHabit(userId: string, name: string, frequency: 'daily' | 'weekly'): Promise<Habit> {
    try {
      const habitsData = await AsyncStorage.getItem(HABITS_KEY);
      const habits: Habit[] = habitsData ? JSON.parse(habitsData) : [];
      const newHabit: Habit = {
        id: generateId(),
        name,
        frequency,
        createdAt: new Date().toISOString(),
        userId,
      };
      habits.push(newHabit);
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(habits));
      return newHabit;
    } catch (error) {
      console.error('Error adding habit:', error);
      throw error;
    }
  },
  async getCompletions(userId: string): Promise<HabitCompletion[]> {
    try {
      const completionsData = await AsyncStorage.getItem(COMPLETIONS_KEY);
      const allCompletions: HabitCompletion[] = completionsData ? JSON.parse(completionsData) : [];

      // Filter completions for habits belonging to the current user
      const userHabits = await this.getHabits(userId);
      const userHabitIds = userHabits.map(habit => habit.id);

      return allCompletions.filter(completion => userHabitIds.includes(completion.habitId));
    } catch (error) {
      console.error('Error getting completions:', error);
      return [];
    }
  },

  async toggleCompletion(habitId: string, date: string): Promise<void> {
    try {
      const completionsData = await AsyncStorage.getItem(COMPLETIONS_KEY);
      const completions: HabitCompletion[] = completionsData ? JSON.parse(completionsData) : [];

      const existingCompletion = completions.find(
        c => c.habitId === habitId && c.date === date
      );

      if (existingCompletion) {
        // Remove completion
        const updatedCompletions = completions.filter(
          c => !(c.habitId === habitId && c.date === date)
        );
        await AsyncStorage.setItem(COMPLETIONS_KEY, JSON.stringify(updatedCompletions));
      } else {
        // Add completion
        const newCompletion: HabitCompletion = {
          id: generateId(),
          habitId,
          completedAt: new Date().toISOString(),
          date,
        };

        completions.push(newCompletion);
        await AsyncStorage.setItem(COMPLETIONS_KEY, JSON.stringify(completions));
      }
    } catch (error) {
      console.error('Error toggling completion:', error);
      throw error;
    }
  },
};