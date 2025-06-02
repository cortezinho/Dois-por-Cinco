import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function CreateTournamentScreen({ navigation }) {
  const [tournamentName, setTournamentName] = useState('');

  const handleCreate = () => {
    // Aqui você pode colocar a lógica de criação de torneio
    alert(`Torneio "${tournamentName}" criado!`);
    setTournamentName('');
    navigation.navigate('ViewTournament', { name: tournamentName });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Criar Torneio</Text>
      <TextInput
        placeholder="Nome do Torneio"
        value={tournamentName}
        onChangeText={setTournamentName}
        style={styles.input}
      />
      <Button title="Criar" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 20, borderRadius: 5 }
});