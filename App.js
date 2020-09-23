import React, { useState, useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View, Platform } from 'react-native';
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
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

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
        displayTime
        displayDate
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
    const options = await TaskManager.getTaskOptionsAsync(FETCH_TRIGGERED)
    const triggered = await client.query({
      query: GET_TRIGGERED,
      fetchPolicy: "network-only"
    })
    triggered.data.triggerNotifications.forEach(trigger => parseTrigger(trigger, options.expoPushToken));
    return triggered.data.triggerNotifications.length > 0 ? BackgroundFetch.Result.NewData : BackgroundFetch.Result.NoData;
  } catch (error) {
    return BackgroundFetch.Result.Failed;
  }
});

async function parseTrigger(trigger, expoPushToken) {
  const game = trigger.game
  if (trigger.wagerType == "total") {
    await sendPushNotificationForTotal(expoPushToken, trigger.operator, trigger.wagerType, 
                                       trigger.displayTarget, game.displayTime, game.displayDate, 
                                       game.visitor.shortDisplayName, game.home.shortDisplayName);
  } else {
    await sendPushNotification(expoPushToken, trigger.operator, trigger.wagerType, 
                               trigger.displayTarget, game.displayTime, game.displayDate, 
                               game.visitor.shortDisplayName, game.home.shortDisplayName, 
                               trigger.team.shortDisplayName);
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
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

  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const getSports = async () => {
    const sports = await client.query({
      query: GET_SPORTS,
    })
    client.writeData({data: {sports: sports.data.allSports}})
  }

  const backgroundFetchTriggered = async (expoPushToken) => {
    await BackgroundFetch.registerTaskAsync(FETCH_TRIGGERED, {
        minimumInterval: 5,
        stopOnTerminate: false,
        startOnBoot: true,
        expoPushToken: expoPushToken
    });
  }

  const fetchTriggered = async () => {
    const triggered = await client.query({
      query: GET_TRIGGERED,
      fetchPolicy: "network-only"
    })    
    triggered.data.triggerNotifications.forEach(trigger => parseTrigger(trigger, expoPushToken));
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
    backgroundFetchTriggered(expoPushToken)
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

const displayOperator = (operator, wagerType) => {
  if (wagerType == "total") {
    if (operator == "greater_eq") {
      return "Greater Than or Equal to"
    } else {
      return "Less Than or Equal to"
    }
  } else {
    if (operator == "greater_eq") {
      return "or Better"
    } else {
      return "or Worse"
    }
  }
}

async function sendPushNotification(expoPushToken, operator, wagerType, displayTarget,
                                    gameTime, gameDate, visitorShortDisplayName,
                                    homeShortDisplayName, teamShortDisplayName) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: `${teamShortDisplayName} ${displayTarget} ${displayOperator(operator, wagerType)} triggered`,
    body: `${visitorShortDisplayName} @ ${homeShortDisplayName} starts at ${gameTime} on ${gameDate}`,
  };
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function sendPushNotificationForTotal(expoPushToken, operator, wagerType, displayTarget,
                                            gameTime, gameDate, visitorShortDisplayName,
                                            homeShortDisplayName) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: `${displayOperator(operator, wagerType)} ${displayTarget} triggered`,
    body: `${visitorShortDisplayName} @ ${homeShortDisplayName} starts at ${gameTime} on ${gameDate}`,
  };
  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      console.log('Failed to get push token for push notification!')
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

export default App;