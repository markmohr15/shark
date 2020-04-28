import * as React from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function TriggerScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Schedule"
        onPress={() => navigation.navigate('Schedule')}
      />
    </View>
  );
}

export default TriggerScreen;