import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import {baseUrl} from '../constants/index';
import axios from 'axios';

const Rate = (props) => {
  const [defaultRating, setDefaultRating] = useState(0);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [msg, setMsg] = useState(null);
  const [showIndicator, setIndicator] = useState(false);
  const starImageFilled = require('../assets/images/star_filled.png');
  const starImageCorner = require('../assets/images/star.png');

  const submitRating = async () => {
    console.log(msg, defaultRating);
    if (!msg) {
      alert('Kindly enter a message');
      return;
    }
    setIndicator(true);
    try {
      const response = await axios.post(`${baseUrl}rating`, {
        msg,
        rate: defaultRating,
      });

      console.log(response.data);
      alert(response.data.msg);
      setIndicator(false);
      setMsg('');
    } catch (error) {
      setIndicator(false);
      console.log(error);
    }
  };

  const CustomRatingBar = () => {
    return (
      <View style={styles.customRatingBarStyle}>
        {maxRating.map((item, key) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              key={item}
              onPress={() => setDefaultRating(item)}>
              <Image
                style={styles.starImageStyle}
                source={
                  item <= defaultRating ? starImageFilled : starImageCorner
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={'Rate'} navigation={props.navigation} />
      <ScrollView style={{flex: 1, margin: 20}}>
        <Text style={[styles.btnText, {fontSize: 22}]}>
          Your rating is very{'\n'}important for us
        </Text>
        <CustomRatingBar />
        <View style={[styles.inputBox, {height: 150}]}>
          <TextInput
            placeholder={'Give your valuable feeback'}
            multiline={true}
            value={msg}
            style={{fontFamily: 'Arimo-Variable', fontSize: 16}}
            onChangeText={(text) => setMsg(text)}
          />
        </View>
        <TouchableOpacity style={styles.btn} onPress={() => submitRating()}>
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
    marginVertical: 20,
    // borderRadius: 10,
  },
  btn: {
    backgroundColor: '#6EC1E4',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  btnText: {
    fontFamily: 'Arimo-Variable',
    fontSize: 18,
  },
  customRatingBarStyle: {
    // justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },
});

export default Rate;
