import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
} from 'react-native';
import FlatListSlider from '../FlatListSlider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MenuModal from '../components/MenuModal';

const Home = (props) => {
  const [showModal, setShowModal] = useState(false);
  const data = [
    {
      image:
        'https://images.unsplash.com/photo-1567226475328-9d6baaf565cf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      desc: 'Silent Waters in the mountains in midst of Himilayas',
    },
    {
      image:
        'https://images.unsplash.com/photo-1455620611406-966ca6889d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1130&q=80',
      desc:
        'Red fort in India New Delhi is a magnificient masterpeiece of humans',
    },
    {
      image:
        'https://images.unsplash.com/photo-1477587458883-47145ed94245?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80',
      desc:
        'Sample Description below the image for representation purpose only',
    },
  ];

  const exitModal = (mode) => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBox}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.img}
        />
        <Text style={styles.headerText}>Jharnet.com</Text>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Image
            source={require('../assets/images/menu.png')}
            style={styles.img}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={{flex: 1}}>
        <View style={styles.body}>
          <FlatListSlider
            data={data}
            timer={5000}
            onPress={(item) => alert(JSON.stringify(item))}
            indicatorContainerStyle={{position: 'absolute', bottom: 20}}
            indicatorActiveColor={'#6EC1E4'}
            indicatorInActiveColor={'#ffffff'}
            indicatorActiveWidth={30}
            animation
          />
          <View
            style={{
              backgroundColor: '#000',
              height: 70,
              marginVertical: 20,
            }}></View>
          <Text style={styles.headerText}>All Documents</Text>
          {data.map((item, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                marginTop: 15,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={require('../assets/images/pdf.png')}
                  style={{resizeMode: 'contain', height: 70, width: 50}}
                />
                <View style={{paddingLeft: 5}}>
                  <Text style={styles.docText}>Sachin Tendulkar</Text>
                  <Text style={styles.docText}>1.8 MB</Text>
                </View>
              </View>
              <FontAwesome name={'download'} size={18} color={'#000'} />
            </View>
          ))}
        </View>
      </ScrollView>
      <View style={{backgroundColor: 'violet', height: 70}}></View>
      <MenuModal popModal={showModal} exitModal={exitModal} nav={props.navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    padding: 10,
    flex: 1,
  },
  img: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
  },
  headerBox: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#6EC1E4',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  headerText: {
    fontFamily: 'Rationale-Regular',
    fontSize: 22,
  },
  separator: {
    height: 20,
  },
  contentStyle: {
    paddingHorizontal: 16,
  },
  docText: {
    fontFamily: 'Arimo-Variable',
  },
});

export default Home;
