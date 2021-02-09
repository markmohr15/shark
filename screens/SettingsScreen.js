import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import SharkText from '../components/SharkText';
import SettingsForm from '../components/SettingsForm';
import Loading from '../components/Loading';
import ErrorMsg from '../components/ErrorMsg';
import { ApolloProvider, useQuery, gql } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "black",
  },
  message: {
    flex: 1,
    paddingTop: 70,
    paddingLeft: 15,
    paddingRight: 15,
  },
  form: {
    flex: 8,
    paddingTop: 30,
  },
});

const GET_SPORTSBOOKS = gql`
  query sportsbooks{
    sportsbooks {
      name
    }
  }    
`;

const SettingsScreen = ({ navigation }) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refetch()
    });

    return unsubscribe;
  }, [navigation]);

  const { loading, error, data, refetch } = useQuery(GET_SPORTSBOOKS, {
    fetchPolicy: "cache-and-network"
  });

  if (loading) return <Loading/>
  if (error) return <ErrorMsg error={error.message}/>

  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <SharkText>Select which sportsbooks you would like us to use for lines and triggers</SharkText>
      </View>
      <View style={styles.form}>
        { data.sportsbooks.length == 0 ?
          <SettingsForm sportsbooks={[]}/>
        :
          <SettingsForm sportsbooks={data.sportsbooks.map(x => x.name)}/>
        }
      </View>
      <BottomNav search={true}
                 navigation={navigation}
      />
    </View>
  );
}

export default SettingsScreen;
