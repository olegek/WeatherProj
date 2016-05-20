import React, {
  Component,
} from 'react';
import {
  AppRegistry,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

class Proj extends Component {

  constructor(props) {
    super(props);
    this.state = { loaded: false , response: [] };
    }

  getWeather(){
      fetch("http://api.openweathermap.org/data/2.5/forecast/city?id=690197&APPID=4259ac50f5b3023fdc36416348a232a9", {method: "GET"})
      .then((response) => response.json())
      .then((responseData) => {
          this.setState({
            loaded: true,
            response: responseData,
        });
      })
      .done();
  }

  componentDidMount() {
    this.getWeather();
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


AppRegistry.registerComponent('Proj', () => Proj);
