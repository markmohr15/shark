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

const SharkText = (props) => {
  return (
    <Text style={props.muted ? styles.muted : styles.text}>
      {props.children}
    </Text>
  )
}

export default SharkText;