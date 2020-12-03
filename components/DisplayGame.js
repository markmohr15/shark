import React, { useState } from 'react';
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
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  info: {
    flex: 1.2,
  },
  rotation: {
    flex: 0.9,
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  name: {
    flex: 1.2,
  },
  moneyline: {
    flex: 1.1,
    alignItems: 'flex-end',
  },
  total: {
    flex: 1.7,
    alignItems: 'flex-end',
  },
  runline: {
    flex: 2.2,
    flexDirection: 'row',
  },
  spread: {
    flex: 1,
    alignItems: 'flex-end',
  },
  line: {
    flex: 0.7,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
})

const DisplayGame = props => {
  const g = props.game

  return (
    <View style={styles.game}>
      <View style={styles.row}>
        <View style={styles.info}>
          <SharkText>{g.displayTime}</SharkText>
        </View>
        <View style={styles.rotation}>
          <SharkText>{g.visitorRot}</SharkText>
        </View>
        <View style={styles.name}>
          <SharkText>{g.visitor.shortDisplayName}</SharkText>
        </View>
        <View style={styles.moneyline}>
          <SharkText>{g.displayVisitorMl}</SharkText>
        </View>
        <View style={styles.total}>
          <SharkText>{g.displayOver}</SharkText>
        </View>
        <View style={styles.runline}>
          <View style={styles.spread}>
            <SharkText>{g.displayVisitorSpread}</SharkText>
          </View>
          <View style={styles.line}>
            <SharkText>{g.displayVisitorRl}</SharkText>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.info}>
          <SharkText>{g.channel}</SharkText>
        </View>
        <View style={styles.rotation}>
          <SharkText>{g.homeRot}</SharkText>
        </View>
        <View style={styles.name}>
          <SharkText>{g.home.shortDisplayName}</SharkText>
        </View>
        <View style={styles.moneyline}>
          <SharkText>{g.displayHomeMl}</SharkText>
        </View>
        <View style={styles.total}>
          <SharkText>{g.displayUnder}</SharkText>
        </View>
        <View style={styles.runline}>
          <View style={styles.spread}>
            <SharkText>{g.displayHomeSpread}</SharkText>
          </View>
          <View style={styles.line}>
            <SharkText>{g.displayHomeRl}</SharkText>
          </View>
        </View>
      </View>
    </View>
  )

}

export default DisplayGame;