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
  Platform
} from 'react-native';
import { NavigationActions } from 'react-navigation';
//var Speech = require('react-native-speech');
var Masterlist = require('./masterlist.json');
import Tts from 'react-native-tts';

//Class
export default class DetailsScreen extends React.Component {
    constructor(props) {
      super(props);
      this._onPressNextButton = this._onPressNextButton.bind(this);
      this._onPressPreviousButton = this._onPressPreviousButton.bind(this);
      this._onPressSearchButton = this._onPressSearchButton.bind(this);
      this._searchHelper = this._searchHelper.bind(this);
      this._onPressSaveButton = this._onPressSaveButton.bind(this);
      this._onPressSpeakButton = this._onPressSpeakButton.bind(this);
      this._onPressCancelButton = this._onPressCancelButton.bind(this);
    }
    componentWillMount() {
      //Hide the status bar
      var filesarray = Masterlist;
      this.setState(
        { "filessarray": filesarray, 
          "imagetoshow": filesarray.files[0].filename,
          "speakas":filesarray.files[0].tag,
          "currentposition":0,
          "buttondisabled": true 
        });
        AsyncStorage.getItem("myKey", (err, result) => {
          if (err) {
          }
          if (result !== null) {
            //this.setState({"myKey": result});
            this.setState({ "myitems": JSON.parse(result) });
          }
          else {   
              //If the device data is empty (happens during the first time load) 
              //Initializing with empty array
              this.setState({"myitems":[]});
          }
        });
    }
    _onPressPreviousButton() {
      var currentposition = this.state.currentposition;
      if(currentposition !== -1) {
          if(currentposition !==0) {
          var previousposition = currentposition-1;
          this.setState(
            {
              "currentposition":previousposition,
              "imagetoshow":this.state.filessarray.files[previousposition].filename,
              "speakas":this.state.filessarray.files[previousposition].tag
            }
          )
        }
    }
    }
    _onPressNextButton() {
      var currentposition = this.state.currentposition;
      if(currentposition !== -1) {
      var index = currentposition+1;
      var arraylength = this.state.filessarray.files.length;
        if(index !== arraylength) {
          var nextposition = currentposition+1;
          this.setState(
            {
              "currentposition":nextposition,
              "imagetoshow":this.state.filessarray.files[nextposition].filename,
              "speakas":this.state.filessarray.files[nextposition].tag
            }
          )
      }
    }
    }
    _searchHelper(text,index, arr){
        var searchtext = this.state.search.trim().toLowerCase();
      if(typeof(text.tag) !== 'undefined' && text.tag !==null && text.tag.length >0) { //Checking of Tag is not empty
        if(text.tag.trim().toLowerCase().indexOf(searchtext)!==-1){
            return true;
        }
        else{
            return false;
        }
      } 
      else {
        return false;
      }
    }
    _onPressSearchButton() {
      if(this.state.search){
      let arraytosearch = Masterlist;
      var searchtext = this.state.search.trim();
      var files = arraytosearch.files.filter(this._searchHelper);
      var resultArray = {files:files};
      if(resultArray.files.length >0){
        this.setState(
          { "filessarray": resultArray, 
            "imagetoshow": resultArray.files[0].filename,
            "speakas":resultArray.files[0].tag,
            "currentposition":0,
            "buttondisabled": false
          });
      }
      else {
        this.setState(
          { "filessarray":"", 
            "imagetoshow":"",
            "speakas":"",
            "currentposition":-1,
            "buttondisabled": true
          });
        
      }
    }
    }
    _onPressSaveButton() {
      var myitems = this.state.myitems;
      var imagetoadd = this.state.imagetoshow;
      var speakastoadd = this.state.speakas;
      myitems.push( { 'key':imagetoadd , 'text': speakastoadd });
      AsyncStorage.setItem("myKey",JSON.stringify(myitems));
      //this.props.navigation.navigate('Home');
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'}),
          NavigationActions.navigate({ routeName: 'List'})
        ]
      });
      this.props.navigation.dispatch(resetAction); 
    }
    _onPressCancelButton(){
      const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'}),
          NavigationActions.navigate({ routeName: 'List'})
        ]
      });
      this.props.navigation.dispatch(resetAction); 
    }
    static navigationOptions = {
      title: 'Add New',
    };
    _onPressSpeakButton() {
       
      if(this.state.speakas){
          Tts.setDefaultLanguage('en-US');
          //Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact');
          Tts.setDefaultRate(0.4);
          Tts.speak(this.state.speakas);
        }
      }
    render() {
      //Use params to receive any value from previous screen
      const { params } = this.props.navigation.state;
      //Removing the file extension for Android
      if(this.state.imagetoshow){
      var imagenametoshow = (Platform.OS === 'ios') ? this.state.imagetoshow : this.state.imagetoshow.slice(0,-4);
      var speakas = this.state.speakas;
      }
      else{
        var imagenametoshow = (Platform.OS === 'ios') ? "blank.png" : "blank";
        var speakas = "";
      }
      //var sourcearray = this.state.datasource
      return (
        <ScrollView style={styles.scrollvview}>
          <View style={styles.container}>
        <View style={styles.searchrow}>
          <View style={{width:40}}></View>
          <TextInput
          style={styles.searctextbox} onChangeText={(text) => this.setState({"search":text})} placeholder ="Type here to search"
          />
          <TouchableHighlight onPress= {this._onPressSearchButton}>
          <Image source={require('./images/appicons/search.png')} style ={{ marginLeft: 5}}/>
          </TouchableHighlight>
        </View>
          <View style={styles.imagerow}>
                 <View style={styles.imagerowitemsview}>
                    <TouchableOpacity onPress={this._onPressPreviousButton} disabled={this.state.buttondisabled}>
                    <Image 
                    source={require('./images/appicons/previous.png')}
                    style={{ flex:1, width:50, height:50}}>
                    </Image>
                    </TouchableOpacity>
                </View>
                <View style={styles.imagerowitemsview}>
                    <Image 
                    source={{ uri: imagenametoshow}} 
                    style={{ height: 175, width: 175, borderColor: 'powderblue', flex:2, borderWidth:1, borderRadius:10, flex:2 }}>
                    </Image>
                </View>
                <View style={styles.imagerowitemsview}>
                    <TouchableOpacity onPress={this._onPressNextButton} disabled={this.state.buttondisabled}>
                    <Image 
                    source={require('./images/appicons/next.png')}
                    style={{ flex:1, width:50, height:50}}>
                    </Image>
                    </TouchableOpacity>     
                </View>
            </View>
            <View style={styles.speakasrow}>
          <TouchableOpacity onPress ={this._onPressSpeakButton}> 
          <Image source={require('./images/appicons/speaker-24.png')} style ={{ marginRight: 5}}/>
          </TouchableOpacity>
          <TextInput style={styles.speakastextbox}  defaultValue = {speakas}
            onChangeText={(text) => this.setState({"speakas":text})}
          />
          </View>
            <View style={styles.buttonrow}>
            <TouchableOpacity onPress={this._onPressSaveButton} disabled={this.state.buttondisabled}>
              <Image source={require('./images/appicons/btnSave.png')} style ={{ marginRight: 5}} />
            </TouchableOpacity>
            <TouchableOpacity onPress ={this._onPressCancelButton}>
                <Image source={require('./images/appicons/btnCancel.png')} />
            </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
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
    searchrow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
      marginBottom: 5,
      alignItems: 'center',
      borderWidth: 0
    },
    imagerow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 5,
      marginBottom: 5,
      alignContent:'center'
    },
    speakasrow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 20,
      marginBottom: 10,
      alignItems: 'center',
      borderWidth:0
    },
    buttonrow:{
      flexDirection: 'row',
      justifyContent: 'flex-start',
      marginTop: 10,
      marginBottom: 10,
      borderWidth:0
    },
    imagerowitemsview: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent:'center'
    },
    searctextbox:{
      width:200, 
      borderColor: 'powderblue', 
      borderWidth: 1, 
      borderRadius: 5,
      ...Platform.select({
        ios: {
          height: 30
        },
        android: {
          height: 40
        }
      })
    },
    speakastextbox:{
      width:220, 
      borderColor: 'powderblue', 
      borderWidth: 1, 
      borderRadius: 5,
      ...Platform.select({
        ios: {
          height: 30
        },
        android: {
          height: 40
        }
      })
    }
  })