//Component for Screen to Add new Images
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
  TouchableOpacity,
  Platform,
  InteractionManager

} from 'react-native';
import { NavigationActions } from 'react-navigation';
//var Speech = require('react-native-speech');
import Tts from 'react-native-tts';
//Class
export default class EditScreen extends React.Component {
    constructor(props) {
      super(props);
      this._onPressSaveButton = this._onPressSaveButton.bind(this);
      this._onPressDeleteButton = this._onPressDeleteButton.bind(this);
      this._onPressSpeakButton = this._onPressSpeakButton.bind(this);
    }
    componentWillMount() {
      //Hide the status bar
      //var filesarray = Masterlist;
      this.setState(
        { 
          "imagetoshow": this.props.navigation.state.params.filename,
          "speakas":this.props.navigation.state.params.speaktext,
          "index":this.props.navigation.state.params.rowID 
        });
        AsyncStorage.getItem("myKey", (err, result) => {
          if (err) {
          }
          if (result !== null) {
            //this.setState({"myKey": result});
            this.setState({ "myitems": JSON.parse(result) });
          }
          else {    
          }
        });
    }
    _onPressSpeakButton() {
          Tts.setDefaultLanguage('en-US');
          //Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact');
          Tts.setDefaultRate(0.4);
          Tts.speak(this.state.speakas);
      }
    _onPressSaveButton() {
      //InteractionManager.runAfterInteractions(()=>{
        var myitems = this.state.myitems;
        var indextoupdate = this.state.index;
        myitems[indextoupdate].text = this.state.speakas;
        AsyncStorage.setItem("myKey",JSON.stringify(myitems));
        //to go back and refresh the previous screen
       const resetAction = NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({ routeName: 'Home'}),
              NavigationActions.navigate({ routeName: 'List'})
            ]
          });
          this.props.navigation.dispatch(resetAction);
          //this.props.navigation.goBack();
     // });
       
    }
    _onPressDeleteButton(){
        var myitems = this.state.myitems;
        var indextodelete = this.state.index;
        var newmyitems = myitems.splice(indextodelete,1);
        AsyncStorage.setItem("myKey",JSON.stringify(myitems),(error)=>{

        });
        //to go back and refresh the previous screen
      const resetAction = NavigationActions.reset({
            index: 1,
            actions: [
              NavigationActions.navigate({ routeName: 'Home'}),
              NavigationActions.navigate({ routeName: 'List'})
            ]
          });
          this.props.navigation.dispatch(resetAction); 
          //console.ignoredYellowBox = ['Warning: setState(...)'];
          //this.props.navigation.goBack();
    }
    //Set up the title in the navigation bar
    static navigationOptions = {
      title: 'Edit',
    };
    render() {
      //Use params to receive any value from previous screen
      const { params } = this.props.navigation.state;
      var speakas = this.state.speakas;
      var imagenametoshow = (Platform.OS === 'ios') ? this.state.imagetoshow : this.state.imagetoshow.slice(0,-4);
      var alertmessage = "Are you sure to delete this card?";
      return (
        <ScrollView style={styles.scrollvview}>
          <View style={styles.container}>
              <Image 
                source={{ uri: imagenametoshow}} 
                style={styles.image}>
              </Image>
            <View style={styles.speakasrow}>
              <TouchableOpacity onPress={this._onPressSpeakButton}> 
              <Image source={require('./images/appicons/speaker-24.png')} style ={{ marginRight: 15}}/>
              </TouchableOpacity>
              <TextInput style={styles.speakastextbox}  defaultValue = {speakas}
                        onChangeText={(text) => this.setState({"speakas":text})}
              />
            </View>
            <View style={styles.buttonsrow}>
            <TouchableOpacity onPress={this._onPressSaveButton}> 
            <Image source={require('./images/appicons/btnUpdate.png')} style ={{ marginRight: 15}}/>
            </TouchableOpacity>
           <TouchableOpacity onPress={this._onPressDeleteButton}
              onPress={() => Alert.alert(
                'Delete',
                alertmessage,
                [
                  {text: 'OK', onPress:this._onPressDeleteButton},
                  {text: 'Cancel'},
                ]
              )}
           > 
            <Image source={require('./images/appicons/btnDelete.png')} style ={{ marginRight: 15}}/>
            </TouchableOpacity> 
            </View>
          </View>
        </ScrollView>
      );
    }
  }
  //Style elements for ListView
  const styles = StyleSheet.create({
    scrollvview: {
      backgroundColor: '#F5F3EE'
    },
    container: {
      flexDirection: 'column',
      marginLeft: 0,
      marginTop: 0,
      marginRight: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5F3EE'
    },
    image: {
      height: 175, 
      width: 175, 
      borderColor: 'powderblue', 
      flex:2, 
      borderWidth:1, 
      borderRadius:10, 
      marginTop: 30
    },
    speakasrow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 10,
      alignItems: 'center',
      borderWidth:0
    },
    speakastextbox: {
      width:200, 
      borderColor: 'powderblue', 
      borderWidth: 1, 
      borderRadius: 5,
      ...Platform.select(
        {
          
          ios: {
            height: 30, 
          },
          android:{
            height: 50, 
          }
        }
      )
    },
    buttonsrow: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      marginTop: 10,
      marginBottom:30
    }
    
  });