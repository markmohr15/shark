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
    alignItems: 'flex-end',
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

const GameLine = (props) => {
  const {game, line} = props
  return (
    <View style={styles.game}>
      <View style={styles.row}>
        <View style={styles.info}>
          <SharkText>{line.sportsbook.abbreviation}</SharkText>
        </View>
        <View style={styles.name}>
          <SharkText>{game.visitor.shortDisplayName}</SharkText>
        </View>
        <View style={styles.moneyline}>
          <SharkText>{line.displayVisitorMl}</SharkText>
        </View>
        <View style={styles.total}>
          <View style={styles.totalLine}>
            <SharkText>{line.displayOver}</SharkText>
          </View>
          <View style={styles.totalOdds}>
            <SharkText>{line.displayOverOdds}</SharkText>
          </View>
        </View>
        <View style={styles.runline}>
          <View style={styles.spread}>
            <SharkText>{line.displayVisitorSpread}</SharkText>
          </View>
          <View style={styles.line}>
            <SharkText>{line.displayVisitorRl}</SharkText>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.info}></View>
        <View style={styles.name}>
          <SharkText>{game.home.shortDisplayName}</SharkText>
        </View>
        <View style={styles.moneyline}>
          <SharkText>{line.displayHomeMl}</SharkText>
        </View>
        <View style={styles.total}>
          <View style={styles.totalLine}>
            <SharkText>{line.displayUnder}</SharkText>
          </View>
          <View style={styles.totalOdds}>
            <SharkText>{line.displayUnderOdds}</SharkText>
          </View>
        </View>
        <View style={styles.runline}>
          <View style={styles.spread}>
            <SharkText>{line.displayHomeSpread}</SharkText>
          </View>
          <View style={styles.line}>
            <SharkText>{line.displayHomeRl}</SharkText>
          </View>
        </View>
      </View>
    </View>
  )
}

export default GameLine;