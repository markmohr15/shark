import React, { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import RNPickerSelect, { defaultStyles} from 'react-native-picker-select';
import { headerPickerSelectStyles } from '../../../styles/PickerSelectStyles';

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
    <RNPickerSelect value={right.status}
                    style={headerPickerSelectStyles}
                    useNativeAndroidPickerStyle={false}
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
  )

}

export default Right;