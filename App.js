import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View } from 'react-native';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import TriggersScreen from './screens/TriggersScreen';
import TriggerFormScreen from './screens/TriggerFormScreen';
import SearchScreen from './screens/SearchScreen';
import SignOut from './components/SignOut';
import { AppLoading } from 'expo';
import { client } from './utils/Client';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import moment from 'moment';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';

const FETCH_TRIGGERED = 'background-fetch';

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

const GET_SPORTS = gql`
  query allSports {
    allSports {
      id
      abbreviation
      name
    }
  }        
`;

const GET_TRIGGERED = gql`
  query triggerNotifications {
    triggerNotifications {
      id
      operator
      target
      wagerType
      gametime
      displayTarget
      game {
        id
        visitor {
          id
          shortDisplayName
        }
        home {
          id
          shortDisplayName
        }
      }
      team {
        id
        shortDisplayName
      }
    }
  }        
`;

TaskManager.defineTask(FETCH_TRIGGERED, async () => {
  try {
    const triggered = await client.query({
      query: GET_TRIGGERED,
      fetchPolicy: "network-only"
    })
    console.log('just background fetched')
    console.log(triggered)
    return BackgroundFetch.Result.NewData;
    //return receivedNewData ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
  } catch (error) {
    return BackgroundFetch.Result.Failed;
  }
});

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

  const getSports = async () => {
    const sports = await client.query({
      query: GET_SPORTS,
    })
    client.writeData({data: {sports: sports.data.allSports}})
  }

  const backgroundFetchTriggered = async () => {
    await BackgroundFetch.registerTaskAsync(FETCH_TRIGGERED, {
        minimumInterval: 30,
        stopOnTerminate: false,
        startOnBoot: true,
    });
  }

  const fetchTriggered = async () => {
    const triggered = await client.query({
      query: GET_TRIGGERED,
      fetchPolicy: "network-only"
    })
    console.log(triggered)
    console.log('just fetched')
    setTimeout(fetchTriggered, 30000)
  }

  const { data, client } = useQuery(GET_TOKEN);

  if (!shark.isReady) {
    return (
      <AppLoading
        startAsync={getSports()}
        onFinish={setShark({["isReady"]: true })}
        onError={console.warn}
      />
    ); 
  } else if (data.token) {
    backgroundFetchTriggered()
    fetchTriggered()
    return (
      <Root/>
    )
  } else {
    return (      
      <SignIn/>
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

function Root(props) {
  return (
    <NavigationContainer>
      <RootStack.Navigator mode="modal">
        <RootStack.Screen name="Application"
                          component={Application}
                          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Trigger Form" 
                          component={TriggerFormScreen}
                          options={{headerBackTitleVisible: false}} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const Application = (navigation) => {
  const sports = client.readQuery({query: GET_SPORTS}).allSports
  
  const today = () => {
    return moment(new Date()).format('YYYY-MM-DD')
  }

  return (
    <Drawer.Navigator initialRouteName="Triggers">
      {sports.map((sport) => (
        <Drawer.Screen name={sport.abbreviation} 
                       component={ScheduleScreen}
                       key={sport.id} 
                       initialParams={{sportId: sport.id, 
                                       abbreviation: sport.abbreviation,
                                       date: today()}} />    
      ))}
      <Drawer.Screen name="Triggers" 
                     component={TriggersScreen}
                     initialParams={{sportId: '', 
                                     status: 'Open',
                                     date: today()}} />    
      <Drawer.Screen name="Search" component={SearchScreen} />
      <Drawer.Screen name="Sign Out" component={SignOut} />
    </Drawer.Navigator>
  )
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const RootStack = createStackNavigator();



export default App;