import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import getRandomInt from './Assets/functions/getRandomInt'

export default class App extends React.Component {

  constructor(props){
    super(props);
  
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      score: 0,
    }
  }

  componentDidMount() {
    this.InitializeGame()
  }

  InitializeGame = () => {
    this.setState({gameState:
      [
        [10, 0, 10],
        [0, 100, 0],
        [0, 100, 100]
      ]
    });
  }
  
  tileColor = (row, col) => {
    var value = this.state.gameState[row][col];
    if(value === 0){
      return <View style = {{backgroundColor: '#07a8f9', 
      width: Dimensions.get('window').width*0.28,
      height: Dimensions.get('window').width*0.28,}} />;
    }
    else if(value === 10){
      return <View style = {{backgroundColor: '#40f418', 
      width: Dimensions.get('window').width*0.28,
      height: Dimensions.get('window').width*0.28,}} />;
    }
    else if(value === 100){ 
      return <View style = {{backgroundColor: '#f90707', 
      width: Dimensions.get('window').width*0.28,
      height: Dimensions.get('window').width*0.28,}} />;
    }
    else {
      return null
    }
  }

  onTilePress = (row, col) => {
    var value = this.state.gameState[row][col];
    var newGameState = this.state.gameState.slice();
    if(value === 0){
     newGameState[row][col] = 10
    }
    else if(value === 10){
      newGameState[row][col] = 100
    }
    else if(value === 100){ 
      newGameState[row][col] = 0
    }
    
  var x = true
  newScore = this.state.score
  this.setState({gameState: newGameState})
  while(x){
    x = false
    var combo = this.threeInRow()

    for(var i = 0; i < 3; i++){
        if(combo[0][i] === 1){
            newScore++
            this.setState({score: newScore})
            x = true
            for(var j = 0; j < 3; j++){
                var newColor = getRandomInt(3)
                if(newColor === 0){
                  newGameState[i][j] = 0
                }
                else if(newColor === 1){
                  newGameState[i][j] = 10
                }
                else{
                  newGameState[i][j] = 100
                }
            }
        }
    }

    for(var i = 0; i < 3; i++){
      if(combo[1][i] === 1){
         newScore++
         this.setState({score: newScore})
          x = true
          for(var j = 0; j < 3; j++){
              var newColor = getRandomInt(3)
              if(newColor === 0){
                newGameState[j][i] = 0
              }
              else if(newColor === 1){
                newGameState[j][i] = 10
              }
              else{
                newGameState[j][i] = 100
              }
          }
      }
    }
    if(combo[2][0] === 1){
      newScore++
      this.setState({score: newScore})
      x = true
      for(var j = 0; j < 3; j++){
          var newColor = getRandomInt(3)
          if(newColor === 0){
            newGameState[j][j] = 0
          }
          else if(newColor === 1){
            newGameState[j][j] = 10
          }
          else{
            newGameState[j][j] = 100
          }
      }
    }

    if(combo[2][1] === 1){
      newScore++
      this.setState({score: newScore})
      x = true
      for(var j = 0; j < 3; j++){
          var newColor = getRandomInt(3)
          if(newColor === 0){
            newGameState[j][2-j] = 0
          }
          else if(newColor === 1){
            newGameState[j][2-j] = 10
          }
          else{
            newGameState[j][2-j] = 100
          }
      }
    }
    this.setState({gameState: newGameState})
  }

  }

  threeInRow = () => {
    var arr = this.state.gameState
    var sum = 0
    var combo = [[0, 0, 0], [0, 0, 0], [0, 0]] // [0][i] rows, [1][i] colons, [2][i] diagonals
    
  
    for(var i = 0; i < 3; i++){
      sum = arr[i][0] + arr[i][1] + arr[i][2]
        if(sum === 0 || sum === 30 || sum === 300){
          combo[0][i] = 1
        }
    }

    for(var i = 0; i < 3; i++){
      sum = arr[0][i] + arr[1][i] + arr[2][i]
        if(sum === 0 || sum === 30 || sum === 300){
          combo[1][i] = 1
        }
      }
    sum = arr[0][0] + arr[1][1] + arr[2][2]
      if(sum === 0 || sum === 30 || sum === 300){
        combo[2][0] = 1
        }
    
    sum = arr[0][2] + arr[1][1] + arr[2][0]
      if(sum === 0 || sum === 30 || sum === 300){
        combo[2][1] = 1
        }
    
    return combo
  
  }

  render() {
    return (
      <View style={styles.container}> 
      <View>
        <Text style={styles.scoreText} >
          {this.state.score}
        </Text>
      </View>



      <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} >
        <TouchableOpacity onPress = {() => this.onTilePress(0,0)} style = {[styles.tile, {borderLeftWidth: 0, borderTopWidth: 0 }]}>
        {this.tileColor(0,0)}
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => this.onTilePress(0,1)} style = {[styles.tile, {borderTopWidth: 0 }]}>
        {this.tileColor(0,1)}
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => this.onTilePress(0,2)} style = {[styles.tile, {borderRightWidth: 0, borderTopWidth: 0 }]} >
        {this.tileColor(0,2)}
        </TouchableOpacity>
      </View>





      <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} >
        <TouchableOpacity onPress = {() => this.onTilePress(1,0)} style = {[styles.tile, {borderLeftWidth: 0}]} >
        {this.tileColor(1,0)}
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => this.onTilePress(1,1)} style = {styles.tile} >
        {this.tileColor(1,1)}
        </TouchableOpacity>

        <TouchableOpacity  onPress = {() => this.onTilePress(1,2)} style = {[styles.tile, {borderRightWidth: 0}]} >
        {this.tileColor(1,2)}
        </TouchableOpacity>
      </View>

      <View style = {{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}} >
        <TouchableOpacity onPress = {() => this.onTilePress(2,0)} style = {[styles.tile, {borderLeftWidth: 0, borderBottomWidth: 0 }, ]} >
        {this.tileColor(2,0)}
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => this.onTilePress(2,1)} style = {[styles.tile, {borderBottomWidth: 0 }]} >
        {this.tileColor(2,1)}
        </TouchableOpacity>

        <TouchableOpacity onPress = {() => this.onTilePress(2,2)} style = {[styles.tile, {borderRightWidth: 0, borderBottomWidth: 0 }]} >
        {this.tileColor(2,2)}
        </TouchableOpacity>
      </View>

      <View style={{marginTop: 40}}>
        <Text>Antons text :D</Text>
        <Text>Antons text 2 D:</Text>
      </View>


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth:1,
    width: Dimensions.get('window').width*0.28,
    height: Dimensions.get('window').width*0.28,
  },
  scoreText: {
    fontSize: 75,
    paddingBottom: 50,
  }
});
