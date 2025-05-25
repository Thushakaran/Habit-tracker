import React from 'react';
import { Container } from '../../components/common/Container';
import { LoginForm } from '../../components/auth/LoginForm';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../types';

type LoginScreenNavigationProp = StackNavigationProp<AuthStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <Container>
      <LoginForm onNavigateToRegister={handleNavigateToRegister} />
    </Container>
  );
};