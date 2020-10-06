import * as React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Button, Image } from 'react-native-elements';
import SignUpForm from '../components/SignUpForm';
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
  signIn: {
    flex: 1,
  },
  
});

function SignUpScreen({ navigation }) {
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
        <SignUpForm/>
      </View>
      <View style={styles.signIn}>
        <Button title="SIGN IN"
                onPress={() => navigation.navigate('Sign In')}
                buttonStyle="raised"
        />
      </View>
    </KeyboardAvoidingView>
  );
}

export default SignUpScreen;