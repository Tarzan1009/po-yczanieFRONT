import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Regform from "./app/components/Regform";

export default function App() {
  return (
    <View style={styles.container}>
      <Regform />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#121212",
    paddingLeft: 60,
    paddingRight: 60
  },
});
