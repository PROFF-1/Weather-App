import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Home from './Src/Screens/Home'

export default function App() {
  return (
    <SafeAreaView >
      <Home/>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}


