import React, {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/screens/Home';
import Contact from './src/screens/Contact';
import Policy from './src/screens/Policy';
import Rate from './src/screens/Rate';
import SplashScreen from './src/screens/SplashScreen';
import AsyncStorage from '@react-native-community/async-storage';
import {fcmService} from './src/alerts/FCMService';
import {localNotificationService} from './src/alerts/LocalNotificationService';

const Stack = createStackNavigator();
const App = () => {
  const [showSplash, setShowSplash] = useState(null);

  useEffect(() => {
    async function getSplashStatus() {
      let isSplash = await AsyncStorage.getItem('@splash_done');
      if (isSplash === null) {
        setShowSplash(true);
        //remove this if you want splash screen to always show up
        // await AsyncStorage.setItem('@splash_done', 'true');
        setTimeout(() => {
          setShowSplash(false);
        }, 2000);
      } else {
        setShowSplash(false);
      }
    }
    getSplashStatus();
  }, []);

  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.subscribeToTournament();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
  
    async function onRegister(token) {
      console.log({token});
      // await AsyncStorage.setItem(`@firebase_token`, token);
    }
  
    function onNotification(notify) {
      
      
      const options = {
        soundName: 'default',
        playSound: true,
      };
      localNotificationService.showNotification(
        new Date().getMilliseconds(),
        notify.title,
        notify.body,
        notify,
        options,
      );
    }
  
    function onOpenNotification(notify) {
      
    }
  
    return () => {
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Contact" component={Contact} />
        <Stack.Screen name="Policy" component={Policy} />
        <Stack.Screen name="Rate" component={Rate} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
