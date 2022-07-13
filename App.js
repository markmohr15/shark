import Bugsnag from '@bugsnag/expo';
Bugsnag.start();

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Image, StyleSheet, Text, View, Platform } from 'react-native';
import ErrorScreen from './screens/ErrorScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ScheduleScreen from './screens/ScheduleScreen';
import TriggersScreen from './screens/TriggersScreen';
import TriggerFormScreen from './screens/TriggerFormScreen';
import GameOddsScreen from './screens/GameOddsScreen';
import GameInfoScreen from './screens/GameInfoScreen';
import SearchScreen from './screens/SearchScreen';
import SettingsScreen from './screens/SettingsScreen';
import SignOut from './components/SignOut';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistCache } from 'apollo3-cache-persist';
import { ApolloProvider, ApolloLink, useQuery, useApolloClient, gql, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import moment from 'moment';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import Loading from './components/Loading';
import ErrorMsg from './components/ErrorMsg';

const FETCH_TRIGGERED = 'background-fetch';

const ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const GET_TOKEN = gql`
  query token {
    token
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
      tag
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
    if (!options.token) return BackgroundFetch.BackgroundFetchResult.NoData;
    const cache = new InMemoryCache()
    const client = new ApolloClient({
      cache: cache,
      uri: 'https://sharksb-api.herokuapp.com/graphql',
      //uri: 'https://659b-72-206-127-200.ngrok.io/graphql',
      headers: {
        authorization: "Bearer " + options.token,
      }
    });
    const triggered = await client.query({
      query: GET_TRIGGERED,
      fetchPolicy: "network-only"
    })
    triggered.data.triggerNotifications.forEach(trigger => parseTrigger(trigger, options.expoPushToken));
    return triggered.data.triggerNotifications.length > 0 ? BackgroundFetch.BackgroundFetchResult.NewData : BackgroundFetch.BackgroundFetchResult.NoData;
  } catch (error) {
    return BackgroundFetch.BackgroundFetchResult.Failed;
  }
});

async function parseTrigger(trigger, expoPushToken) {
  const game = trigger.game
  if (trigger.wagerType == "total") {
    await sendPushNotificationForTotal(expoPushToken, trigger.operator, trigger.wagerType, 
                                       trigger.displayTarget, game.displayTime, game.displayDate, 
                                       game.visitor.shortDisplayName, game.home.shortDisplayName,
                                       trigger.tag);
  } else {
    await sendPushNotification(expoPushToken, trigger.operator, trigger.wagerType, 
                               trigger.displayTarget, game.displayTime, game.displayDate, 
                               game.visitor.shortDisplayName, game.home.shortDisplayName, 
                               trigger.team.shortDisplayName, trigger.tag);
  }
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const App = (props) => {
  const [client, setClient] = useState(undefined);

  useEffect(() => {
    const httpLink = createHttpLink({
      //uri: 'https://659b-72-206-127-200.ngrok.io/graphql',
      uri: 'https://sharksb-api.herokuapp.com/graphql',
    });

    const authLink = setContext(async () => {
      const userToken = client.readQuery({query: GET_TOKEN});
      return {
        headers: {
          Authorization: userToken.token ? `Bearer ${userToken.token}` : "",
        },
      }
    });

    const link = ApolloLink.from([authLink, httpLink])

    const cache = new InMemoryCache()

    const client = new ApolloClient({
      link: link,
      cache: cache,
    });

    client.writeQuery({query: GET_TOKEN, data: {"token": ""}})

    persistCache({
      cache,
      storage: AsyncStorage
    }).then(() => {
      setClient(client);
    });
    return () => {};
  }, []);
 
  if (client === undefined) return <Loading/>

  return(
    <ApolloProvider client={client}><Shark/></ApolloProvider>
  ) 
}

const Shark = (props) => {
  const client = useApolloClient();
  const [appIsReady, setAppIsReady] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { data } = useQuery(GET_TOKEN);

  const backgroundFetchTriggered = async () => {
    await BackgroundFetch.registerTaskAsync(FETCH_TRIGGERED, {
        minimumInterval: 5,
        stopOnTerminate: false,
        startOnBoot: true,
        expoPushToken: (await Notifications.getExpoPushTokenAsync()).data,
        token: data.token
    });
  }

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

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.

      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  } else if (data && data.token) {
    backgroundFetchTriggered()
    onLayoutRootView()
    return (
      <Root/>
    )
  } else {
    onLayoutRootView()
    return (      
      <SignIn/>
    )
  }
}

const SignIn = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Root = (props) => {
  const client = useApolloClient();
  const { data } = useQuery(GET_TOKEN);
  let timer = ''

  const fetchTriggered = async () => {
    const expoToken = (await Notifications.getExpoPushTokenAsync()).data
    if (expoToken) {
      const triggered = await client.query({
        query: GET_TRIGGERED,
        fetchPolicy: "network-only"
      })
      triggered.data.triggerNotifications.forEach(trigger => parseTrigger(trigger, expoToken));
    } else {
      Bugsnag.notify(new Error('expo push token not set'))
    }
    clearTimeout(timer)
    timer = setTimeout(fetchTriggered, 30000)
  }

  useEffect(() => {
    clearTimeout(timer)
    fetchTriggered()
  }, []);

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
        <RootStack.Screen name="Game Odds" 
                          component={GameOddsScreen}
                          options={{headerBackTitleVisible: false}} />
        <RootStack.Screen name="Game Info" 
                          component={GameInfoScreen}
                          options={{headerBackTitleVisible: false}} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

const Application = (navigation) => {
  const client = useApolloClient();
  const { loading, error, data, refetch } = useQuery(GET_SPORTS, {
    fetchPolicy: "cache-and-network",
    pollInterval: 1800000
  });

  const today = () => {
    return moment(new Date()).format('YYYY-MM-DD')
  }

  if (loading) return <Loading/>
  if (error) return <ErrorMsg error={error.message}/>

  return (
    <Drawer.Navigator initialRouteName="Triggers">
      {data.allSports.map((sport) => (
        <Drawer.Screen name={sport.abbreviation} 
                       component={ScheduleScreen}
                       key={sport.id} 
                       initialParams={{sportId: sport.id, 
                                       abbreviation: sport.abbreviation,
                                       date: today(),
                                       status: "All"}} />    
      ))}
      <Drawer.Screen name="Triggers" 
                     component={TriggersScreen}
                     initialParams={{sportId: '', 
                                     status: 'Open',
                                     date: today()}} />
      <Drawer.Screen name="Search" component={SearchScreen} />
      <Drawer.Screen name="Settings" component={SettingsScreen} />
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
                                    homeShortDisplayName, teamShortDisplayName, tag) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: `${teamShortDisplayName} ${displayTarget} ${displayOperator(operator, wagerType)} triggered`,
    body: `${visitorShortDisplayName} @ ${homeShortDisplayName} starts at ${gameTime} on ${gameDate}`,
    tag: tag
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
                                            homeShortDisplayName, tag) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title: `${displayOperator(operator, wagerType)} ${displayTarget} triggered`,
    body: `${visitorShortDisplayName} @ ${homeShortDisplayName} starts at ${gameTime} on ${gameDate}`,
    tag: tag,
    priority: 'high'
  };
  const msg = await fetch('https://exp.host/--/api/v2/push/send', {
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
  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
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

export default () =>
  <ErrorBoundary FallbackComponent={ErrorScreen}>
    <App />
  </ErrorBoundary>
