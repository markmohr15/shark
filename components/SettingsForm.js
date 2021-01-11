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
  mutation updateSettings($betOnline: Boolean!, $bookmaker: Boolean!, 
                          $bovada: Boolean!, $myBookie: Boolean!) {
    updateSettings(input: {betOnline: $betOnline, bookmaker: $bookmaker, 
                           bovada: $bovada, myBookie: $myBookie}) {
      id
    }
  }
`;

const SettingsForm = props => {
  const client = useApolloClient();
  const [settings, setSettings] = useState({
    betOnline: props.sportsbooks.includes("BetOnline"),
    bookmaker: props.sportsbooks.includes("Bookmaker"),
    bovada: props.sportsbooks.includes("Bovada"),
    myBookie: props.sportsbooks.includes("MyBookie"),
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
    if (!settings.betOnline && !settings.bookmaker && !settings.bovada && !settings.myBookie) {
      setSettings({...settings, ["error"]: "You must select at least one sportsbook.", ["success"]: ""})
    } else {
      updateSettings({ variables: { betOnline: settings.betOnline, 
                                    bookmaker: settings.bookmaker,
                                    bovada: settings.bovada,
                                    myBookie: settings.myBookie } });
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
        <CheckBox
          title="   Bovada"
          checked={settings.bovada}
          onPress={() => setSettings({...settings, ["bovada"]: !settings.bovada})}
          containerStyle={styles.checkbox}
          titleProps={{style: styles.checkboxTitle}}
        />
        <CheckBox
          title="   MyBookie"
          checked={settings.myBookie}
          onPress={() => setSettings({...settings, ["myBookie"]: !settings.myBookie})}
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