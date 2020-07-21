import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button, Input, Text, Header, ThemeProvider } from 'react-native-elements';
import { client } from '../utils/Client';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import Loading from '../components/Loading';
import ErrorMsg from '../components/ErrorMsg';
import BottomNav from '../components/BottomNav';
import SharkText from '../components/SharkText';
import CenterHeader from '../components/headers/schedule/Center';
import LeftHeader from '../components/headers/schedule/Left';
import MlbGame from '../components/MlbGame';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  none: {
    paddingTop: 20,
    alignItems: 'center',
  },
  schedule: {
    flex: 9,
  },
})

const GET_GAMES_BY_SPORT_AND_DATE = gql`
  query gamesBySportAndDate($sportId: Int!, $date: String!){
    gamesBySportAndDate(sportId: $sportId, date: $date) {
      id
      displayHomeMl
      displayHomeRl
      homeRot
      displayVisitorMl
      displayVisitorRl
      visitorRot
      total
      spread
      displayHomeSpread
      displayVisitorSpread
      status
      displayTime
      channel
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
    }
  }    
`;


const ScheduleScreen = ({ route, navigation }) => {
  const sportId = parseInt(route.params.sportId)
  const abbreviation = route.params.abbreviation
  const date = route.params.date

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch()
    });

    return unsubscribe;
  }, [navigation]);

  const { loading, error, data, refetch } = useQuery(GET_GAMES_BY_SPORT_AND_DATE, {
    variables: { sportId: sportId, date: date },
    fetchPolicy: "cache-and-network",
    pollInterval: 120000
  });

  if (loading) return <Loading/>
  if (error) return <ErrorMsg error={error}/>

  return (
    <View style={styles.container}>
      <View style={styles.schedule}>
        <Header
          leftComponent={<LeftHeader abbreviation={abbreviation}
                                     sportId={route.params.sportId}
                                     date={date}
                                     navigation={navigation} /> }
          centerComponent={<CenterHeader abbreviation={abbreviation}
                                         sportId={route.params.sportId}
                                         date={date} 
                                         navigation={navigation} /> }
          containerStyle={{backgroundColor: 'white', justifyContent: 'space-around'}}
          centerContainerStyle={{justifyContent: 'space-around'}}
        />
        {data.gamesBySportAndDate.length == 0 ? 
          <View style={styles.none}>
            <SharkText>No Games Scheduled</SharkText>
          </View>
        :  
          <ScrollView> 
            {data.gamesBySportAndDate.map(game => (
              <MlbGame key={game.id}
                       game={game} 
                       navigation={navigation} />
            ))}
          </ScrollView>
        }
      </View>
      <BottomNav search={true}
                 navigation={navigation} />
    </View>
  );

}

export default ScheduleScreen;