import React, { Component } from 'react';
import {
   Navigator
 } from 'react-native';

import {
TabNavigator, StackNavigator
} from 'react-navigation';

import ChildMainScreen from './childmainscreen';
import DetailsScreen from './details';
import HomeScreen from './homescreen';
import EditScreen from './edit';

const MyTalkApp = StackNavigator({
    Home: {screen: ChildMainScreen },
    List: { screen: HomeScreen },
    Details: { screen: DetailsScreen },
    Edit: { screen: EditScreen }
    },

    {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },

  });

  export default MyTalkApp;