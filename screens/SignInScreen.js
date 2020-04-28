import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Image, ThemeProvider } from 'react-native-elements';
import SignInForm from '../components/SignInForm';
import shark from '../assets/shankpng.png';

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
    <View style={styles.container}>
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
                onPress={() => navigation.navigate('Sign Up')}
                buttonStyle="raised"
        />
      </View>
    </View>
  );
}

export default SignInScreen;