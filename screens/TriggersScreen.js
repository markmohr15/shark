import React, { useState } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import { Header } from 'react-native-elements';
import Loading from '../components/Loading';
import ErrorMsg from '../components/ErrorMsg';
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
    paddingTop: 30,
    alignItems: 'center',
  },
  key: {
    paddingVertical: 10,
    paddingHorizontal: 2,
    height: 40,
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

const GET_TRIGGERS = gql`
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
        displayHomeMl
        displayHomeRl
        displayHomeSpread
        displayVisitorMl
        displayVisitorRl
        displayVisitorSpread
        displayOver
        displayUnder
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
          id
          abbreviation
          name
        }
      } 
    }
  }    
`;

const TriggersScreen = ({ route, navigation }) => {
  const sportId = parseInt(route.params.sportId)
  const status = route.params.status || ""
  const date = route.params.date
  const showButtons = status == "Open" || status == ""

  React.useEffect(() => {
    const reload = navigation.addListener('focus', () => {
      refetch()
    });

    return reload;
  }, [navigation]);

  const { loading, error, data, refetch } = useQuery(GET_TRIGGERS, {
    variables: { sportId: sportId, status: status, date: date },
    fetchPolicy: "cache-and-network",
  });

  let content;
  if (loading) { 
    content = <Loading/>
  } else if (error) {
    content = <ErrorMsg error={error.message}/>
  } else if (data.triggers.length == 0) {
    content = <View style={styles.none}>
                <SharkText>No Triggers Found</SharkText>
              </View>
  } else {
    content = <>
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
              </>
  }

  return (
    <View style={styles.container}>
      <View style={styles.triggers}>
        <Header
          leftComponent={<LeftHeader status={status}
                                     sportId={sportId}
                                     date={date}
                                     navigation={navigation} /> }
          centerComponent={<CenterHeader status={status}
                                         sportId={sportId}
                                         date={date} 
                                         navigation={navigation} /> }
          rightComponent={<RightHeader status={status}
                                       sportId={sportId}
                                       date={date} 
                                       navigation={navigation} /> }
          containerStyle={{backgroundColor: 'white', justifyContent: 'space-around', marginTop: 0, paddingTop: 0, height: 45}}
          leftContainerStyle={{alignItems: 'center', height: 40, justifyContent: 'center', borderRadius: 1, borderWidth: 1, borderColor: 'black', borderRadius: 8}}
          centerContainerStyle={{justifyContent: 'space-around', flex: 2.2}}
          rightContainerStyle={{alignItems: 'center', height: 40, justifyContent: 'center', borderRadius: 1, borderWidth: 1, borderColor: 'black', borderRadius: 8}}
        />
        {content} 
      </View>
    </View>
  )
}

export default TriggersScreen;