import React from 'react';
import {Image, View, StyleSheet} from 'react-native';

const SplashScreen = (props) => {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/logo.png')} style={styles.img} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6EC1E4',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
      height: '50%',
      width: '50%',
      resizeMode: 'contain'
  }
});

export default SplashScreen;
