import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import getRandomInt from './Assets/functions/getRandomInt'
import GameView from './Views/gameView/gameView'

export default class App extends React.Component {
  
  render() {
    return (
      <GameView />
    );
  }
}


