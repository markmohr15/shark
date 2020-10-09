import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { useMutation, gql } from '@apollo/client';
import Icon from 'react-native-vector-icons/FontAwesome';
import SharkText from './SharkText';

const styles = StyleSheet.create({
  trigger: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 2,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  info: {
    flex: 0.85,
  },
  name: {
    flex: 0.6,
  },
  bold: { 
    fontWeight: 'bold',
    color: 'white',
    alignItems: 'flex-end',
  },
  bet: {
    flex: 1,
    alignItems: 'flex-end',
  },
  arrow: {
    flex: 0.1,
    alignItems: 'flex-end'
  },
  button: {
    flex: 0.6,
    alignItems: "center",
  }
})

export const CANCEL_TRIGGER = gql`
  mutation cancelTrigger($id: Int!) {
    cancelTrigger(input: {id: $id}) {
      id     
    }
  }
`;

const Trigger = props => {
  const [trigger, setTrigger] = useState({
    editable: props.trigger.status == "open",
    show: true,
  })

  const trig = props.trigger

  let isVisitor = false
  if (trig.team != null) {
    isVisitor = trig.game.visitor.id == trig.team.id
  }

  const showButtons = props.status == "Open" || props.status == ""

  const edit = () => { 
    props.navigation.navigate("Trigger Form", {game: trig.game,
                                               teamId: trig.team ? trig.team.id : null,
                                               wagerType: trig.wagerType,
                                               operator: trig.operator,
                                               target: trig.target.toString(),
                                               triggerId: trig.id})
  }

  const [cancelTrigger] = useMutation(CANCEL_TRIGGER,
    {
      onCompleted(data) {
        const show = props.status == ""
        setTrigger({...trigger, editable: false, show: show})
      },
      onError(error) {
        console.log(error)
        //setTrigger({...trigger, ["error"]: error.graphQLErrors.map(x => x.message).join(", ")})
      }
    }
  );

  const cancel = async () => {
    cancelTrigger({ variables: { id: parseInt(trig.id) } });
  }

  const currentLine = () => {
    if (isVisitor) {
      switch (trig.wagerType) {
        case "total":
          return trig.game.total
        case "moneyline":
          return trig.game.displayVisitorMl
        case "runline":
          return trig.game.displayVisitorSpread + " " + trig.game.displayVisitorRl
        default:
          return ''
      }
    } else {
      switch (trig.wagerType) {
        case "total":
          return trig.game.total
        case "moneyline":
          return trig.game.displayHomeMl
        case "runline":
          return trig.game.displayHomeSpread + " " + trig.game.displayHomeRl
        default:
          return ''
      }
    }
  }

  const operatorIcon = (
    <Icon raised
          name={trig.operator == "greater_eq" ? 'long-arrow-up' : 'long-arrow-down'}
          type='font-awesome'
          color='white'
          size={14} />
  )

  const buttons = (
    <React.Fragment>
      <View style={styles.button}>
        <Icon
          raised
          name='pencil'
          type='font-awesome'
          color='white'
          size={20}
          onPress={() => edit()} />
      </View>
      <View style={styles.button}>
        <Icon
          raised
          name='times'
          type='font-awesome'
          color='white'
          size={20}
          onPress={() => cancel()} />
      </View>
    </React.Fragment>
  )

  if (trigger.show) {
    return (
    <View style={styles.trigger}>
      <View style={styles.row}>  
        <View style={styles.info}>
          <SharkText>{trig.game.displayTime}</SharkText>
        </View>
        <View style={styles.name}>
          {isVisitor ? 
            <Text style={styles.bold}> 
              {trig.game.visitor.shortDisplayName}
            </Text>
          :
            <SharkText>{trig.game.visitor.shortDisplayName}</SharkText>
          }
        </View>
        <View style={styles.bet}>
          {isVisitor ? 
            <SharkText>{currentLine()}</SharkText>
          :
            <React.Fragment/>
          }
        </View>
        <View style={styles.bet}>
          {isVisitor ?
            <SharkText>{trig.displayTarget}</SharkText>
          :
            <React.Fragment/>
          }
        </View>
        <View style={styles.arrow}>
          {isVisitor ?
            operatorIcon
          :
            <React.Fragment/>
          }
        </View>
        { showButtons && trigger.editable && isVisitor ?
          buttons
        :
          <React.Fragment>
            <View style={styles.button}></View>
            <View style={styles.button}></View>
          </React.Fragment>         
        }
      </View>
      <View style={styles.row}>  
        <View style={styles.info}>
          <SharkText>{trig.game.channel}</SharkText>
        </View>
        <View style={styles.name}>
          {isVisitor || trig.wagerType == 'total' ? 
            <SharkText>
              {trig.game.home.shortDisplayName}
            </SharkText>
          :
            <Text style={styles.bold}>
             {trig.game.home.shortDisplayName} 
            </Text>
          }
        </View>
        <View style={styles.bet}>
          {isVisitor ? 
            <React.Fragment/>
          :
            <SharkText>{currentLine()}</SharkText>            
          }
        </View>
        <View style={styles.bet}>
          {isVisitor ?
            <React.Fragment/> 
          :
            <SharkText>{trig.displayTarget}</SharkText>
          }
        </View>
        <View style={styles.arrow}>
          {isVisitor ?
            <React.Fragment/> 
          :
            operatorIcon
          }
        </View>
        { showButtons && trigger.editable && !isVisitor ?
          buttons
        :
          <React.Fragment>
            <View style={styles.button}></View>
            <View style={styles.button}></View>
          </React.Fragment>         
        }
      </View>
    </View>
  )
  } else {
    return null
  }

}

export default Trigger;