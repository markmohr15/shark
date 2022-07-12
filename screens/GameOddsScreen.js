import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { ApolloProvider, useQuery, gql } from '@apollo/client';
import Loading from '../components/Loading';
import ErrorMsg from '../components/ErrorMsg';
import SharkText from '../components/SharkText';
import GameLine from '../components/GameLine';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 2,
    paddingHorizontal: 2,
    backgroundColor: "black",
  },
  none: {
    paddingTop: 20,
    alignItems: 'center',
  },
})

const GET_GAME_LINES = gql`
  query game($id: ID!){
    game(id: $id) {
      id
      status
      home {
        id
        shortDisplayName
      }
      visitor {
        id
        shortDisplayName
      }
      lastLines {
        id
        displayHomeMl
        displayHomeRl
        displayHomeSpread
        displayOverOdds
        displayOver
        displayUnder
        displayUnderOdds
        displayVisitorMl
        displayVisitorRl
        displayVisitorSpread
        sportsbook {
          abbreviation
        }
      }
    }
  }    
`;

const GameOddsScreen = ({ route, navigation }) => {

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch()
    });

    return unsubscribe;
  }, [navigation]);

  const { loading, error, data, refetch } = useQuery(GET_GAME_LINES, {
    variables: { id: route.params.game.id },
    fetchPolicy: "cache-first",
    pollInterval: 120000
  });

  if (loading) return <Loading/>
  if (error) return <ErrorMsg error={error.message}/>

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        {data.game.lastLines.length == 0 ?
          <View style={styles.none}>
            <SharkText>No Lines Found</SharkText>
          </View>
        :
          <ScrollView>
            {data.game.lastLines.map(line => (
              <GameLine game={route.params.game}
                        line={line}
                        key={line.id} />
            ))}
          </ScrollView>
        }
      </View>
    </KeyboardAvoidingView>
  );
}

export default GameOddsScreen;