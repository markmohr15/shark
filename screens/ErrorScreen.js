import * as React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { Image } from 'react-native-elements';
import shark from '../assets/black-shark.png';
import SharkText from '../components/SharkText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "black",
  },
  inner: {
    flex: 1
  },
  logoContainer: {
    flex: 2,
    alignItems: "center",
  },
  logo: {
    width: 125,
    height: 125,
  },
  form: {
    flex: 3,
    paddingBottom: 60,
    alignItems: "center"
  },
});

function ErrorScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>
        <View style={styles.logoContainer}>
          <Image style={styles.logo}
                 source={shark}
          />
        </View>
        <View style={styles.form}>
          <SharkText> There was a problem. Please force close the app and try again. </SharkText>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default ErrorScreen;