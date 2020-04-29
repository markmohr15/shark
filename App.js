import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet, Text, View, AsyncStorage } from 'react-native';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import TriggerScreen from './screens/TriggerScreen';
import { AppLoading } from 'expo';
import { client } from './utils/Client';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const GET_TOKEN = gql`
  {
    token @client
  }
`;

const App = props => {  
  return(
    <ApolloProvider client={client}>
      <Shark/>
    </ApolloProvider>
  ) 
}

const Shark = () => {
  const [shark, setShark] = useState({
    isReady: false,
  })

  const { data, client } = useQuery(GET_TOKEN);
  console.log('')

  if (!shark.isReady) {
    return (
      <AppLoading
        startAsync={console.log('loading')}
        onFinish={setShark({...shark, ["isReady"]: true })}
        onError={console.warn}
      />
    ); 
  }

  if (!data.token) {
    return (
      <SignIn/>
    )
  } else {
    return (      
      <Application/>
    )
  }

}

function SignIn() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

function Application() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Schedule" component={ScheduleScreen} />
        <Stack.Screen name="Triggers" component={TriggerScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Stack = createStackNavigator();

export default App;