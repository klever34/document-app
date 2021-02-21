import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import {baseUrl} from '../constants/index';
import axios from 'axios';

const Contact = (props) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [msg, setMsg] = useState(null);
  const [showIndicator, setIndicator] = useState(false);

  const submitFeedback = async () => {
    if (!name || !email || !msg) {
      alert('All fields are required');
      return;
    }
    setIndicator(true);
    try {
      const response = await axios.post(`${baseUrl}contactus`, {
        name,
        email,
        msg,
      });

      console.log(response.data);
      alert(response.data.msg);
      setIndicator(false);
      setName('');
      setEmail('');
      setMsg('');
    } catch (error) {
      setIndicator(false);
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={'Contact Us'} navigation={props.navigation} />
      <ScrollView style={{flex: 1}}>
        <View style={styles.inputBox}>
          <TextInput
            placeholder={'Your Name'}
            value={name}
            onChangeText={(text) => setName(text)}
          />
        </View>
        <View style={styles.inputBox}>
          <TextInput
            placeholder={'Your Email'}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View style={[styles.inputBox, {height: 150}]}>
          <TextInput
            placeholder={'Your Message'}
            multiline={true}
            value={msg}
            onChangeText={(text) => setMsg(text)}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => submitFeedback()}>
          <Text style={styles.btnText}>Submit</Text>
          {showIndicator && (
            <ActivityIndicator
              size={'small'}
              color={'#000'}
              style={{paddingLeft: 10}}
            />
          )}
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
    flexDirection: 'row',
  },
  btnText: {
    fontFamily: 'Arimo-Variable',
    fontSize: 18,
  },
});

export default Contact;
