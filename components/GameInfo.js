import React from 'react';
import { StyleSheet, View, Linking, Text } from 'react-native';
import { Image } from 'react-native-elements';
import SharkText from './SharkText';
import Icon from 'react-native-vector-icons/FontAwesome';
import stadium from '../assets/stadium.gif';

const styles = StyleSheet.create({
  game: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    paddingRight: 2,
  },
  teamContainer: {
    flex: 0.5,
    flexDirection: 'row',
  },
  team: {
    flex: 1,
    alignItems: 'center',
  },
  vs: {
    flex: 0.15,
  },
  infoContainer: {
    flex: 1.2,
    paddingLeft: 5,
  },
  weatherContainer: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },
  weatherReportContainer: {
    flex: 1,
    alignItems: 'center',
  },
  time: {
    flex: 0.5,
  },
  temp: {
    flex: 0.5,
  },
  weather: {
    flex: 0.8,
    alignItems: 'center'
  },
  arrow: {
    alignItems: 'center',
    flex: 1,
  },  
  windSpeed: {
    flex: 1,
  },
  stadiumContainer: {
    flex: 1.3,
    backgroundColor: 'white',
    alignItems: 'center',
  },
})

const GameInfo = (props) => {
  const {game} = props

  return (
    <View style={styles.game}>
      <View style={styles.teamContainer}>
        <View style={styles.team}>
          <SharkText> {game.visitor.name} {game.visitor.nickname} </SharkText>
        </View>
        <View style={styles.vs}>
          <SharkText>Vs.</SharkText>
        </View>
        <View style={styles.team}>
          <SharkText> {game.home.name} {game.home.nickname} </SharkText>
        </View>
      </View>
      <View style={styles.infoContainer}>
        <SharkText>{game.datetimeToS}</SharkText>
        { game.stadium.name != "Unknown" &&
          <>
            <SharkText>{game.stadium.name}</SharkText>
            <SharkText>{game.stadium.city}, {game.stadium.state}, {game.stadium.country}</SharkText>
            {game.stadium.surface && <SharkText>Playing Surface: {game.stadium.surface}</SharkText>}
            {game.stadium.stadiumType && <SharkText>Stadium Type: {game.stadium.stadiumType}</SharkText>}
            {game.stadium.stadiumType == 'Retractable' && game.stadium.roofStatusLink &&
              <SharkText>Roof Status Link: <Text
                                            style={{color: 'white'}}
                                            onPress={() => {Linking.openURL(`${game.stadium.roofStatusLink}`)}}
                                          >
                                            Touch Here
                                          </Text>
              </SharkText>
            }
            <SharkText>Capacity: {game.stadium.capacityToS}</SharkText>
            {['Scheduled', 'InProgress', 'Final'].includes(game.status) && game.currentWeather && game.stadium.stadiumType != 'Dome' &&
              <SharkText>
                {game.status == 'Scheduled' ? 'Current' : 'Game Time'} Weather: {game.currentWeather.temp}°, {game.currentWeather.weather}, {game.currentWeather.windSpeed} MPH Wind
              </SharkText>
            }
          </>
        } 
      </View>
      <View style={styles.weatherContainer}>
        {game.weatherReports.length > 0 && game.weatherReports[0].reportType == 'hourly' && game.stadium.stadiumType != 'Dome' &&
          game.weatherReports.map(wr => (
            <View style={styles.weatherReportContainer} key={wr.id}>
              <View style={styles.time}>
                <SharkText>{wr.displayHourlyTime}</SharkText>                            
              </View>
              <View style={styles.temp}>
                <SharkText>{wr.temp}°</SharkText>
              </View>
              <View style={styles.weather}>
                <SharkText>{wr.weather}</SharkText>
              </View>
              <View style={styles.arrow}>
                <Icon name="arrow-up"
                      size={20}
                      color="white"
                      style={{transform: [{rotate: `${wr.windDeg + 180}deg`}]}}
                />
                <View style={styles.windSpeed}>
                  <SharkText>{wr.windSpeed} MPH</SharkText>
                </View>
              </View>
            </View>
          ))
        }
        {game.weatherReports.length > 0 && game.weatherReports[0].reportType == 'daily' && game.stadium.stadiumType != 'Dome' && 
          <>
            <View style={styles.weatherReportContainer}>
              <SharkText>Hi: {game.weatherReports[0].high}°</SharkText>
              <SharkText>Low: {game.weatherReports[0].low}°</SharkText>
              <SharkText>{game.weatherReports[0].weather}</SharkText>
              <Icon name="arrow-up"
                    size={20}
                    color="white"
                    style={{transform: [{rotate: `${game.weatherReports[0].windDeg + 180}deg`}]}}
              />
              <SharkText>{game.weatherReports[0].windSpeed} MPH</SharkText>
            </View>
            <View style={styles.weatherReportContainer}>
              <SharkText>Morn: {game.weatherReports[0].morn}°</SharkText>
              <SharkText>Day: {game.weatherReports[0].day}°</SharkText>
              <SharkText>Evening: {game.weatherReports[0].eve}°</SharkText>
              <SharkText>Night: {game.weatherReports[0].night}°</SharkText>
            </View>
          </>
        }
      </View>
      {game.sport.baseball &&
        <View style={styles.stadiumContainer}>
          <Image style={{width: 225, height: 225, transform: [{rotate: `${game.stadium.homePlateDirection}deg`}]}}
                 source={stadium}
          />
        </View>
      }
    </View>
  )
}

export default GameInfo;