import React from 'react';
import { Component } from 'react';
import { 
  AppRegistry,
  FlatList, 
  StyleSheet, 
  Text, 
  View,
  ActivityIndicator,
  Platform,
  Alert
} from 'react-native';

export default class RedditHotPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    return fetch('https://www.reddit.com/r/canada/hot.json')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          dataSource: responseJson.data.children,
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  GetFlatListItem (author_name) {
    Alert.alert("Author is " + author_name);
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      // <View style={{flex: 1, padding:20}}>
      //   <ListView
      //     dataSource={this.state.dataSource}
      //     renderRow={(rowData) => 
      //       <Text>{rowData.data.title}, By {rowData.data.author}</Text>}
      //   />
      // </View>

      <View style={styles.MainContainer}>
        <FlatList
          data={ this.state.dataSource }
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={({item}) => <Text style={styles.FlatListItemStyle} onPress={this.GetFlatListItem.bind(this, item.data.author)} > {item.data.title} </Text>}
          keyExtractor={(item, index) => index}
          />
      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer :{
    justifyContent: 'center',
    flex:1,
    margin: 10,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
  },

  FlatListItemStyle: {
    padding: 10,
    fontSize: 18,
    //height: 44,
  },

});
