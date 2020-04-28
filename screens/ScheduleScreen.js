import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


function ScheduleScreen({ navigation }) {


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Trigger"
        onPress={() => navigation.navigate('Triggers')}
      />
    </View>
  );
}

export default ScheduleScreen;