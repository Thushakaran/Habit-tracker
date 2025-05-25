import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import {Habit, HabitCompletion, HabitContextType} from '../types';
import {habitService} from '../services/habitService';
import {useAuth} from './AuthContext';
import {getTodayDate} from '../utils/dateUtils';

const HabitContext = createContext<HabitContextType | undefined>(undefined);

interface HabitProviderProps {
  children: ReactNode;
}

export const HabitProvider: React.FC<HabitProviderProps> = ({children}) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [completions, setCompletions] = useState<HabitCompletion[]>([]);
  const {user} = useAuth();

  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        // Clear data when user logs out
        setHabits([]);
        setCompletions([]);
        return;
      }

      try {
        const [userHabits, userCompletions] = await Promise.all([
          habitService.getHabits(user.id),
          habitService.getCompletions(user.id),
        ]);

        setHabits(userHabits);
        setCompletions(userCompletions);
      } catch (error) {
        console.error('Error loading user data:', error);
        // Reset to empty state on error
        setHabits([]);
        setCompletions([]);
      }
    };

    loadUserData();
  }, [user]);

  const addHabit = async (
    name: string,
    frequency: 'daily' | 'weekly',
  ): Promise<void> => {
    if (!user) {
      throw new Error('User must be authenticated to add habits');
    }

    try {
      const newHabit = await habitService.addHabit(user.id, name, frequency);
      setHabits(prev => [...prev, newHabit]);
    } catch (error) {
      console.error('Error adding habit:', error);
      throw error;
    }
  };

  const toggleHabitCompletion = async (
    habitId: string,
    date: string,
  ): Promise<void> => {
    if (!user) {
      throw new Error('User must be authenticated to toggle habits');
    }

    try {
      await habitService.toggleCompletion(habitId, date);

      // Update local state
      const existingCompletion = completions.find(
        c => c.habitId === habitId && c.date === date,
      );

      if (existingCompletion) {
        setCompletions(prev =>
          prev.filter(c => !(c.habitId === habitId && c.date === date)),
        );
      } else {
        const newCompletion: HabitCompletion = {
          id: Date.now().toString(),
          habitId,
          completedAt: new Date().toISOString(),
          date,
        };
        setCompletions(prev => [...prev, newCompletion]);
      }
    } catch (error) {
      console.error('Error toggling habit completion:', error);
      throw error;
    }
  };

  const getHabitProgress = (): number => {
    const todayDate = getTodayDate();
    const todayHabits = habits.filter(habit => habit.frequency === 'daily');

    if (todayHabits.length === 0) {
      return 0;
    }

    const completedToday = todayHabits.filter(habit =>
      completions.some(c => c.habitId === habit.id && c.date === todayDate),
    ).length;

    return Math.round((completedToday / todayHabits.length) * 100);
  };

  const getTodaysHabits = (): Habit[] => {
    return habits.filter(habit => habit.frequency === 'daily');
  };

  const getCompletedHabits = (date: string): Habit[] => {
    const completedHabitIds = completions
      .filter(c => c.date === date)
      .map(c => c.habitId);

    return habits.filter(habit => completedHabitIds.includes(habit.id));
  };

  const isHabitCompletedToday = (habitId: string, date: string): boolean => {
    return completions.some(c => c.habitId === habitId && c.date === date);
  };

  const value: HabitContextType = {
    habits,
    completions,
    addHabit,
    toggleHabitCompletion,
    getHabitProgress,
    getTodaysHabits,
    getCompletedHabits,
    isHabitCompletedToday,
  };

  return (
    <HabitContext.Provider value={value}>{children}</HabitContext.Provider>
  );
};

export const useHabits = (): HabitContextType => {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabits must be used within a HabitProvider');
  }
  return context;
};
