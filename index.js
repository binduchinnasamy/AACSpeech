import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  Image,
  ScrollView,
  AsyncStorage,
  StatusBar,
  ListView,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
//import {Cell }from './cell';
//var Speech = require('react-native-speech');
var Masterlist = require('./masterlist.json');
import List from './list';
import DetailsScreen from './details';
import HomeScreen from './homescreen';
import EditScreen from './edit';
import MyTalkApp from './landingscreen';
//import Tts from 'react-native-tts';
//import AndroidTextToSpeech from 'react-native-tts';
//console.ignoredYellowBox = ['Warning: setState(...)'];
console.disableYellowBox = true;
export default class AACSpeech extends Component {
 
  render() {
    return (
      <MyTalkApp />
    )
  }
}
AppRegistry.registerComponent('AACSpeech', () => MyTalkApp);
