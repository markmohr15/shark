import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Header } from 'react-native-elements';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import Loading from '../components/Loading';
import ErrorMsg from '../components/ErrorMsg';
import BottomNav from '../components/BottomNav';
import SharkText from '../components/SharkText';
import CenterHeader from '../components/headers/schedule/Center';
import LeftHeader from '../components/headers/schedule/Left';
import RightHeader from '../components/headers/schedule/Right';
import Game from '../components/Game';

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
    const unsubscribe = navigation.addListener('focus', () => {
      refetch()
    });

    return unsubscribe;
  }, [navigation]);

  const { loading, error, data, refetch } = useQuery(GET_GAMES_BY_SPORT_AND_DATE, {
    variables: { sportId: sportId, date: date, status: status },
    fetchPolicy: "cache-and-network",
    pollInterval: 120000
  });

  if (loading) return <Loading/>
  if (error) return <ErrorMsg error={error.message}/>

  return (
    <View style={styles.container}>
      <View style={styles.schedule}>
        <Header
          leftComponent={<LeftHeader abbreviation={abbreviation}
                                     sportId={route.params.sportId}
                                     date={date}
                                     navigation={navigation}
                                     status={status} /> }
          centerComponent={<CenterHeader abbreviation={abbreviation}
                                         sportId={route.params.sportId}
                                         date={date} 
                                         navigation={navigation}
                                         status={status} /> }
          rightComponent={<RightHeader abbreviation={abbreviation}
                                       sportId={route.params.sportId}
                                       date={date} 
                                       navigation={navigation}
                                       status={status} /> }
          containerStyle={{backgroundColor: 'white', justifyContent: 'space-around'}}
          leftContainerStyle={{alignItems: 'center', height: 40, justifyContent: 'center', borderRadius: 1, borderWidth: 1, borderColor: 'black', borderRadius: 8}}
          centerContainerStyle={{justifyContent: 'space-around', flex: 2.2}}
          rightContainerStyle={{alignItems: 'center', height: 40, justifyContent: 'center', borderRadius: 1, borderWidth: 1, borderColor: 'black', borderRadius: 8}}
        />
        {data.gamesBySportAndDate.length == 0 ? 
          <View style={styles.none}>
            <SharkText>No Open Games</SharkText>
          </View>
        :  
          <ScrollView> 
            {data.gamesBySportAndDate.map(game => (
              <Game key={game.id}
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