// import React, { useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import { HabitCard } from './HabitCard';
// import { useHabits } from '../../context/HabitContext';
// import { Habit } from '../../types';
// import { getTodayDate } from '../../utils/dateUtils';

// type FilterType = 'all' | 'today' | 'completed';

// export const HabitList: React.FC = () => {
//   const [activeFilter, setActiveFilter] = useState<FilterType>('all');
//   const { habits, getTodaysHabits, getCompletedHabits } = useHabits();

//   const getFilteredHabits = (): Habit[] => {
//     const todayDate = getTodayDate();
//     switch (activeFilter) {
//       case 'today':
//         return getTodaysHabits();
//       case 'completed':
//         return getCompletedHabits(todayDate);
//       default:
//         return habits;
//     }
//   };

//   const filteredHabits = getFilteredHabits();

//   const renderFilterButton = (filter: FilterType, title: string) => (
//     <TouchableOpacity
//       style={[
//         styles.filterButton,
//         activeFilter === filter && styles.activeFilterButton,
//       ]}
//       onPress={() => setActiveFilter(filter)}
//     >
//       <Text
//         style={[
//           styles.filterButtonText,
//           activeFilter === filter && styles.activeFilterButtonText,
//         ]}
//       >
//         {title}
//       </Text>
//     </TouchableOpacity>
//   );

//   const renderEmptyState = () => (
//     <View style={styles.emptyContainer}>
//       <Text style={styles.emptyTitle}>
//         {activeFilter === 'all' && 'No habits yet'}
//         {activeFilter === 'today' && 'No daily habits'}
//         {activeFilter === 'completed' && 'No completed habits today'}
//       </Text>
//       <Text style={styles.emptySubtitle}>
//         {activeFilter === 'all' && 'Create your first habit to get started!'}
//         {activeFilter === 'today' && 'Add daily habits to see them here'}
//         {activeFilter === 'completed' && 'Complete some habits to see progress'}
//       </Text>
//     </View>
//   );

//   const renderHabitItem = ({ item }: { item: Habit }) => (
//     <HabitCard habit={item} />
//   );

//   const getHabitCount = () => {
//     const totalHabits = habits.length;
//     const todayHabits = getTodaysHabits().length;
//     const completedToday = getCompletedHabits(getTodayDate()).length;

//     return { totalHabits, todayHabits, completedToday };
//   };

//   const { totalHabits, todayHabits, completedToday } = getHabitCount();

//   return (
//     <View style={styles.container}>
//       {/* Stats Header */}
//       <View style={styles.statsContainer}>
//         <View style={styles.statItem}>
//           <Text style={styles.statNumber}>{totalHabits}</Text>
//           <Text style={styles.statLabel}>Total</Text>
//         </View>
//         <View style={styles.statItem}>
//           <Text style={styles.statNumber}>{todayHabits}</Text>
//           <Text style={styles.statLabel}>Today</Text>
//         </View>
//         <View style={styles.statItem}>
//           <Text style={styles.statNumber}>{completedToday}</Text>
//           <Text style={styles.statLabel}>Completed</Text>
//         </View>
//       </View>

//       {/* Filter Buttons */}
//       <View style={styles.filterContainer}>
//         {renderFilterButton('all', 'All Habits')}
//         {renderFilterButton('today', "Today's Habits")}
//         {renderFilterButton('completed', 'Completed')}
//       </View>

//       {/* Habits List */}
//       <FlatList
//         data={filteredHabits}
//         renderItem={renderHabitItem}
//         keyExtractor={(item) => item.id}
//         ListEmptyComponent={renderEmptyState}
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={filteredHabits.length === 0 ? styles.emptyListContainer : undefined}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F2F2F7',
//   },
//   statsContainer: {
//     flexDirection: 'row',
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: 16,
//     marginVertical: 8,
//     borderRadius: 12,
//     padding: 16,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   statItem: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   statNumber: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#007AFF',
//   },
//   statLabel: {
//     fontSize: 14,
//     color: '#8E8E93',
//     marginTop: 4,
//   },
//   filterContainer: {
//     flexDirection: 'row',
//     paddingHorizontal: 16,
//     marginBottom: 8,
//     gap: 8,
//   },
//   filterButton: {
//     flex: 1,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     backgroundColor: '#FFFFFF',
//     borderWidth: 1,
//     borderColor: '#C7C7CC',
//     alignItems: 'center',
//   },
//   activeFilterButton: {
//     backgroundColor: '#007AFF',
//     borderColor: '#007AFF',
//   },
//   filterButtonText: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#007AFF',
//   },
//   activeFilterButtonText: {
//     color: '#FFFFFF',
//   },
//   emptyListContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//   },
//   emptyContainer: {
//     alignItems: 'center',
//     paddingHorizontal: 32,
//     paddingVertical: 48,
//   },
//   emptyTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#1C1C1E',
//     marginBottom: 8,
//     textAlign: 'center',
//   },
//   emptySubtitle: {
//     fontSize: 16,
//     color: '#8E8E93',
//     textAlign: 'center',
//     lineHeight: 22,
//   },
// });

import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { HabitCard } from './HabitCard';
import { useHabits } from '../../context/HabitContext';
import { Habit } from '../../types';
import { getTodayDate } from '../../utils/dateUtils';

type FilterType = 'all' | 'today' | 'completed';

export const HabitList: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const { habits, getTodaysHabits, getCompletedHabits } = useHabits();

  const getFilteredHabits = (): Habit[] => {
    const todayDate = getTodayDate();
    switch (activeFilter) {
      case 'today':
        return getTodaysHabits();
      case 'completed':
        return getCompletedHabits(todayDate);
      default:
        return habits;
    }
  };

  const filteredHabits = getFilteredHabits();

  const renderFilterButton = (filter: FilterType, title: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        activeFilter === filter && styles.activeFilterButton,
      ]}
      onPress={() => setActiveFilter(filter)}
    >
      <Text
        style={[
          styles.filterButtonText,
          activeFilter === filter && styles.activeFilterButtonText,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyTitle}>
        {activeFilter === 'all' && 'No habits yet'}
        {activeFilter === 'today' && 'No daily habits'}
        {activeFilter === 'completed' && 'No completed habits today'}
      </Text>
      <Text style={styles.emptySubtitle}>
        {activeFilter === 'all' && 'Create your first habit to get started!'}
        {activeFilter === 'today' && 'Add daily habits to see them here'}
        {activeFilter === 'completed' && 'Complete some habits to see progress'}
      </Text>
    </View>
  );

  const renderHabitItem = ({ item }: { item: Habit }) => (
    <HabitCard habit={item} />
  );

  const getHabitCount = () => {
    const totalHabits = habits.length;
    const todayHabits = getTodaysHabits().length;
    const completedToday = getCompletedHabits(getTodayDate()).length;

    return { totalHabits, todayHabits, completedToday };
  };

  const { totalHabits, todayHabits, completedToday } = getHabitCount();

  return (
    <ImageBackground
      source={require('../../assets/pexels-shvetsa-3943951.jpg')}
      style={styles.background}
      resizeMode="cover"
      // eslint-disable-next-line react-native/no-inline-styles
      imageStyle={{ opacity: 0.8 }}
      blurRadius={5}
    >
      <View style={styles.overlay}>
        {/* Stats Header */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{totalHabits}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{todayHabits}</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{completedToday}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
        </View>

        {/* Filter Buttons */}
        <View style={styles.filterContainer}>
          {renderFilterButton('all', 'All Habits')}
          {renderFilterButton('today', "Today's Habits")}
          {renderFilterButton('completed', 'Completed')}
        </View>

        {/* Habits List */}
        <FlatList
          data={filteredHabits}
          renderItem={renderHabitItem}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={renderEmptyState}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={filteredHabits.length === 0 ? styles.emptyListContainer : undefined}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  statLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 8,
    gap: 8,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#C7C7CC',
    alignItems: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
  },
  emptyListContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: 'rgb(32, 32, 34)',
    textAlign: 'center',
    lineHeight: 22,
  },
});
