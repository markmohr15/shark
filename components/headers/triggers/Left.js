import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { client } from '../../../utils/Client';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
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
  const [left, setLeft] = useState({
    sportId: props.sportId,
  })

  const sportList = () => {
    const sports = client.readQuery({query: GET_SPORTS}).allSports
    let list = [{label: "All Sports", value: ""}]
    sports.forEach((sport) => list.push({label: sport.abbreviation, value: sport.id}))
    return list
  }

  const select = (value) => {
    if(Platform.OS === 'android') {
      submit(value)
    } else {
      setLeft({...left, ["sportId"]: value})
    }
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
      <Text style={styles.sport}>
        { left.sportId ?
          sportList().find(s => s.value == "MLB").abbreviation
        :
          "All Sports"
        }        
      </Text>
      <RNPickerSelect value={left.sportId}
                      style={headerPickerSelectStyles}
                      onClose={() => submit(left.sportId)}
                      onValueChange={(value) =>
                        select(value)
                      }
                      items={sportList()}
      />
    </>
  )

}

export default Left;