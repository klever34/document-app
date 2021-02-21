import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  FlatList,
} from 'react-native';
import FlatListSlider from '../FlatListSlider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MenuModal from '../components/MenuModal';
import {baseUrl} from '../constants/index';
import axios from 'axios';

const Home = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [banners, setBanners] = useState([]);
  const [docs, setDocs] = useState([]);
  const [showView, setView] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const images = {
    jpg: require('../assets/images/jpg.png'),
    pdf: require('../assets/images/pdf.png'),
    text: require('../assets/images/text.png'),
    gif: require('../assets/images/gif.png'),
    doc: require('../assets/images/doc.png'),
    ppt: require('../assets/images/ppt.png'),
  };

  useEffect(() => {
    async function getEndpoints() {
      await getBanners();
      await getDocs();
    }
    getEndpoints();
  }, []);

  const exitModal = (mode) => {
    setShowModal(false);
  };

  const getBanners = async () => {
    try {
      const response = await axios.get(`${baseUrl}showBanner`);
      let data = response.data.data;
      let arr = [];
      data.map(function (item) {
        arr.push({
          image: `https://jharupdate.ml/uploads/banners/${item.image_link}`,
          desc: '',
        });
      });
      setBanners(arr);
      return function cleanUp() {
        abortController.abort();
      };
    } catch (error) {}
  };

  const getDocs = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}showDocument?page=${pageNumber}`,
      );
      if (pageNumber <= 1) {
        setDocs(response.data.data.data);
      } else if (pageNumber > 1) {
        setDocs((docs) => [...docs, ...response.data.data.data]);
      }
    } catch (error) {}
  };

  useState(() => {
    setView(true);
  }, []);

  const handleDownload = (url) => {
    let newUrl = `https://jharupdate.ml/public/uploads/document/${url}`;
    Linking.canOpenURL(newUrl).then((supported) => {
      if (supported) {
        Linking.openURL(newUrl);
      } else {
        console.log("Don't know how to open URI: " + newUrl);
      }
    });
  };

  const renderDocuments = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginTop: 15,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={images[`${item.type}`]}
            style={{resizeMode: 'contain', height: 70, width: 50}}
          />
          <View style={{padding: 5}}>
            <Text style={styles.docText}>{item.name}</Text>
            <Text style={styles.docText}>{item.size}</Text>
          </View>
        </View>
        <FontAwesome
          name={'download'}
          size={18}
          color={'#000'}
          onPress={() => handleDownload(item.document_name)}
        />
      </View>
    );
  };

  const handleMoreData = async () => {
    console.log('load more called');
    setPageNumber(pageNumber + 1);
    await getDocs();
  };

  if (!showView) {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <ActivityIndicator size="large" color={'#000'} />
        <Text style={{fontFamily: 'Poppins-Regular'}}>Loading...</Text>
      </View>
    );
  }

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
            data={banners}
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
          <FlatList
            style={{flex: 1}}
            data={docs}
            renderItem={renderDocuments}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={handleMoreData}
            onEndReachedThreshold={0}
          />
        </View>
      </ScrollView>
      <View style={{backgroundColor: 'violet', height: 70}}></View>
      <MenuModal
        popModal={showModal}
        exitModal={exitModal}
        nav={props.navigation}
      />
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
