import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    color: "white",
  }
})

const SearchButton = props => {
    
  return (
    <>
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <Icon name="search"
                size={20}
                color="white"
                onPress={() => props.navigation.navigate('Search')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="SEARCH"
                  type="clear"
                  onPress={() => props.navigation.navigate('Search')}
                  titleStyle={styles.button}
          />
        </View>
      </View>
    </>
  )

}

export default SearchButton;