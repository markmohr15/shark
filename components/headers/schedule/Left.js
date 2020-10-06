import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },

})

const Left = props => {
    
  return (
    <Text>{props.abbreviation}</Text>
  )

}

export default Left;