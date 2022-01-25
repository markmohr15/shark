import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import Loading from '../components/Loading';
import ErrorMsg from '../components/ErrorMsg';
import SharkText from '../components/SharkText';
import GameInfo from '../components/GameInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 2,
    paddingHorizontal: 2,
    backgroundColor: "black",
  },
});

const GET_GAME_INFO = gql`
  query game($id: ID!){
    game(id: $id) {
      id
      status
      displayTime
      channel
      sport {
        id
        abbreviation
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

const GameInfoScreen = ({ route, navigation }) => {

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch()
    });

    return unsubscribe;
  }, [navigation]);

  const { loading, error, data, refetch } = useQuery(GET_GAME_INFO, {
    variables: { id: route.params.game.id },
    fetchPolicy: "cache-first",
    pollInterval: 120000
  });

  if (loading) return <Loading/>
  if (error) return <ErrorMsg error={error.message}/>

  return (
    <View style={styles.container}>
      <GameInfo game={data.game}/>
    </View>
  );
}

export default GameInfoScreen;