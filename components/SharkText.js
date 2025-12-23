import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 14,
  },
  muted: {
    color: "#6c757d"
  }
});

const SharkText = ({children, muted = false}) => {
  return (
    <Text style={muted ? styles.muted : styles.text}>
      {children}
    </Text>
  )
}

export default SharkText;