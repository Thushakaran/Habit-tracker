import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import { generateId } from '../utils/dateUtils';

const USER_KEY = '@HabitTracker:user';
const USERS_KEY = '@HabitTracker:users';

export const authService = {
  async getCurrentUser(): Promise<User | null> {
    try {
      const userData = await AsyncStorage.getItem(USER_KEY);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  async login(email: string, password: string): Promise<User | null> {
    try {
      const usersData = await AsyncStorage.getItem(USERS_KEY);
      const users: User[] = usersData ? JSON.parse(usersData) : [];

      const user = users.find(u => u.email === email && u.password === password);

      if (user) {
        await AsyncStorage.setItem(USER_KEY, JSON.stringify(user));
        return user;
      }

      return null;
    } catch (error) {
      console.error('Error logging in:', error);
      return null;
    }
  },

  async register(name: string, email: string, password: string): Promise<User | null> {
    try {
      const usersData = await AsyncStorage.getItem(USERS_KEY);
      const users: User[] = usersData ? JSON.parse(usersData) : [];

      // Check if user already exists
      const existingUser = users.find(u => u.email === email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const newUser: User = {
        id: generateId(),
        name,
        email,
        password,
      };

      users.push(newUser);
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(USER_KEY);
    } catch (error) {
      console.error('Error logging out:', error);
      throw error;
    }
  },
};