import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {Button} from '../common/Button';
import {useHabits} from '../../context/HabitContext';

interface HabitFormProps {
  onHabitCreated?: () => void;
}

export const HabitForm: React.FC<HabitFormProps> = ({onHabitCreated}) => {
  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [isLoading, setIsLoading] = useState(false);
  const {addHabit} = useHabits();

  const handleCreateHabit = async () => {
    if (!habitName.trim()) {
      Alert.alert('Error', 'Please enter a habit name');
      return;
    }

    setIsLoading(true);
    try {
      await addHabit(habitName.trim(), frequency);
      setHabitName('');
      setFrequency('daily');
      Alert.alert('Success', 'Habit created successfully!');
      onHabitCreated?.();
    } catch (error) {
      Alert.alert('Error', 'Failed to create habit. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/pexels-karolina-grabowska-5908822.jpg')}
      style={styles.background}
      resizeMode="cover"
      // eslint-disable-next-line react-native/no-inline-styles
      imageStyle={{opacity: 0.8}}
      blurRadius={5}>
      <View style={styles.container}>
        <Text style={styles.title}>Create New Habit</Text>
        <Text style={styles.subtitle}>
          Build a new positive habit to track daily
        </Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Habit Name</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Exercise, Read, Drink Water"
            value={habitName}
            onChangeText={setHabitName}
            maxLength={50}
          />
          <Text style={styles.characterCount}>{habitName.length}/50</Text>
        </View>

        <View style={styles.frequencyContainer}>
          <Text style={styles.label}>Frequency</Text>
          <View style={styles.frequencyOptions}>
            <TouchableOpacity
              style={[
                styles.frequencyOption,
                frequency === 'daily' && styles.selectedFrequency,
              ]}
              onPress={() => setFrequency('daily')}>
              <Text
                style={[
                  styles.frequencyText,
                  frequency === 'daily' && styles.selectedFrequencyText,
                ]}>
                Daily
              </Text>
              <Text
                style={[
                  styles.frequencyDescription,
                  frequency === 'daily' && styles.selectedFrequencyDescription,
                ]}>
                Every day
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.frequencyOption,
                frequency === 'weekly' && styles.selectedFrequency,
              ]}
              onPress={() => setFrequency('weekly')}>
              <Text
                style={[
                  styles.frequencyText,
                  frequency === 'weekly' && styles.selectedFrequencyText,
                ]}>
                Weekly
              </Text>
              <Text
                style={[
                  styles.frequencyDescription,
                  frequency === 'weekly' && styles.selectedFrequencyDescription,
                ]}>
                Once a week
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <Button
          title={isLoading ? 'Creating...' : 'Create Habit'}
          onPress={handleCreateHabit}
          disabled={isLoading || !habitName.trim()}
          variant="success"
          style={styles.createButton}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1C1C1E',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: 'rgb(32, 32, 34)',
    marginBottom: 32,
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1C1C1E',
  },
  input: {
    borderWidth: 1,
    borderColor: '#C7C7CC',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#F2F2F7',
  },
  characterCount: {
    textAlign: 'right',
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 4,
  },
  frequencyContainer: {
    marginBottom: 32,
  },
  frequencyOptions: {
    flexDirection: 'row',
    gap: 12,
  },
  frequencyOption: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#C7C7CC',
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
  },
  selectedFrequency: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  frequencyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  selectedFrequencyText: {
    color: '#FFFFFF',
  },
  frequencyDescription: {
    fontSize: 14,
    color: '#8E8E93',
  },
  selectedFrequencyDescription: {
    color: '#FFFFFF',
  },
  createButton: {
    marginTop: 20,
  },
});
