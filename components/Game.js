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
    flex: 1,
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
    flex: 1,
    alignItems: 'flex-end',
  },
  total: {
    flex: 1.3,
    alignItems: 'flex-end',
  },
  runline: {
    flex: 2.5,
    flexDirection: 'row',
  },
  spread: {
    flex: 2,
    alignItems: 'flex-end',
  },
  line: {
    flex: 1,
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

  const goToTrigger = (teamId, wagerType, operator) => {
    props.navigation.navigate("Trigger Form", {game: props.game,
                                               teamId: teamId,
                                               wagerType: wagerType,
                                               operator: operator})
  }

  const spreadOrRunline = () => {
    if (["MLB", "KBO", "NPB", "NHL"].includes(props.game.sport.abbreviation)) {
      return "runline"
    } else {
      return "spread"
    }
  }

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
          {props.game.displayVisitorMl ?
            <Button title={props.game.displayVisitorMl}
                    type="clear"
                    onPress={event => goToTrigger(props.game.visitor.id, 'moneyline', 'greater_eq')} 
                    titleStyle={styles.buttonText}
                    buttonStyle={styles.button} />
            : <React.Fragment/>
          }
        </View>
        <View style={styles.total}>
          {props.game.total ? 
            <Button title={"Ov " + props.game.total}
                    type="clear"
                    onPress={event => goToTrigger(null, 'total', 'greater_eq')} 
                    titleStyle={styles.buttonText}
                    buttonStyle={styles.button}/>
            : <React.Fragment/>
          }
        </View>
        <View style={styles.runline}>
          <View style={styles.spread}>
            {props.game.displayVisitorSpread ?
              <Button title={props.game.displayVisitorSpread}
                      type="clear"
                      onPress={event => goToTrigger(props.game.visitor.id, spreadOrRunline(), 'greater_eq')} 
                      titleStyle={styles.buttonText}
                      buttonStyle={styles.button}/>            
              : <React.Fragment/>
            }
          </View>
          <View style={styles.line}>
            {props.game.displayVisitorRl ?
              <Button title={props.game.displayVisitorRl}
                      type="clear"
                      onPress={event => goToTrigger(props.game.visitor.id, spreadOrRunline(), 'greater_eq')} 
                      titleStyle={styles.buttonText}
                      buttonStyle={styles.button}/>    
              : <React.Fragment/>
            }
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
          {props.game.displayHomeMl ?
            <Button title={props.game.displayHomeMl}
                    type="clear"
                    onPress={event => goToTrigger(props.game.home.id, 'moneyline', 'greater_eq')} 
                    titleStyle={styles.buttonText}
                    buttonStyle={styles.button}/>
            : <React.Fragment/>
          }
        </View>
        <View style={styles.total}>
          {props.game.total ? 
            <Button title={"Un " + props.game.total}
                    type="clear"
                    onPress={event => goToTrigger(null, 'total', 'less_eq')} 
                    titleStyle={styles.buttonText}
                    buttonStyle={styles.button}/>                      
            : <React.Fragment/>
          }
        </View>
        <View style={styles.runline}>
          <View style={styles.spread}>
            {props.game.displayHomeSpread ?
              <Button title={props.game.displayHomeSpread}
                      type="clear"
                      onPress={event => goToTrigger(props.game.home.id, spreadOrRunline(), 'greater_eq')} 
                      titleStyle={styles.buttonText}
                      buttonStyle={styles.button}/> 
              : <React.Fragment/>
            }
          </View>
          <View style={styles.line}>
            {props.game.displayHomeRl ?
              <Button title={props.game.displayHomeRl}
                      type="clear"
                      onPress={event => goToTrigger(props.game.home.id, spreadOrRunline(), 'greater_eq')} 
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