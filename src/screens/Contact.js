import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';

const Contact = (props) => {
  return (
    <View style={styles.container}>
      <Header title={'Contact Us'} navigation={props.navigation} />
      <ScrollView style={{flex: 1}}>
        <View style={styles.inputBox}>
          <TextInput placeholder={'Your Name'} />
        </View>
        <View style={styles.inputBox}>
          <TextInput placeholder={'Your Email'} />
        </View>
        <View style={[styles.inputBox, {height: 150}]}>
          <TextInput placeholder={'Your Message'} multiline={true} />
        </View>
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputBox: {
    borderColor: '#000',
    borderWidth: 1,
    padding: 5,
    margin: 20,
    borderRadius: 10,
  },
  btn: {
    backgroundColor: '#6EC1E4',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  btnText: {
      fontFamily: 'Arimo-Variable',
      fontSize: 18
  }
});

export default Contact;
