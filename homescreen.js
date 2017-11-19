
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Alert,
  Image,
  TabBarIOS,
  ScrollView,
  AsyncStorage,
  StatusBar,
  ListView,
  Button,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
var Masterlist = require('./masterlist.json');
import List from './list';
//Components
export default class HomeScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
      const { params = {} } = navigation.state;
      return {
          //headerRight: <Button title="Add New" onPress={() => params.handleAdd()} />
          headerRight: <Button title="Add New" onPress={() => navigation.navigate('Details')} />
      };
  };
    constructor(props) {
      super(props);
      this._doNavigate = this._doNavigate.bind(this);
      this._refreshFunction = this._refreshFunction.bind(this);
      //this.setState({ togle: false });
    }
    _doNavigate(){
      this.props.navigation.navigate('Details');
    }
    _onAddPressed() {
      //alert('Save Details');
      this.props.navigation.navigate('Details');
  }
    componentDidMount() {
      this.props.navigation.setParams({ handleAdd: this._onAddPressed},{navigation:this.props.navigation});
    }
    _refreshFunction(){
    }
    //This line to display the List of Images (comging from </List>)
    render() {
      const { navigation } = this.props;
      //const {refresh} = this._refreshFunction;
      return (<ScrollView>
                <List navigation={this.props} refresh={this._refreshFunction.bind(this)}/>
              </ScrollView>
      );
    }
  }
  