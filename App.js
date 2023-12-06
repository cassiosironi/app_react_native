import React from 'react';
import { StyleSheet, View } from 'react-native';
import Title from './src/components/Title';
import Menu from './src/components/Menu';

export default function App() {

  return (
    <View style={styles.container}>
      <Title />
      <Menu />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
    position: 'relative',
  },
});
