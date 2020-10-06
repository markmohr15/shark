import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import TriggerForm from '../components/TriggerForm';
import DisplayGame from '../components/DisplayGame';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 2,
    paddingHorizontal: 2,
    backgroundColor: "black",
  },
  game: {
    flex: 1,
  },
  form: {
    flex: 8,
    paddingTop: 5,
  },
  header: {
    color: "white",
    textAlign: 'center',
  },
})

const TriggerFormScreen = ({ route, navigation }) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.game}>
          <DisplayGame game={route.params.game} />
        </View>
        <View style={styles.form}>
          <TriggerForm game={route.params.game}
                       teamId={route.params.teamId}
                       wagerType={route.params.wagerType}
                       operator={route.params.operator}
                       target={route.params.target} 
                       triggerId={route.params.triggerId}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default TriggerFormScreen;