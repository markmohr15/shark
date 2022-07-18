import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';
import { headerPickerSelectStyles } from '../../../styles/PickerSelectStyles';

const styles = StyleSheet.create({
  status: {
    marginBottom: -20,
    marginRight: 0,
  }
});

const Right = props => {
  const [right, setRight] = useState({
    status: props.status,
  })

  const select = (value) => {
    if(Platform.OS === 'android') {
      submit(value)
    } else {
      setRight({...right, ["status"]: value})
    }
  }

  const submit = (status) => {
    props.navigation.navigate('Triggers',
                      {sportId: props.sportId,
                       status: status,
                       date: props.date
                      })
  }

  return (
    <>
      {Platform.OS === 'android' &&
        <Text style={styles.status}>{right.status || "All"}</Text>
      }
      <RNPickerSelect value={right.status}
                      style={headerPickerSelectStyles}
                      onClose={() => submit(right.status)}
                      onValueChange={(value) =>
                        select(value)
                      }
                      items={[
                        { label: "Open", value: "Open" },
                        { label: "Triggered", value: "Triggered" },
                        { label: "Expired", value: "Expired" },
                        { label: "Canceled", value: "Canceled" },
                        { label: "All", value: "" },
                      ]}
      />
    </>
  )

}

export default Right;