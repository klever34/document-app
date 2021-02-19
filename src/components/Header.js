import React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Header = (props) => {
  return (
      <View style={styles.headerBox}>
        <AntDesign
          name={'arrowleft'}
          size={22}
          color={'#000'}
          onPress={() => props.navigation.goBack()}
        />
        <Text style={styles.headerText}>{props.title}</Text>
        <AntDesign
          name={'arrowleft'}
          size={20}
          color={'#000'}
          style={{opacity: 0}}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  headerBox: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6EC1E4',
    paddingHorizontal: 10,
    width: '100%',
  },
  headerText: {
    fontFamily: 'Armata-Regular',
    fontSize: 22,
  },
  bodyText: {
    fontFamily: 'Armata-Regular',
    fontSize: 16,
    padding: 10
  }
});

export default Header;
