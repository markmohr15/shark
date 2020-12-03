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

const Game = props => {
  const g = props.game

  const goToTrigger = (teamId, wagerType, operator) => {
    props.navigation.navigate("Trigger Form", {game: g,
                                               teamId: teamId,
                                               wagerType: wagerType,
                                               operator: operator})
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
          <SharkText>{g.displayTime}</SharkText>
        </View>
        <View style={styles.rotation}>
          <SharkText>{g.visitorRot}</SharkText>
        </View>
        <View style={styles.name}>
          <SharkText>{g.visitor.shortDisplayName}</SharkText>
        </View>
        <View style={styles.moneyline}>
          {g.displayVisitorMl ?
            <Button title={g.displayVisitorMl}
                    type="clear"
                    onPress={event => goToTrigger(g.visitor.id, 'moneyline', 'greater_eq')} 
                    titleStyle={styles.buttonText}
                    buttonStyle={styles.button} />
            : <React.Fragment/>
          }
        </View>
        <View style={styles.total}>
          {g.displayOver ? 
            <Button title={g.displayOver}
                    type="clear"
                    onPress={event => goToTrigger(null, 'total', 'less_eq')} 
                    titleStyle={styles.buttonText}
                    buttonStyle={styles.button}/>
            : <React.Fragment/>
          }
        </View>
        <View style={styles.runline}>
          <View style={styles.spread}>
            {g.displayVisitorSpread ?
              <Button title={g.displayVisitorSpread}
                      type="clear"
                      onPress={event => goToTrigger(g.visitor.id, spreadOrRunline(), 'greater_eq')} 
                      titleStyle={styles.buttonText}
                      buttonStyle={styles.button}/>            
              : <React.Fragment/>
            }
          </View>
          <View style={styles.line}>
            {g.displayVisitorRl ?
              <Button title={g.displayVisitorRl}
                      type="clear"
                      onPress={event => goToTrigger(g.visitor.id, spreadOrRunline(), 'greater_eq')} 
                      titleStyle={styles.buttonText}
                      buttonStyle={styles.button}/>    
              : <React.Fragment/>
            }
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
          {g.displayHomeMl ?
            <Button title={g.displayHomeMl}
                    type="clear"
                    onPress={event => goToTrigger(g.home.id, 'moneyline', 'greater_eq')} 
                    titleStyle={styles.buttonText}
                    buttonStyle={styles.button}/>
            : <React.Fragment/>
          }
        </View>
        <View style={styles.total}>
          {g.displayUnder ? 
            <Button title={g.displayUnder}
                    type="clear"
                    onPress={event => goToTrigger(null, 'total', 'greater_eq')} 
                    titleStyle={styles.buttonText}
                    buttonStyle={styles.button}/>                      
            : <React.Fragment/>
          }
        </View>
        <View style={styles.runline}>
          <View style={styles.spread}>
            {g.displayHomeSpread ?
              <Button title={g.displayHomeSpread}
                      type="clear"
                      onPress={event => goToTrigger(g.home.id, spreadOrRunline(), 'greater_eq')} 
                      titleStyle={styles.buttonText}
                      buttonStyle={styles.button}/> 
              : <React.Fragment/>
            }
          </View>
          <View style={styles.line}>
            {g.displayHomeRl ?
              <Button title={g.displayHomeRl}
                      type="clear"
                      onPress={event => goToTrigger(g.home.id, spreadOrRunline(), 'greater_eq')} 
                      titleStyle={styles.buttonText}
                      buttonStyle={styles.button}/> 
              : <React.Fragment/>
            }
          </View>
        </View>
      </View>
    </View>
  )

}

export default Game;