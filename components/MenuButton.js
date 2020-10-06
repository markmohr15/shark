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

const MenuButton = props => {
    
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon name="bars"
              size={20}
              color="white"
              onPress={() => props.navigation.openDrawer()}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="MENU"
                type="clear"
                onPress={() => props.navigation.openDrawer()}
                titleStyle={styles.button}
        />
      </View>
    </View>
  )

}

export default MenuButton;