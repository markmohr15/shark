import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { client } from '../../../utils/Client';
import { ApolloProvider, useQuery } from '@apollo/react-hooks';
import { gql } from "apollo-boost";
import RNPickerSelect, { defaultStyles} from 'react-native-picker-select';
import { headerPickerSelectStyles, pickerSelectStyles } from '../../../styles/PickerSelectStyles';

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
    
  return (
    <RNPickerSelect value={left.sportId}
                    style={headerPickerSelectStyles}
                    onClose={() => props.navigation.navigate('Triggers',
                      {sportId: left.sportId,
                       status: props.status,
                       date: props.date
                      })
                    }
                    onValueChange={(value) =>
                      setLeft({...left, ["sportId"]: value})
                    }
                    items={sportList()}
    />
  )

}

export default Left;