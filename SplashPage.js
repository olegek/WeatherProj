'use strict';

var React = require('react-native');
var {
  Component,
  Image,
  StyleSheet,
  View,
  Text,
} = React;

class SplashPage extends Component {
  componentWillMount() {
    var navigator = this.props.navigator;
    setTimeout(() => {
      navigator.replace({
        id: 'LoginPage',
      });
    }, 1000);
  }
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{uri: 'http://openweathermap.org/img/w/02d.png'}}
          style={styles.thumbnail}
        />
        <Text style={styles.welcome}>
          Weather app!
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

module.exports = SplashPage;
