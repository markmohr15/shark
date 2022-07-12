import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
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
  buttonText: {
    fontSize: 14,
    color: 'white',
    top: -2,
  },
  button: {
    padding: 0,
    justifyContent: 'flex-start',
    marginLeft: 0,
    marginRight: 2,
  }
})

const Game = props => {
  const g = props.game

  const goToTrigger = (teamId, wagerType, operator) => {
    props.navigation.navigate("Trigger Form", {game: g,
                                               teamId: teamId,
                                               wagerType: wagerType,
                                               operator: operator})
  }

  const goToGameOdds = () => {
    props.navigation.navigate("Game Odds", {game: g})
  }

  const goToGameInfo = () => {
    props.navigation.navigate("Game Info", {game: g})
  }

  const spreadOrRunline = () => {
    if (["MLB", "KBO", "NPB", "NHL"].includes(g.sport.abbreviation)) {
      return "runline"
    } else {
      return "spread"
    }
  }

  return (
    <View style={styles.game}>
      <View style={styles.row}>
        <View style={styles.info}>
          <Button title={g.displayTime}
                  type="clear"
                  onPress={event => goToGameInfo()}
                  titleStyle={styles.buttonText}
                  buttonStyle={styles.button} />
        </View>
        <View style={styles.name}>
          <Button title={g.visitor.shortDisplayName}
                  type="clear"
                  onPress={event => goToGameOdds()}
                  titleStyle={styles.buttonText}
                  buttonStyle={styles.button} />
        </View>
        <View style={styles.moneyline}>
          {g.displayVisitorMl && g.status == "Scheduled" ?
            <Button title={g.displayVisitorMl}
                    type="clear"
                    onPress={event => goToTrigger(g.visitor.id, 'moneyline', 'greater_eq')} 
                    titleStyle={styles.buttonText}
                    buttonStyle={styles.button} />
          :
            <SharkText muted>{g.displayVisitorMl}</SharkText>
          }
        </View>
        <View style={styles.total}>
          <View style={styles.totalLine}>
            {g.displayOver && g.status == "Scheduled" ? 
              <Button title={g.displayOver}
                      type="clear"
                      onPress={event => goToTrigger(null, 'total', 'less_eq')} 
                      titleStyle={styles.buttonText}
                      buttonStyle={styles.button}/>
            :
              <SharkText muted>{g.displayOver}</SharkText>
            }
          </View>
          <View style={styles.totalOdds}>
            {g.displayOverOdds && g.status == "Scheduled" ?
              <Button title={g.displayOverOdds}
                      type="clear"
                      onPress={event => goToTrigger(null, 'total', 'less_eq')} 
                      titleStyle={styles.buttonText}
                      buttonStyle={styles.button}/>    
            :
              <SharkText muted>{g.displayOverOdds}</SharkText>
            }
          </View>
        </View>
        <View style={styles.runline}>
          <View style={styles.spread}>
            {g.displayVisitorSpread && g.status == "Scheduled" ?
              <Button title={g.displayVisitorSpread}
                      type="clear"
                      onPress={event => goToTrigger(g.visitor.id, spreadOrRunline(), 'greater_eq')} 
                      titleStyle={styles.buttonText}
                      buttonStyle={styles.button}/>            
            :
              <SharkText muted>{g.displayVisitorSpread}</SharkText>
            }
          </View>
          <View style={styles.line}>
            {g.displayVisitorRl && g.status == "Scheduled" ?
              <Button title={g.displayVisitorRl}
                      type="clear"
                      onPress={event => goToTrigger(g.visitor.id, spreadOrRunline(), 'greater_eq')} 
                      titleStyle={styles.buttonText}
                      buttonStyle={styles.button}/>    
            :
              <SharkText muted>{g.displayVisitorRl}</SharkText>
            }
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.info}>
          <SharkText muted={!(g.status == "Scheduled")}>{g.channel}</SharkText>
        </View>
        <View style={styles.name}>
          <Button title={g.home.shortDisplayName}
                  type="clear"
                  onPress={event => goToGameOdds()}
                  titleStyle={styles.buttonText}
                  buttonStyle={styles.button} />
        </View>
        <View style={styles.moneyline}>
          {g.displayHomeMl && g.status == "Scheduled" ?
            <Button title={g.displayHomeMl}
                    type="clear"
                    onPress={event => goToTrigger(g.home.id, 'moneyline', 'greater_eq')} 
                    titleStyle={styles.buttonText}
                    buttonStyle={styles.button}/>
          :
            <SharkText muted>{g.displayHomeMl}</SharkText>
          }
        </View>
        <View style={styles.total}>
          <View style={styles.totalLine}>
            {g.displayUnder && g.status == "Scheduled" ? 
              <Button title={g.displayUnder}
                      type="clear"
                      onPress={event => goToTrigger(null, 'total', 'greater_eq')} 
                      titleStyle={styles.buttonText}
                      buttonStyle={styles.button}/>                      
            :
              <SharkText muted>{g.displayUnder}</SharkText>
            }
          </View>
          <View style={styles.totalOdds}>
            {g.displayUnderOdds && g.status == "Scheduled" ?
              <Button title={g.displayUnderOdds}
                      type="clear"
                      onPress={event => goToTrigger(null, 'total', 'greater_eq')} 
                      titleStyle={styles.buttonText}
                      buttonStyle={styles.button}/>    
            :
              <SharkText muted>{g.displayUnderOdds}</SharkText>
            }
          </View>
        </View>
        <View style={styles.runline}>
          <View style={styles.spread}>
            {g.displayHomeSpread && g.status == "Scheduled" ?
              <Button title={g.displayHomeSpread}
                      type="clear"
                      onPress={event => goToTrigger(g.home.id, spreadOrRunline(), 'greater_eq')} 
                      titleStyle={styles.buttonText}
                      buttonStyle={styles.button}/> 
            :
              <SharkText muted>{g.displayHomeSpread}</SharkText>
            }
          </View>
          <View style={styles.line}>
            {g.displayHomeRl && g.status == "Scheduled" ?
              <Button title={g.displayHomeRl}
                      type="clear"
                      onPress={event => goToTrigger(g.home.id, spreadOrRunline(), 'greater_eq')} 
                      titleStyle={styles.buttonText}
                      buttonStyle={styles.button}/> 
            :
              <SharkText muted>{g.displayHomeRl}</SharkText>
            }
          </View>
        </View>
      </View>
    </View>
  )

}

export default Game;