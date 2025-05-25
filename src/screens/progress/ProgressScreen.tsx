import React from 'react';
import { ScrollView } from 'react-native';
import { Container } from '../../components/common/Container';
import { Header } from '../../components/common/Header';
import { ProgressChart } from '../../components/progress/ProgressChart';

export const ProgressScreen: React.FC = () => {
  return (
    <Container style={{ paddingHorizontal: 0 }}>
      <Header title="Progress" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <ProgressChart />
      </ScrollView>
    </Container>
  );
};