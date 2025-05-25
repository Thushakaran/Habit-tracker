export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface Habit {
  id: string;
  name: string;
  frequency: 'daily' | 'weekly';
  createdAt: string;
  userId: string;
}

export interface HabitCompletion {
  id: string;
  habitId: string;
  completedAt: string;
  date: string; // YYYY-MM-DD format
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

export interface HabitContextType {
  habits: Habit[];
  completions: HabitCompletion[];
  addHabit: (name: string, frequency: 'daily' | 'weekly') => Promise<void>;
  toggleHabitCompletion: (habitId: string, date: string) => Promise<void>;
  getHabitProgress: () => number;
  getTodaysHabits: () => Habit[];
  getCompletedHabits: (date: string) => Habit[];
  isHabitCompletedToday: (habitId: string, date: string) => boolean;
}

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type MainTabParamList = {
  Habits: undefined;
  CreateHabit: undefined;
  Progress: undefined;
};
