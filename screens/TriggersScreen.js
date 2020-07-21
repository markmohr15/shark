import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button, ThemeProvider, Header, Text } from 'react-native-elements';
import { useFocusEffect } from '@react-navigation/native';
import { client } from '../utils/Client';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import Loading from '../components/Loading';
import ErrorMsg from '../components/ErrorMsg';
import BottomNav from '../components/BottomNav';
import SharkText from '../components/SharkText';
import LeftHeader from '../components/headers/triggers/Left';
import CenterHeader from '../components/headers/triggers/Center';
import RightHeader from '../components/headers/triggers/Right';
import Trigger from '../components/Trigger';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  triggers: {
    flex: 9,
  },
  none: {
    paddingTop: 20,
    alignItems: 'center',
  },
  key: {
    paddingVertical: 10,
    paddingHorizontal: 2,
    height: 38,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  info: {
    flex: 0.85,
  },
  name: {
    flex: 0.6,
  },
  current: {
    flex: 1,
    alignItems: 'flex-end',
  },
  target: {
    flex: 1.1,
    alignItems: 'flex-end',
  },
  button: {
    flex: 0.6,
    alignItems: 'center',
  },
  
})

export const GET_TRIGGERS = gql`
  query triggers($sportId: Int, $status: String, $date: String){
    triggers(sportId: $sportId, status: $status, date: $date) {
      id
      operator
      status
      target
      displayTarget
      wagerType
      team {
        id
        name
      }
      game {
        id
        displayTime
        channel
        total
        displayHomeMl
        displayHomeRl
        displayHomeSpread
        displayVisitorMl
        displayVisitorRl
        displayVisitorSpread
        home {
          id
          name
          nickname
          shortDisplayName
        }
        visitor {
          id
          name
          nickname
          shortDisplayName
        }
        sport {
          name
        }
      } 
    }
  }    
`;

const TriggersScreen = ({ route, navigation }) => {
  const sportId = parseInt(route.params.sportId)
  const status = route.params.status
  const date = route.params.date
  const showButtons = status == "Open" || status == ""

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch()
    });

    return unsubscribe;
  }, [navigation]);

  const { loading, error, data, refetch } = useQuery(GET_TRIGGERS, {
    variables: { sportId: sportId, status: status, date: date },
    fetchPolicy: "cache-and-network",
  });

  if (loading) return <Loading/>
  if (error) return <ErrorMsg error={error}/>

  return (
    <View style={styles.container}>
      <View style={styles.triggers}>
        <Header
          leftComponent={<LeftHeader status={status}
                                     sportId={route.params.sportId}
                                     date={date}
                                     navigation={navigation} /> }
          centerComponent={<CenterHeader status={status}
                                         sportId={route.params.sportId}
                                         date={date} 
                                         navigation={navigation} /> }
          rightComponent={<RightHeader status={status}
                                       sportId={route.params.sportId}
                                       date={date} 
                                       navigation={navigation} /> }
          containerStyle={{backgroundColor: 'white', justifyContent: 'space-around'}}
          centerContainerStyle={{justifyContent: 'space-around'}}
        />
        {data.triggers.length == 0 ? 
          <View style={styles.none}>
            <SharkText>No Triggers Found</SharkText>
          </View>
        :
          <React.Fragment>
            <View style={styles.key}>
              <View style={styles.row}>
                <View style={styles.info}></View>
                <View style={styles.name}></View>
                <View style={styles.current}>
                  <SharkText>Current</SharkText>
                </View>
                <View style={styles.target}>
                  <SharkText>Target</SharkText>
                </View>
                { showButtons ?
                  <React.Fragment>
                    <View style={styles.button}>
                      <SharkText>Edit</SharkText>
                    </View>
                    <View style={styles.button}>
                      <SharkText>Cancel</SharkText>
                    </View>
                  </React.Fragment>
                :
                  <React.Fragment>
                    <View style={styles.button}></View>
                    <View style={styles.button}></View>
                  </React.Fragment>
                }
              </View>
            </View>
            <ScrollView> 
              {data.triggers.map(trigger => (
                <Trigger key={trigger.id}
                         trigger={trigger} 
                         navigation={navigation} 
                         status={status}  />
              ))}
            </ScrollView>
          </React.Fragment>
        }
      </View>
      <BottomNav search={true}
                 navigation={navigation} />
    </View>
  )
}

export default TriggersScreen;