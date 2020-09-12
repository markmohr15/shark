import * as React from 'react';
import { Button, StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Image, ThemeProvider } from 'react-native-elements';
import SignInForm from '../components/SignInForm';
import shark from '../assets/black-shark.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "black",
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
    paddingBottom: 20,
  },
  signUp: {
    flex: 1,
  },
  
});

function SignInScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Image style={styles.logo}
               source={shark}
        />
      </View>
      <View style={styles.form}>
        <SignInForm/>
      </View>
      <View style={styles.signUp}>
        <Button title="SIGN UP"
                onPress={() => console.log('ppp')}
                buttonStyle="raised"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignInScreen;