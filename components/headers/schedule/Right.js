import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { headerPickerSelectStyles } from '../../../styles/PickerSelectStyles';
import moment from 'moment';

const styles = StyleSheet.create({
  status: {
    marginBottom: -20,
  }
});

const Right = props => {
  const submit = (newStatus) => {
    props.navigation.navigate(props.abbreviation,
                      {sportId: props.sportId,
                       abbreviation: props.abbreviation,
                       status: dateInPast ? 'All' : newStatus,
                       date: props.date
                      })
  }

  const dateInPast = moment(props.date).isBefore(moment().startOf('day'))

  const items = [{ label: "All", value: "All" },
               { label: "Open", value: "Open" }]
  
  return (
    <>
      {Platform.OS === 'android' &&
        <Text style={styles.status}>{props.status}</Text>
      }
      <RNPickerSelect value={props.status}
                      style={headerPickerSelectStyles}
                      onValueChange={(value) =>
                        submit(value)
                      }
                      disabled={dateInPast}
                      items={items}
      />
    </>
  )

}

export default Right;