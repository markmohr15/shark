import React from 'react';
import { StyleSheet, View } from 'react-native';
import SharkText from './SharkText';

const styles = StyleSheet.create({
  game: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    paddingRight: 2,
  },
  
})

const GameInfo = (props) => {
  const {game} = props

  return (
    <View style={styles.game}>
      <SharkText> {game.id} </SharkText>
    </View>
  )
}

export default GameInfo;