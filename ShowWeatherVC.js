import React, {
  Component,
  NavigationControllerIOS,
} from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import getWeather from "/Users/olegmytsouda/Desktop/q/Proj/ios/API.js"

class ShowWeatherVC extends Component {

  constructor(props) {
    super(props);
    this.state = { loaded: false , response: [] };
    }

  getData(){
    getWeather().then((response) => {
          this.setState({
            loaded: true,
            response: response,
        });
      })
      .done();
  }

  componentDidMount() {
    this.getData();
  }

  renderLoadingView() {
   return (
     <View style={styles.container}>
       <Text>
         Loading weather...
       </Text>
     </View>
   );
 }

  render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={styles.container}>
        <Image
          source={{uri: 'http://openweathermap.org/img/w/'+this.state.response.list[0].weather[0].icon+'.png'}}
          style={styles.thumbnail}
        />
        <Text style={styles.welcome}>
          Тепер у Великому Березному {(this.state.response.list[0].main.temp_max - 273).toFixed(0)} °С!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail: {
  width: 100,
  height: 100,
  },
});


AppRegistry.registerComponent('ShowWeatherVC', () => ShowWeatherVC);
