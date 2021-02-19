import React, {useState} from 'react';
import {
  Text,
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const height = Dimensions.get('window').height;

const MenuModal = ({exitModal, popModal, nav}) => {
  const closeModal = (item) => {
    exitModal(item);
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={popModal}
        onRequestClose={() => {}}>
        <TouchableOpacity style={[styles.centeredView, {}]}>
          <Entypo
            name={'cross'}
            size={52}
            color={'#000'}
            onPress={() => closeModal(true)}
          />
          <View style={styles.boxContainer}>
            <TouchableOpacity style={styles.box} onPress={() => null}>
              <Entypo name={'share'} size={22} color={'#000'} />
              <Text style={styles.header}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => {
                closeModal(true)  
                nav.push('Rate');
              }}>
              <Entypo name={'star-outlined'} size={22} color={'#000'} />
              <Text style={styles.header}>Rate</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => {
                closeModal(true)  
                nav.push('Contact');
              }}>
              <AntDesign name={'mail'} size={18} color={'#000'} />
              <Text style={styles.header}>Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              onPress={() => {
                closeModal(true)  
                nav.push('Policy');
              }}>
              <MaterialIcons name={'policy'} size={18} color={'#000'} />
              <Text style={styles.header}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: '#6EC1E4',
    padding: 30,
  },
  header: {
    fontFamily: 'Arimo-Variable',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  smallText: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'SourceSansPro-Black',
  },
  submitBtn: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#6b75c3',
    margin: 20,
    borderRadius: 6,
    width: '40%',
  },
  box: {flexDirection: 'row', alignItems: 'center', margin: 20},
  boxContainer: {
    marginTop: height - 600,
    alignSelf: 'center',
  },
});

export default MenuModal;
