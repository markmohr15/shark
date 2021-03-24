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
  name: {
    flex: 1.2,
  },
  moneyline: {
    flex: 1.1,
    alignItems: 'flex-end',
  },
  total: {
    flex: 2.7,
    flexDirection: 'row',
  },
  totalLine: {
    flex: 1.75,
    alignItems: 'flex-end'
  },
  totalOdds: {
    flex: 0.9,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  runline: {
    flex: 2,
    flexDirection: 'row',
  },
  spread: {
    flex: 1,
    alignItems: 'flex-end',
  },
  line: {
    flex: 0.8,
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
        <View style={styles.name}>
          <SharkText>{g.visitor.shortDisplayName}</SharkText>
        </View>
        <View style={styles.moneyline}>
          <SharkText>{g.displayVisitorMl}</SharkText>
        </View>
        <View style={styles.total}>
          <View style={styles.totalLine}>
            <SharkText>{g.displayOver}</SharkText>
          </View>
          <View style={styles.totalOdds}>
            <SharkText>{g.displayOverOdds}</SharkText>
          </View>
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
        <View style={styles.name}>
          <SharkText>{g.home.shortDisplayName}</SharkText>
        </View>
        <View style={styles.moneyline}>
          <SharkText>{g.displayHomeMl}</SharkText>
        </View>
        <View style={styles.total}>
          <View style={styles.totalLine}>
            <SharkText>{g.displayUnder}</SharkText>
          </View>
          <View style={styles.totalOdds}>
            <SharkText>{g.displayUnderOdds}</SharkText>
          </View>
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