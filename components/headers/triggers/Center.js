import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  icon: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
  },
  wrap: {
    flex: 1.5,
    alignItems: "center",
    justifyContent: 'center',
  },
})

const Center = props => {
  const dayBefore = moment(props.date).subtract(1, 'days').format('YYYY-MM-DD')
  const dayAfter =  moment(props.date).add(1, 'days').format('YYYY-MM-DD')

  const dayInPast = (day) => {
    return moment(day).isBefore(moment().startOf('day'))
  }

  return (
    <View style={styles.row}>
      <View style={styles.icon}>
        <Icon name="chevron-left"
              size={20}
              color="black"
              onPress={() => props.navigation.navigate("Triggers", 
                {sportId: props.sportId, 
                 status: dayInPast(dayBefore) && props.status == 'Open' ? '' : props.status, 
                 date: dayBefore}
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
              onPress={() => props.navigation.navigate("Triggers",
                {sportId: props.sportId, 
                 status: dayInPast(dayAfter) && props.status == 'Open' ? '' : props.status,  
                 date: dayAfter}
              )}
        />
      </View>      
    </View>
  )

}

export default Center;