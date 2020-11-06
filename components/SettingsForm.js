import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, CheckBox, Card } from 'react-native-elements';
import SharkText from './SharkText';
import { useMutation, useApolloClient, gql } from "@apollo/client";

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
    padding: 10,
    marginBottom: 10,
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
  },
  checkbox: {
    backgroundColor: "black",
    borderColor: "black"
  },
  checkboxTitle: {
    color: "white",
  }
});

const UPDATE_SETTINGS = gql`
  mutation updateSettings($betOnline: Boolean!, $bookmaker: Boolean!) {
    updateSettings(input: {betOnline: $betOnline, bookmaker: $bookmaker}) {
      id
    }
  }
`;

const SettingsForm = props => {
  const client = useApolloClient();
  const [settings, setSettings] = useState({
    betOnline: true,
    bookmaker: false,
    error: '',
    success: '',
  })

  const [updateSettings] = useMutation(UPDATE_SETTINGS,
    {
      onCompleted(data) {
        setSettings({...settings, ["error"]: '', ["success"]: 'Settings Updated'})
      },
      onError(error) {
        setSettings({...settings, ["error"]: error.graphQLErrors.map(x => x.message).join(", "), ["success"]: ''})
      }
    }
  );
    
  const submit = async () => {
    if (!settings.betOnline && !settings.bookmaker) {
      setSettings({...settings, ["error"]: "You must select at least one sportsbook.", ["success"]: ""})
    } else {
      updateSettings({ variables: { betOnline: settings.betOnline, bookmaker: settings.bookmaker } });
    }
  }

  return (
    <>
      {settings.error ?
        <View style={styles.error}>
          <SharkText>{settings.error}</SharkText>
        </View>
        : <React.Fragment/>
      }
      {settings.success ?
        <View style={styles.success}>
          <SharkText>{settings.success}</SharkText>
        </View>
        : <React.Fragment/>
      }
      {!settings.success && !settings.error ?
        <View style={styles.placeholder}>
          <SharkText></SharkText>
        </View>
        : <React.Fragment/>
      }
      <View>
        <CheckBox
          title="   BetOnline"
          checked={settings.betOnline}
          onPress={() => setSettings({...settings, ["betOnline"]: !settings.betOnline})}
          containerStyle={styles.checkbox}
          titleProps={{style: styles.checkboxTitle}}
        />
        <CheckBox
          title="   Bookmaker"
          checked={settings.bookmaker}
          onPress={() => setSettings({...settings, ["bookmaker"]: !settings.bookmaker})}
          containerStyle={styles.checkbox}
          titleProps={{style: styles.checkboxTitle}}
        />
      
        <Button
          title="SUBMIT"
          onPress={submit}
        />
      </View>
    </>
  )

}

export default SettingsForm;