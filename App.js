import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';

export default class App extends React.Component {

  constructor(props){
    super(props);
  
    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
    }
  }

  componentDidMount() {
    this.InitializeGame()
  }

  InitializeGame = () => {
    this.setState({gameState:
      [
        [1, 0, 1],
        [0, 2, 0],
        [0, 2, 2]
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
    else if(value === 1){
      return <View style = {{backgroundColor: '#40f418', 
      width: Dimensions.get('window').width*0.28,
      height: Dimensions.get('window').width*0.28,}} />;
    }
    else if(value === 2){ 
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
     newGameState[row][col] = 1
    }
    else if(value === 1){
      newGameState[row][col] = 2
    }
    else if(value === 2){ 
      newGameState[row][col] = 0
    }
    this.setState({gameState: newGameState})
  }

  render() {
    return (
      <View style={styles.container}> 


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
  }
});
