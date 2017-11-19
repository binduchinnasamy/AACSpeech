import React, { Component } from 'react';
import {
  Image,              // Renders background image
  StyleSheet,         // CSS-like styles
  Text,               // Renders text
  TouchableOpacity,   // Handles row presses
  View,
  Alert,
  Platform               // Container component
} from 'react-native';
import Dimensions from 'Dimensions';
import { StackNavigator} from 'react-navigation';

export default class Row extends Component {
    
      // Extract movie and onPress props passed from List component
      render({ item,navigation,rowID,refresh } = this.props) {
        const { key,text } = item;
        //Change for Android
        var imagenametoshow = (Platform.OS === 'ios') ? key : key.slice(0,-4);
        //const {navigatorv} = navigator
        return (
          // Row press handler
          <TouchableOpacity      
              onPress={()=> {navigation.navigate('Edit',{filename:key,speaktext:text,rowID:rowID})}}
          >
          <View style={styles.container}>
            <Image source={{uri: imagenametoshow}}  style={styles.photo} />
            <Text style={styles.text}>
              {text}
            </Text>
          </View>
            </TouchableOpacity>
        );
      }
    
    }
//Style elements for ListView
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
      },
      text: {
        marginLeft: 12,
        fontSize: 20,
      },
      photo: {
        height: 50,
        width: 50,
        borderRadius: 5,
      },
      separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
      },
    });