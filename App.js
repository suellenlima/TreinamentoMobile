import React, {Component} from 'react'; // 1
import {Text, View, StyleSheet, TextInput, FlatList} from 'react-native'; // 2
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import api from './service/api';
import Card from './components/card';

// 3
class App extends Component {
  state = {
    searchText: '',
    searchResults: null, // 1
  }

  submitSearch = async () => {
    if (this.state.searchText != '') { 
      try {
        const response = await api.get('/search/shows', {
          params: { q: this.state.searchText },
        });
        this.setState({ searchResults: response.data }); // 2
      } catch(error) { 
        alert(JSON.stringify(error));
      }
    }
  }
  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.search}>
          <TextInput
          placeholder={'Procure uma série'}
          style={styles.input}
          onChangeText={(text) => this.setState({ searchText: text })}
          onSubmitEditing={() => this.submitSearch()}
         />
        </View>
        <View style={styles.results}>
        <FlatList
          data={this.state.searchResults}
          renderItem={({ item }) => <Card info={item.show} />}
          keyExtractor={item => item.show.id}
        />
        </View>
      </View>
    );
  }
}

// 5
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
  },
  search: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    marginTop: 55,
    height: 40,
    width: 250,
    borderColor: 'lightgray',
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
  },
  results: {
    flex: 4,
    backgroundColor: 'lightgray',
    alignItems: 'center',
  },
});

const AppNavigator = createStackNavigator({
  Home: {
    screen: App,
    navigationOptions: {
      header: null
    }
  },
});

export default createAppContainer(AppNavigator);