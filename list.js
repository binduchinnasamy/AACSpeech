import React, { Component } from 'react';
import {
  ListView,       // Renders a list
  RefreshControl, // Refreshes the list on pull down
  Text,
  AsyncStorage,
  StyleSheet,
  View
} from 'react-native';
import Row from './row'
//console.ignoredYellowBox = ['Warning: setState(...)'];
export default class List extends Component {
  constructor(props) {
    super(props);
    //this._fetchData();
    //load content from AsyncStorage
     AsyncStorage.getItem("myKey",(err,result)=>{
            if(err){
              //Handle error case 
            }
            //If already data available in the device
            if(result!==null){
              this.setState({"myKey": result});
              this.setState({dataSource: this.state.dataSource.cloneWithRows(JSON.parse(result))
              });
            }
            else{ //If the device data in empty, initialize with empty array
              this.setState({dataSource:[],IsEmpty:true})
              
            }
          });
  }
      /**
       * Store the data for ListView
       */
      state = {
          // ListView DataSource object
        dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      }
      /**
       * Call _fetchData after component has been mounted
       */
      componentDidMount() {
          // Fetch Data
        //this._fetchData();
      }
      componentWillMount() {
       //this._fetchData();
      }
      _fetchData = () => {
        AsyncStorage.getItem("myKey",(err,result)=>{
            if(err){
              //Handle error case 
            }
            //If already data available in the device
            if(result!==null){
              this.setState({"myKey": result});
              this.setState({dataSource: this.state.dataSource.cloneWithRows(JSON.parse(result))
              });
            }
            else{ //If the device data in empty, initialize with empty array
              this.setState({dataSource:[],IsEmpty:true})
              
            }
          });
      }
      _renderRow = (rowData, sectionID, rowID) => {
        const {navigation} = this.props.navigation;
        return (
            <Row 
            item = {rowData}
            navigation = {navigation}
            rowID ={rowID}
            title="Details"
            />
        );
      }
      render() {
       if(!this.state.IsEmpty){
        return (
            <ListView style ={{backgroundColor: '#F5F3EE'}}
              // Data source from state
              dataSource={this.state.dataSource}
              renderRow={this._renderRow}
              renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
              // Refresh the list on pull down
              //Not implemented
            />
          );
        } else {
         return(null);
        }
      }
    }
    const styles = StyleSheet.create({
      separator: {
        flex: 1,
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
      },
    });
    