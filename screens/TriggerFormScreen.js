import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import TriggerForm from '../components/TriggerForm';
import MlbDisplayGame from '../components/MlbDisplayGame';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: "black",
  },
  game: {
    flex: 1,
  },
  form: {
    flex: 8,
    paddingTop: 20,
  },
  header: {
    color: "white",
    textAlign: 'center',
  },
})

const TriggerFormScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.game}>
        <MlbDisplayGame game={route.params.game} />
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
  );
}

export default TriggerFormScreen;