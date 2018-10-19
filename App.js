import React, { Component } from 'react';
import { View, Text } from 'react-native';
import {createStackNavigator } from 'react-navigation';
import CameraScene from './src/camera-scene';
import HomeScene from './src/home-scene'
import CameraRollScene from './src/camera-roll-scene'

const RootStack = createStackNavigator({
  CameraScreen:{
    screen:CameraScene,
    navigationOptions:{
      header: null
    }
  },
  HomeScreen:{
    screen:HomeScene,
    navigationOptions:{
      title: 'Home App'
    }
  },
  CameraRollScreen:{
    screen:CameraRollScene,
    navigationOptions:{
      title: 'Gallery'
    }
  },
},{
  initialRouteName: 'HomeScreen'
});

class App extends Component {    

  render() {
    return (
      <RootStack/>
    );
  }
}

export default App;
