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
  return (
    <RNPickerSelect value={right.status}
                    style={headerPickerSelectStyles}
                    onClose={() =>
                      props.navigation.navigate('Triggers',
                      {sportId: props.sportId,
                       status: right.status,
                       date: props.date
                      })
                    }
                    onValueChange={(value) =>
                      setRight({...right, ["status"]: value})
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