import React from 'react';
import { StyleSheet, View } from 'react-native';
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
  },
})

const BottomNav = (props) => {  
  return (
    <View style={styles.bottonNav}>
      <View style={styles.menu}>
        <MenuButton navigation={props.navigation}/>
      </View>
      {props.search ? 
        <SearchButton navigation={props.navigation} /> : <React.Fragment/>
      }  
    </View>
  )
}

export default BottomNav;

