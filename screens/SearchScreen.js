import React from 'react';
import { StyleSheet, View } from 'react-native';
import BottomNav from '../components/BottomNav';
import SharkText from '../components/SharkText';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "black",
  },
  search: {
    flex: 8,
    paddingTop: 40,
    paddingLeft: 5,
  }
});

function SearchScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <SharkText>Searching for teams and individual players is coming!</SharkText>
      </View>
      <BottomNav search={false}
                 navigation={navigation}
      />
    </View>
  );
}

export default SearchScreen;