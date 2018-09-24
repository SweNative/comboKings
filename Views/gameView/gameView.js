import React, { Component } from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity, Alert} from 'react-native';
import getRandomInt from '../../Assets/functions/getRandomInt'
import Modal2 from '../../Components/Modal2'

export default class gameView extends Component {
    constructor(props){
        super(props);
      
        this.state = {
          gameState: [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
          ],
          score: 0,
          comboScore: 0,
          isCombo: true,
          hasNotStarted: true,
          timeLeft: 30,
          isTimeLeft: true,
          timer: null,
        }
      }
    
      componentDidMount() {
        this.InitializeGame()
      }
     
      InitializeGame = () => {
        this.setState({gameState:
          [
            [100, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
          ]
        })

        this.onTilePress(0,0)

        newScore = 0
        newComboScore = 0
        isCombo = false

        this.setState({comboScore: newComboScore})
        this.setState({score: newScore})
        this.setState({isCombo: isCombo})
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
        if(this.state.isTimeLeft){
        if(value === 0){
         newGameState[row][col] = 10
        }
        else if(value === 10){
          newGameState[row][col] = 100
        }
        else if(value === 100){ 
          newGameState[row][col] = 0
        }
        this.setState({gameState: newGameState})
    
    
    
      var x = true
      newScore = this.state.score
      newComboScore = this.state.comboScore
      isCombo = false
      while(x){
        x = false
        var combo = this.threeInRow()
        i
        for(var i = 0; i < 3; i++){
            if(combo[0][i] === 1){
                isCombo = true
                newComboScore++
                newScore = newScore + newComboScore
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
            isCombo = true
            newComboScore++
            newScore = newScore + newComboScore
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
          isCombo = true
          newComboScore++
          newScore = newScore + newComboScore
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
          isCombo = true
          newComboScore++
          newScore = newScore + newComboScore
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
    
        if(!isCombo){
          newComboScore = 0
        }
        
    
        this.setState({gameState: newGameState, comboScore: newComboScore, score: newScore, isCombo})
        
      }
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

      tick = () => {
        timeLeft =  this.state.timeLeft -1
        this.setState({timeLeft: timeLeft});
        if(timeLeft <= 0){
          clearInterval(this.state.timer);
          this.setState({isTimeLeft: false});
          this.gameOver()
        }
      }

      decreaseTime = () => {
        this.setState({hasNotStarted: false})
        let timer = setInterval(this.tick, 1000);
        this.setState({timer});
      }

      gameOver = () => {
        Alert.alert(
          'Game Over',
          'Score: ' + this.state.score,
          [{ text: 'Play Again', onPress: () => this.playAgain() }],
          {
            cancelable: false
          }
        )

      }

      playAgain = () => {

      }


     
      render() {
        return (
         this.state.hasNotStarted 
         ? <View style={styles.container}> 
            <TouchableOpacity onPress = {() => this.decreaseTime()} style = {styles.startBox}>
             <Text style={styles.startText} >
              {'Tap to Start!'}
             </Text> 
            </TouchableOpacity>
            </View>
          :<View style={styles.container}> 
          <Text style={styles.comboScoreText} >
              {'Time: ' + this.state.timeLeft}
          </Text>
          <View style = {{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.comboScoreText} >
              {'Combo: ' + this.state.comboScore}
            </Text>
    
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
    
          </View>
          
        );
      }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#9efffd',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column'
    },
    container2: {
      flex: 1,
      backgroundColor: '#9efffd',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row'
    },
    tile: {
      borderWidth:1,
      width: Dimensions.get('window').width*0.28,
      height: Dimensions.get('window').width*0.28,
    },
    scoreText: {
      fontSize: 75,
      marginBottom: 50,
    },
    comboScoreText: {
      fontSize: 20,
      marginBottom: 15,
    },
    startBox: {
        backgroundColor:'#f44170',
        width:300,
        paddingTop:10,
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20, 
        borderRadius:10,
    },
    startText: {
        fontSize: 50,
    },
    playAgainText: {
      fontSize: 30,
      zIndex: 10,
    }
  });