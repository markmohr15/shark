import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Platform } from 'react-native';
import { Header } from 'react-native-elements';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import Loading from '../components/Loading';
import ErrorMsg from '../components/ErrorMsg';
import SharkText from '../components/SharkText';
import LeftHeader from '../components/headers/schedule/Left';
import RightHeader from '../components/headers/schedule/Right';
import Game from '../components/Game';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  none: {
    paddingTop: 30,
    alignItems: 'center',
  },
  schedule: {
    flex: 9,
  },
})

const GET_GAMES_BY_SPORT_AND_DATE = gql`
  query gamesBySportAndDate($sportId: Int!, $date: String!, $status: String!){
    gamesBySportAndDate(sportId: $sportId, date: $date, status: $status) {
      id
      displayHomeSpread
      displayHomeMl
      displayHomeRl
      homeRot
      displayVisitorSpread
      displayVisitorMl
      displayVisitorRl
      visitorRot
      displayOver
      displayUnder
      displayOverOdds
      displayUnderOdds
      status
      displayTime
      channel
      sport {
        id
        abbreviation
        name
      }
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
  const status = route.params.status

  React.useEffect(() => {
    const reload = navigation.addListener('focus', () => {
      refetch()
    });

    return reload;
  }, [navigation]);

  const { loading, error, data, refetch } = useQuery(GET_GAMES_BY_SPORT_AND_DATE, {
    variables: { sportId: sportId, date: date, status: status },
    fetchPolicy: "cache-first",
    pollInterval: 120000
  });

  let content;
  if (loading) {
    content = <Loading/>
  } else if (error) {
    content = <ErrorMsg error={error.message} />
  } else if (data.gamesBySportAndDate.length == 0 && status == 'Open') {
    content = <View style={styles.none}>
                <SharkText>No Open Games</SharkText>
              </View>
  } else if (data.gamesBySportAndDate.length == 0) {
    content = <View style={styles.none}>
                <SharkText>No Games</SharkText>
              </View>
  } else {
    content = <ScrollView> 
                {data.gamesBySportAndDate.map(game => (
                  <Game key={game.id}
                        game={game} 
                        navigation={navigation} />
                ))}
              </ScrollView>
  }

  return (
    <View style={styles.container}>
      <View style={styles.schedule}>
        <Header
          leftComponent={<LeftHeader abbreviation={abbreviation}
                                     sportId={sportId}
                                     date={date} 
                                     navigation={navigation}
                                     status={status} /> }
          rightComponent={<RightHeader abbreviation={abbreviation}
                                       sportId={route.params.sportId}
                                       date={date} 
                                       navigation={navigation}
                                       status={status} /> }
          containerStyle={{backgroundColor: 'white', marginTop: 0, paddingTop: 0, height: 45}}
          leftContainerStyle={{justifyContent: 'space-around', flex: 6.5 }}
          rightContainerStyle={{flex: 3, justifyContent: 'space-around', alignItems: 'center', justifyContent: 'center', borderRadius: 1, borderWidth: 1, borderColor: 'black', borderRadius: 8}}
        />
        {content}
      </View>
    </View>
  );

}

export default ScheduleScreen;