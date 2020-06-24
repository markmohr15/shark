import React from 'react';
import { StyleSheet, View } from 'react-native';
import SharkText from './SharkText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "black",
  },
  main: {
    flex: 9,
  }
})

const ErrorMsg = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <SharkText>
          There was an error: {props.error}
        </SharkText>
      </View>
    </View>
  )
}

export default ErrorMsg;