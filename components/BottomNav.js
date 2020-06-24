import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Input, ThemeProvider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuButton from './MenuButton';
import SearchButton from './SearchButton';


const styles = StyleSheet.create({
  bottonNav: {
    borderTopWidth: 1,
    borderTopColor: "white",
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  menu: {
    flex: 1
  }
});



const BottomNav = props => {
  

  return (
    <View style={styles.bottonNav}>
      <View style={styles.menu}>
        <MenuButton navigation={props.navigation}/>
      </View>
      {props.search ? 
        <SearchButton navigation={props.navigation} /> : <></>
      }  
    </View>
    
  )

}

export default BottomNav;

