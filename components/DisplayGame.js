import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, ThemeProvider } from 'react-native-elements';
import SharkText from './SharkText';

const styles = StyleSheet.create({
  game: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    paddingRight: 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  info: {
    flex: 0.85,
  },
  rotation: {
    flex: 0.6,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  name: {
    flex: 1,
  },
  moneyline: {
    flex: 0.7,
    alignItems: 'flex-end',
  },
  total: {
    flex: 1,
    alignItems: 'flex-end',
  },
  runline: {
    flex: 2,
    flexDirection: 'row',
  },
  spread: {
    flex: 2,
    alignItems: 'flex-end',
  },
  line: {
    flex: 1,
    alignItems: 'flex-end',
  },
  buttonText: {
    fontSize: 14,
    color: 'white',
    top: -2,
  },
  button: {
    padding: 0,
    marginLeft: 2,
    marginRight: 2,
  }
})

const DisplayGame = props => {

  return (
    <View style={styles.game}>
      <View style={styles.row}>
        <View style={styles.info}>
          <SharkText>{props.game.displayTime}</SharkText>
        </View>
        <View style={styles.rotation}>
          <SharkText>{props.game.visitorRot}</SharkText>
        </View>
        <View style={styles.name}>
          <SharkText>{props.game.visitor.shortDisplayName}</SharkText>
        </View>
        <View style={styles.moneyline}>
          <SharkText>{props.game.displayVisitorMl}</SharkText>
        </View>
        <View style={styles.total}>
          <SharkText> 
            {props.game.total ? 
              "Ov " + props.game.total
              : <React.Fragment/>
            }
          </SharkText>
        </View>
        <View style={styles.runline}>
          <View style={styles.spread}>
            <SharkText>{props.game.displayVisitorSpread}</SharkText>
          </View>
          <View style={styles.line}>
            <SharkText>{props.game.displayVisitorRl}</SharkText>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.info}>
          <SharkText>{props.game.channel}</SharkText>
        </View>
        <View style={styles.rotation}>
          <SharkText>{props.game.homeRot}</SharkText>
        </View>
        <View style={styles.name}>
          <SharkText>{props.game.home.shortDisplayName}</SharkText>
        </View>
        <View style={styles.moneyline}>
          <SharkText>{props.game.displayHomeMl}</SharkText>
        </View>
        <View style={styles.total}>
          <SharkText> 
            {props.game.total ? 
              "Un " + props.game.total
              : <React.Fragment/>
            }
          </SharkText>
        </View>
        <View style={styles.runline}>
          <View style={styles.spread}>
            <SharkText>{props.game.displayHomeSpread}</SharkText>
          </View>
          <View style={styles.line}>
            <SharkText>{props.game.displayHomeRl}</SharkText>
          </View>
        </View>
      </View>
    </View>
  )

}

export default DisplayGame;