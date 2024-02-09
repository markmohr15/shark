import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useMutation, useApolloClient, gql } from "@apollo/client";

const styles = StyleSheet.create({
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

const SIGN_IN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(input: {email: $email, password: $password}) {
      email
      token
    }
  }
`;

const GET_TOKEN = gql`
  query token {
    token
  }
`;

const SignInForm = props => {
  const client = useApolloClient();
  const [signIn, setSignIn] = useState({
    email: '',
    password: '',
    error: ''
  })

  const [signInUser] = useMutation(SIGN_IN_USER,
    {
      onCompleted(data) {
        client.writeQuery({query: GET_TOKEN, data: {"token": data.login.token}})
      },
      onError(error) {
        console.log(error)
        setSignIn({...signIn, ["error"]: "Wrong Email/Password"})
      }
    }
  );
    
  const submit = async () => {
    signInUser({ variables: { email: signIn.email, password: signIn.password } });
  }

  return (
    <>
      {signIn.error ?
        <Text style={styles.error}>{signIn.error}</Text>
        : <React.Fragment></React.Fragment>
      }
      <Input
        leftIconContainerStyle={{paddingRight: 20}}
        inputStyle={styles.input}
        placeholder='EMAIL'
        placeholderTextColor="#adacac"
        leftIcon={{ type: 'font-awesome', name: 'envelope', color: 'white' }}
        value={signIn.email}
        onChangeText={text => setSignIn({...signIn, ["email"]: text})}
        textContentType="username"
      />
      <Input
        leftIconContainerStyle={{paddingRight: 25, marginLeft: 5}}
        inputStyle={styles.input}
        placeholder='PASSWORD'
        placeholderTextColor="#adacac"
        leftIcon={{ type: 'font-awesome', name: 'lock', color: 'white' }}
        value={signIn.password}
        onChangeText={text => setSignIn({...signIn, ["password"]: text})}
        textContentType="password"
        secureTextEntry={true}
      />
      <Button
        title="SIGN IN"
        onPress={submit}
      />
      
    </>
  )

}

export default SignInForm;