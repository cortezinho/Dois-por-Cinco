import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ViewTournamentScreen({ route }) {
  const { name } = route.params || { name: 'Torneio Desconhecido' };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visualizar Torneio</Text>
      <Text style={styles.tournamentName}>{name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  tournamentName: { fontSize: 18, fontStyle: 'italic' }
});