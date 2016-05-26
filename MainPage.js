'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Component,
  View,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  Image,
} = React;

import getWeather from "/Users/olegmytsouda/Desktop/q/Proj/ios/API.js"

class MainPage extends Component {

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

  renderLoadingView(route, navigator) {
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

  renderScene() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
      <Text>
        Loading weather...
      </Text>
      </View>
    );
  }


  render() {
    if (!this.state.loaded) {
      return this.renderScene();
    }
    return (
      <View style = {styles.const}>
      <View style = {styles.navView}>
        <Navigator
          renderScene={this.renderLoadingView.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                routeMapper={NavigationBarRouteMapper} />
            }
        />
        </View>
        </View>
    );
  }

}

var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          Show Weather
        </Text>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  cons : {
    top : 0,
    bottom: 10,
    left: 0,
    right: 0,
  },
  navView : {
    justifyContent: 'center',
    height:300,
    backgroundColor: '#FFFFFF',
  },
  clearColor : {
    backgroundColor: '#FFFFFF',
    opacity: .4,
  },
  clear : {
    backgroundColor: '#FFFFFF',
    opacity: .4,
    top:300,
  },
  container: {
    top: 50,
    height:300,
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

module.exports = MainPage;
