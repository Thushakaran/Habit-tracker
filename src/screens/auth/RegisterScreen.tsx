import React from 'react';
import { Container } from '../../components/common/Container';
import { RegisterForm } from '../../components/auth/RegisterForm';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../types';

type RegisterScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Register'>;

interface RegisterScreenProps {
  navigation: RegisterScreenNavigationProp;
}

export const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const handleNavigateToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <Container>
      <RegisterForm onNavigateToLogin={handleNavigateToLogin} />
    </Container>
  );
};