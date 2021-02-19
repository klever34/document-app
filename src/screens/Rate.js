import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image
} from 'react-native';
import Header from '../components/Header';

const Rate = (props) => {
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);

  const starImageFilled =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_filled.png';

  const starImageCorner =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/star_corner.png';

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
                  item <= defaultRating
                    ? {uri: starImageFilled}
                    : {uri: starImageCorner}
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
          />
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
    marginTop: 20,
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
