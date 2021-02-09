import React from 'react';
import { StyleSheet, View } from 'react-native';
import SharkText from './SharkText';
import SignOut from './SignOut';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "black",
  },
  error: {
    flex: 2,
    paddingTop: 10,
  },
  message: {
    flex: 5
  }
})

const ErrorMsg = (props) => {
  if (props.error == "Authentication Error") {
    return <SignOut/>
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.error}>
          <SharkText>
            There was an error: {props.error}.
          </SharkText>
        </View>
        <View style={styles.message}>
          <SharkText>
            Please try the back button or try force closing the app.
          </SharkText>
        </View>
      </View>
    )
  }
}

export default ErrorMsg;