import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wrap: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

const Center = props => {
  const yesterday = () => {
    return moment(props.date).subtract(1, 'days').format('YYYY-MM-DD')
  }

  const tomorrow = () => {
    return moment(props.date).add(1, 'days').format('YYYY-MM-DD')
  }

  return (
    <View style={styles.row}>
      <View style={styles.icon}>
        <Icon name="chevron-left"
              size={20}
              color="black"
              onPress={() => props.navigation.navigate(
                props.abbreviation, 
                {sportId: props.sportId, 
                 abbreviation: props.abbreviation, 
                 date: yesterday()}
              )}
        />
      </View>
      <View style={styles.wrap}>
        <Text>{props.date}</Text>
      </View>
      <View style={styles.icon}>
        <Icon name="chevron-right"
              size={20}
              color="black"
              onPress={() => props.navigation.navigate(
                props.abbreviation, 
                {sportId: props.sportId, 
                 abbreviation: props.abbreviation, 
                 date: tomorrow()}
              )}
        />
      </View>      
    </View>
  )

}

export default Center;