import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Habit } from '../../types';
import { useHabits } from '../../context/HabitContext';
import { getTodayDate } from '../../utils/dateUtils';

interface HabitCardProps {
  habit: Habit;
  date?: string;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, date = getTodayDate() }) => {
  const { toggleHabitCompletion, isHabitCompletedToday } = useHabits();
  const isCompleted = isHabitCompletedToday(habit.id, date);

  const handleToggleCompletion = async () => {
    try {
      await toggleHabitCompletion(habit.id, date);
    } catch (error) {
      console.error('Error toggling habit completion:', error);
    }
  };

  const getFrequencyText = () => {
    return habit.frequency === 'daily' ? 'Daily' : 'Weekly';
  };

  const getFrequencyColor = () => {
    return habit.frequency === 'daily' ? '#007AFF' : '#FF9500';
  };

  return (
    <View style={[styles.container, isCompleted && styles.completedContainer]}>
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={[styles.habitName, isCompleted && styles.completedText]}>
            {habit.name}
          </Text>
          <View style={[styles.frequencyBadge, { backgroundColor: getFrequencyColor() }]}>
            <Text style={styles.frequencyText}>{getFrequencyText()}</Text>
          </View>
        </View>

        <Text style={styles.createdDate}>
          Created: {new Date(habit.createdAt).toLocaleDateString()}
        </Text>
      </View>

      <TouchableOpacity
        style={[styles.checkButton, isCompleted && styles.completedButton]}
        onPress={handleToggleCompletion}
      >
        <Text style={[styles.checkButtonText, isCompleted && styles.completedButtonText]}>
          {isCompleted ? '✓' : '○'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  completedContainer: {
    backgroundColor: '#F0F9FF',
    borderColor: '#34C759',
  },
  contentContainer: {
    flex: 1,
    marginRight: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  habitName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
    flex: 1,
    marginRight: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#8E8E93',
  },
  frequencyBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  frequencyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  createdDate: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  checkButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F2F2F7',
    borderWidth: 2,
    borderColor: '#C7C7CC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedButton: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  checkButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#8E8E93',
  },
  completedButtonText: {
    color: '#FFFFFF',
  },
});
