import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { gql } from "apollo-boost";
import { useMutation, useApolloClient } from '@apollo/react-hooks';

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    color: "white"
  },
  error: {
    backgroundColor: "red",
    color: "white",
    padding: 10,
    textAlign: "center"
  }
});

export const SIGN_UP_USER = gql`
  mutation signUp($email: String!, $password: String!, $passwordConfirmation: String!) {
    signUp(input: {attributes: { email: $email, password: $password, passwordConfirmation: $passwordConfirmation}}) {
      email
      token       
    }
  }
`;

const SignUpForm = props => {
  const client = useApolloClient();
  const [signUp, setSignUp] = useState({
    email: '',
    password: '',
    passwordConfirmation: '',
    error: ''
  })

  const [signUpUser] = useMutation(SIGN_UP_USER,
    {
      onCompleted(data) {
        client.writeData({ data: { token: data.signUp.token } })
      },
      onError(error) {
        setSignUp({...signUp, ["error"]: error.graphQLErrors.map(x => x.message).join(", ")})
      }
    }
  );

  const submit = async () => {
    if (!signUp.email) {
      setSignUp({...signUp, ["error"]: "Email cannot be blank"})
    } else {
      signUpUser({ variables: { email: signUp.email, 
                                password: signUp.password,
                                passwordConfirmation: signUp.passwordConfirmation } });
    }
  }

  return (
    <>
      {signUp.error ?
        <Text style={styles.error}>{signUp.error}</Text>
        : <React.Fragment></React.Fragment>
      }
      <Input
        leftIconContainerStyle={{paddingRight: 20}}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder='EMAIL'
        placeholderTextColor="#adacac"
        leftIcon={{ type: 'font-awesome', name: 'envelope', color: "white" }}
        value={signUp.email}
        onChangeText={text => setSignUp({...signUp, ["email"]: text})}
        textContentType="username"
      />
      <Input
        leftIconContainerStyle={{paddingRight: 26, marginLeft: 18}}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder='PASSWORD'
        placeholderTextColor="#adacac"
        leftIcon={{ type: 'font-awesome', name: 'lock', color: "white" }}
        value={signUp.password}
        onChangeText={text => setSignUp({...signUp, ["password"]: text})}
        textContentType="password"
        secureTextEntry={true}
      />
      <Input
        leftIconContainerStyle={{paddingRight: 26, marginLeft: 18}}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholder='PASSWORD CONFIRMATION'
        placeholderTextColor="#adacac"
        leftIcon={{ type: 'font-awesome', name: 'lock', color: "white" }}
        value={signUp.passwordConfirmation}
        onChangeText={text => setSignUp({...signUp, ["passwordConfirmation"]: text})}
        textContentType="password"
        secureTextEntry={true}
      />
      <Button
        title="SIGN UP"
        buttonStyle="raised"
        onPress={submit}
      />
    </>
  )

}

export default SignUpForm;