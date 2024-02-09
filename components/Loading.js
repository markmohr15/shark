import React from 'react';
import { StyleSheet, View } from 'react-native';
import SharkText from './SharkText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: 'center',
    backgroundColor: "black",
  },
  main: {
    flex: 9,
  }
})

const Loading = (props) => {
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <SharkText>
          Loading.....
        </SharkText>
      </View>
    </View>
  )
}

export default Loading;