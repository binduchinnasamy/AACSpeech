
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
  NativeEventEmitter,
  NativeModules
  
} from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
//var Speech = require('react-native-speech');
var Masterlist = require('./masterlist.json');
import List from './list';
import DetailsScreen from './details';
import HomeScreen from './homescreen';
import EditScreen from './edit';
import Tts from 'react-native-tts';
//import AndroidTextToSpeech from 'react-native-tts';


var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

//Just to eleminate warnings from Tts module, No specific implementation
const ee = new NativeEventEmitter(NativeModules.TextToSpeech);
ee.addListener('tts-start', () => {});
ee.addListener('tts-finish', () => {});
ee.addListener('tts-cancel', () => {});

export default class ChildMainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          //datasource: Arr,
          selectedTab: 'blueTab',
          isLoading: true
        }
      }
      componentWillMount() {
        //Hide the status bar
        StatusBar.setHidden(false);
        AsyncStorage.getItem("myKey", (err, result) => {
          if (err) {
            let temp = [
              { 'key': 'motorbike.png', 'text': 'Lets go Bike' },
              { 'key': 'car.png', 'text': 'Car' },
              { 'key': 'casement_door.png', 'text': 'Open the Door' }];
            this.setState({ "myArray": temp, isLoading: false });
          }
          if (result !== null) {
            //this.setState({"myKey": result});
            this.setState({ "datasource": JSON.parse(result), isLoading: false });
          }
          else {
            /*let temp = [
              { 'key': 'motorbike.png', 'text': 'Lets go Bike' },
              { 'key': 'car.png', 'text': 'Car' },
              { 'key': 'casement_door.png', 'text': 'Open the Door' }]; */
              //Setting up the initial data if there is non
              //AsyncStorage.setItem("myKey",JSON.stringify(temp));
            //this.setState({ "datasource": temp, isLoading: false });
            this.setState({ "datasource": [], isLoading: false });
          }
        });
      }
      _getDataFromStore() {
    }
    _onPressButton(ref) {
        Tts.setDefaultLanguage('en-US');
        //Tts.setDefaultVoice('com.apple.ttsbundle.Samantha-compact');
        Tts.setDefaultRate(0.4);
        Tts.speak(ref,'ADD');
    }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            //headerRight: <Button title="Add New" onPress={() => params.handleAdd()} />
            headerRight: <Button title="Settings" onPress={() => navigation.navigate('List')} />
        };
    };
    componentWillReceiveProps(newProps) {
        if (newProps.screenProps.route_index === 0) {
          //this._myHomeFunction();
          alert('Here is child home tab!');
        }
      }
      _onNavigationStateChange = (prevState, newState) => {
       // this.setState({...this.state, route_index: newState.index});
       alert("Navigtion Changed");
      }
    render() {
        if (this.state.isLoading) {
            return <View><Text>Loading...</Text></View>;
          } else {
            let Arr2 = this.state.datasource.map((result, i) => {
              var temp = result.key;
              var imagenametoshow = (Platform.OS === 'ios') ? temp : temp.slice(0,-4);
              return (
                <TouchableHighlight onPress={() => this._onPressButton(result.text)} key={result.key}>
                  <View style={{
                    height: 100,
                    width: 100,
                    marginRight: 5,
                    marginTop: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderColor: 'powderblue',
                    borderWidth: 1
                  }}
                    >
                    <Image source={{ uri: imagenametoshow }} style={{ height: 95, width: 95 }}></Image>
                  </View>
                </TouchableHighlight>)
            });
        return (   
            <ScrollView style ={{backgroundColor: '#F5F3EE'}}>
                <View style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 25,
                marginLeft: 20,
                marginRight: 5,
                flexWrap: 'wrap',
                justifyContent: 'flex-start',
                
                }}>
                {Arr2}
                </View>
            </ScrollView>
        );
    }
    }
  }
  const styles = StyleSheet.create({
    icon: {
      width: 26,
      height: 26,
    },
  });