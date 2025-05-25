import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useHabits} from '../../context/HabitContext';
import {getDatesInWeek, formatDate} from '../../utils/dateUtils';

interface WeeklyProgressData {
  date: string;
  completedCount: number;
  totalCount: number;
  percentage: number;
}

export const ProgressChart: React.FC = () => {
  const {getCompletedHabits, getTodaysHabits, getHabitProgress} = useHabits();

  const getWeeklyData = (): WeeklyProgressData[] => {
    const weekDates = getDatesInWeek();

    return weekDates.map(date => {
      const completedHabits = getCompletedHabits(date);
      const dailyHabits = getTodaysHabits();
      const totalDailyHabits = dailyHabits.length;
      const completedCount = completedHabits.filter(
        habit => habit.frequency === 'daily',
      ).length;

      return {
        date,
        completedCount,
        totalCount: totalDailyHabits,
        percentage:
          totalDailyHabits > 0
            ? Math.round((completedCount / totalDailyHabits) * 100)
            : 0,
      };
    });
  };

  const weeklyData = getWeeklyData();
  const currentProgress = getHabitProgress();

  // Extracted function to determine borderColor to avoid inline styles
  const getBorderColor = (progress: number): string => {
    if (progress >= 75) {
      return '#34C759';
    }
    if (progress >= 50) {
      return '#FF9500';
    }
    if (progress >= 25) {
      return '#007AFF';
    }
    return '#FF3B30';
  };

  const renderProgressBar = (data: WeeklyProgressData, index: number) => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const isToday = formatDate(new Date()) === data.date;

    return (
      <View key={data.date} style={styles.dayContainer}>
        <Text style={[styles.dayLabel, isToday && styles.todayLabel]}>
          {dayNames[index]}
        </Text>
        <View style={styles.barContainer}>
          <View style={styles.barBackground}>
            <View
              style={[
                styles.barFill,
                {height: `${data.percentage}%`},
                isToday && styles.todayBar,
              ]}
            />
          </View>
        </View>
        <Text style={styles.percentageText}>{data.percentage}%</Text>
        <Text style={styles.countText}>
          {data.completedCount}/{data.totalCount}
        </Text>
      </View>
    );
  };

  const getTotalWeeklyStats = () => {
    const totalCompleted = weeklyData.reduce(
      (sum, day) => sum + day.completedCount,
      0,
    );
    const totalPossible = weeklyData.reduce(
      (sum, day) => sum + day.totalCount,
      0,
    );
    const weeklyAverage =
      totalPossible > 0
        ? Math.round((totalCompleted / totalPossible) * 100)
        : 0;

    return {totalCompleted, totalPossible, weeklyAverage};
  };

  const {totalCompleted, totalPossible, weeklyAverage} = getTotalWeeklyStats();

  return (
    <View style={styles.container}>
      {/* Today's Progress Circle */}
      <View style={styles.todayProgressContainer}>
        <Text style={styles.sectionTitle}>Today's Progress</Text>
        <View style={styles.circleContainer}>
          <View style={styles.progressCircle}>
            <View
              style={[
                styles.progressCircleInner,
                {borderColor: getBorderColor(currentProgress)},
              ]}>
              <Text style={styles.progressPercentage}>{currentProgress}%</Text>
              <Text style={styles.progressLabel}>Complete</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Weekly Chart */}
      <View style={styles.weeklyContainer}>
        <Text style={styles.sectionTitle}>Weekly Overview</Text>
        <View style={styles.chartContainer}>
          {weeklyData.map((data, index) => renderProgressBar(data, index))}
        </View>
        {/* Weekly Summary */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{weeklyAverage}%</Text>
            <Text style={styles.summaryLabel}>Weekly Average</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{totalCompleted}</Text>
            <Text style={styles.summaryLabel}>Completed</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryNumber}>{totalPossible}</Text>
            <Text style={styles.summaryLabel}>Total Possible</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 16,
    textAlign: 'center',
  },
  todayProgressContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressCircleInner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  progressPercentage: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1C1C1E',
  },
  progressLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  weeklyContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 150,
    marginBottom: 20,
  },
  dayContainer: {
    alignItems: 'center',
    flex: 1,
  },
  dayLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8E8E93',
    marginBottom: 8,
  },
  todayLabel: {
    color: '#007AFF',
  },
  barContainer: {
    height: 80,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  barBackground: {
    width: 24,
    height: 80,
    backgroundColor: '#F2F2F7',
    borderRadius: 12,
    overflow: 'hidden',
  },
  barFill: {
    backgroundColor: '#007AFF',
    borderRadius: 12,
    minHeight: 2,
  },
  todayBar: {
    backgroundColor: '#34C759',
  },
  percentageText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 2,
  },
  countText: {
    fontSize: 8,
    color: '#8E8E93',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
});
