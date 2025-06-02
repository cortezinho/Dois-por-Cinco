import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import CreateTournamentScreen from './src/screens/CreateTournamentScreen';
import ViewTournamentScreen from './src/screens/ViewTournamentScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Registrar' }} />
        <Stack.Screen name="CreateTournament" component={CreateTournamentScreen} options={{ title: 'Criar Torneio' }} />
        <Stack.Screen name="ViewTournament" component={ViewTournamentScreen} options={{ title: 'Visualizar Torneio' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
