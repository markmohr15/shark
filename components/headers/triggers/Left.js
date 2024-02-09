import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useQuery, useApolloClient, gql } from '@apollo/client';
import RNPickerSelect from 'react-native-picker-select';
import { headerPickerSelectStyles } from '../../../styles/PickerSelectStyles';

const styles = StyleSheet.create({
  sport: {
    marginBottom: -20,
    marginRight: 0,
  }
});

const GET_SPORTS = gql`
  query allSports {
    allSports {
      id
      abbreviation
      name
    }
  }        
`;

const Left = props => {
  const client = useApolloClient();

  const sportList = () => {
    const sports = client.readQuery({query: GET_SPORTS}).allSports
    let list = [{label: "All Sports", value: ""}]
    sports.forEach((sport) => list.push({label: sport.abbreviation, value: sport.id}))
    return list
  }

  const submit = (sportId) => {
    props.navigation.navigate('Triggers',
                      {sportId: sportId,
                       status: props.status,
                       date: props.date
                      })
  }

  return (
    <>
      {Platform.OS === 'android' &&
        <Text style={styles.sport}>
          { props.sportId ?
            sportList().find(s => s.value == props.sportId).label
          :
            "All Sports"
          }        
        </Text>
      }
      <RNPickerSelect value={props.sportId || ""}
                      style={headerPickerSelectStyles}
                      onValueChange={(value) =>
                        submit(value)
                      }
                      items={sportList()}
      />
    </>
  )

}

export default Left;