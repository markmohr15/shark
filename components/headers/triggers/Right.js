import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { headerPickerSelectStyles } from '../../../styles/PickerSelectStyles';
import moment from 'moment';

const styles = StyleSheet.create({
  status: {
    marginBottom: -20,
    marginRight: 0,
  }
});

const Right = props => {
  const dateInPast = moment(props.date).isBefore(moment().startOf('day'))
  const defaultStatus = dateInPast ? "" : "Open"

  const submit = (status) => {
    props.navigation.navigate('Triggers',
                      {sportId: props.sportId,
                       status: status,
                       date: props.date
                      })
  }

  let items = [ { label: "Open", value: "Open" },
                { label: "Triggered", value: "Triggered" },
                { label: "Expired", value: "Expired" },
                { label: "Canceled", value: "Canceled" },
                { label: "All", value: "" },
              ]

  if (dateInPast) {
    items = items.filter(x => x.value != "Open")
  }

  return (
    <>
      {Platform.OS === 'android' &&
        <Text style={styles.status}>{props.status || "All"}</Text>
      }
      <RNPickerSelect value={props.status}
                      style={headerPickerSelectStyles}
                      onValueChange={(value) =>
                        submit(value)
                      }
                      items={items}
      />
    </>
  )

}

export default Right;