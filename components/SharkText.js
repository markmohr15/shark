import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 14,
  }
});

const SharkText = (props) => {
  return (
    <Text style={styles.text}>
      {props.children}
    </Text>
  )
}

export default SharkText;