import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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