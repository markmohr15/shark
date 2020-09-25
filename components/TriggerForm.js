import React, { useState } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button, Text, Input, ThemeProvider } from 'react-native-elements';
import RNPickerSelect, { defaultStyles} from 'react-native-picker-select';
import { gql } from "apollo-boost";
import { client } from '../utils/Client';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import SharkText from './SharkText';
import { pickerSelectStyles } from '../styles/PickerSelectStyles';

const styles = StyleSheet.create({
  input: {
    color: "white"
  },
  error: {
    backgroundColor: "red",
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  success: {
    backgroundColor: "green",
    padding: 0,
    marginBottom: 5,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  placeholder: {
    padding: 10,
    marginBottom: 10,
  },
  submit: {
    paddingTop: 10
  }
});

export const CREATE_TRIGGER = gql`
  mutation createTrigger($gameId: Int!, $teamId: Int, $operator: String!, $target: Float!, $wagerType: String!) {
    createTrigger(input: {gameId: $gameId, teamId: $teamId, operator: $operator, target: $target, wagerType: $wagerType}) {
      id
      status       
    }
  }
`;

export const UPDATE_TRIGGER = gql`
  mutation updateTrigger($id: Int!, $teamId: Int, $operator: String!, $target: Float!, $wagerType: String!) {
    updateTrigger(input: {id: $id, teamId: $teamId, operator: $operator, target: $target, wagerType: $wagerType}) {
      id
      status       
    }
  }
`;

const TriggerForm = props => {
  const [trigger, setTrigger] = useState({
    teamId: props.teamId,
    wagerType: props.wagerType,
    operator: props.operator,
    target: props.target || '',
    error: '',
    success: ''
  })

  const wagerTypes = () => {
    const abbrev = props.game.sport.abbreviation
    if (abbrev == "NHL") {
      return [
              { label: 'Total', value: 'total' },
              { label: 'Moneyline', value: 'moneyline' },
              { label: 'Puckline', value: 'runline'} 
             ]
    } else if (["KBO", "NPB", "MLB"].includes(abbrev)) {
      return [
              { label: 'Total', value: 'total' },
              { label: 'Moneyline', value: 'moneyline' },
              { label: 'Runline', value: 'runline'} 
             ]
    } else {
      return [
              { label: 'Total', value: 'total' },
              { label: 'Moneyline', value: 'moneyline' },
              { label: 'Spread', value: 'spread'} 
             ]
    }
  }

  const [createTrigger] = useMutation(CREATE_TRIGGER,
    {
      onCompleted(data) {
        setTrigger({...trigger, ["error"]: '', ["success"]: 'Trigger Created'})
        //not sure yet
        //client.writeData({ data: {  } })
      },
      onError(error) {
        setTrigger({...trigger, ["error"]: error.graphQLErrors.map(x => x.message).join(", ")})
      },
    }
  );

  const [updateTrigger] = useMutation(UPDATE_TRIGGER,
    {
      onCompleted(data) {
        setTrigger({...trigger, ["error"]: '', ["success"]: 'Trigger Updated'})
        //not sure yet
        //client.writeData({ data: {  } })
      },
      onError(error) {
        setTrigger({...trigger, ["error"]: error.graphQLErrors.map(x => x.message).join(", ")})
      }
    }
  );

  const submit = async () => {
    if (!trigger.target) {
      setTrigger({...trigger, ["error"]: 'Target cannot be blank',
                              ["success"]: ''})
    } else if (!trigger.operator) {
      setTrigger({...trigger, ["error"]: 'Direction cannot be blank',
                              ["success"]: ''})
    } else if (!trigger.wagerType) {
      setTrigger({...trigger, ["error"]: 'Wager Type cannot be blank',
                              ["success"]: ''})
    } else if (!trigger.teamId && trigger.wagerType != "total") {
      setTrigger({...trigger, ["error"]: 'Team cannot be blank',
                              ["success"]: ''})
    } else if (props.triggerId) {
      updateTrigger({ variables: { id: parseInt(props.triggerId), 
                                   teamId: parseInt(trigger.teamId),
                                   operator: trigger.operator,
                                   target: parseFloat(trigger.target),
                                   wagerType: trigger.wagerType } })
    } else {
      createTrigger({ variables: { gameId: parseInt(props.game.id), 
                                   teamId: parseInt(trigger.teamId),
                                   operator: trigger.operator,
                                   target: parseFloat(trigger.target),
                                   wagerType: trigger.wagerType } })
    }
  }

  return (
    <>
      {trigger.error ?
        <View style={styles.error}>
          <SharkText>{trigger.error}</SharkText>
        </View>
        : <React.Fragment/>
        
      }
      {trigger.success ?
        <View style={styles.success}>
          <SharkText>{trigger.success}</SharkText>
        </View>
        : <React.Fragment/>
      }
      {!trigger.success && !trigger.error ?
        <View style={styles.placeholder}>
          <SharkText>{trigger.success}</SharkText>
        </View>
        : <React.Fragment/>
      }
      {trigger.wagerType != 'total' ?
        <View>
          <SharkText>Team</SharkText>
          <RNPickerSelect value={trigger.teamId}
                          style={pickerSelectStyles}
                          useNativeAndroidPickerStyle={false}
                          placeholder={{
                            label: "Select a Team",
                            value: null,
                          }}
                          onValueChange={(value) =>
                            setTrigger({...trigger, ["teamId"]: value,
                                                    ["success"]: '',
                                                    ["error"]: ''})
                          }
                          items={[
                            { label: props.game.visitor.name + " " + props.game.visitor.nickname, value: props.game.visitor.id },
                            { label: props.game.home.name + " " + props.game.home.nickname, value: props.game.home.id },
                          ]}
          />
        </View>
        : <React.Fragment/>
      }
      <View>
        <SharkText>Wager Type</SharkText>
        <RNPickerSelect value={trigger.wagerType}
                        style={pickerSelectStyles}
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(value) =>
                          setTrigger({...trigger, ["wagerType"]: value,
                                                  ["success"]: '',
                                                  ["error"]: ''})
                        }
                        items={wagerTypes()}
        />
      </View>
      <View>
        <SharkText>Direction</SharkText>
        <RNPickerSelect value={trigger.operator}
                        style={pickerSelectStyles}
                        placeholder={{
                          label: "Select a Direction",
                          value: null,
                        }}
                        useNativeAndroidPickerStyle={false}
                        onValueChange={(value) =>
                          setTrigger({...trigger, ["operator"]: value,
                                                  ["success"]: '',
                                                  ["error"]: ''})
                        }
                        items={[
                          { label: trigger.wagerType == 'total' ? 'Greater Than or Equal to' : 'Better', value: "greater_eq" },
                          { label: trigger.wagerType == 'total' ? 'Less Than or Equal to' : 'Worse', value: "less_eq" },
                        ]}
        />
      </View>
      <SharkText>Target</SharkText>
      <TextInput
        style={Platform.OS === 'ios' ? pickerSelectStyles.inputIOS
                                     : pickerSelectStyles.inputAndroid}
        value={trigger.target}
        onChangeText={text => setTrigger({...trigger, ["target"]: text,
                                                      ["success"]: '',
                                                      ["error"]: ''})}
        keyboardType={Platform.OS === 'ios' ? 'numbers-and-punctuation'
                                            : 'numeric'}
        numeric
      />
      <View style={styles.submit}>
        <Button
          title={props.triggerId ? "UPDATE" : "CREATE"}
          buttonStyle="raised"
          onPress={event => submit()}
        />
      </View>
    </>
  )

}

export default TriggerForm;