import React from 'react';
import { StyleSheet, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import SharkText from '../components/SharkText';
import SettingsForm from '../components/SettingsForm';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "black",
  },
  message: {
    flex: 1,
    paddingTop: 70,
    paddingLeft: 15,
    paddingRight: 15,
  },
  form: {
    flex: 8,
    paddingTop: 30,
  },
});

function SettingsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <SharkText>Select which sportsbooks you would like us to use for lines and triggers</SharkText>
      </View>
      <View style={styles.form}>
        <SettingsForm/>
      </View>
      <BottomNav search={true}
                 navigation={navigation}
      />
    </View>
  );
}

export default SettingsScreen;