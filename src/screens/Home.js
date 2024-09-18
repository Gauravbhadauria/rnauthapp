import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {memo, useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';

const Home = () => {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  // Get the username from the route params
  const handleLogout = () => {
    console.log('User logged out');
    // Implement logout logic here, like clearing token/session
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    const headers = {
      authorization: 'Bearer ' + token,
    };
    const res = await axios.get('http://10.0.2.2:3300/details', {
      headers,
    });
    console.log(res.status);
    if (res.status == 200) {
      console.log(res.data);
      setVisible(false);
    } else {
      console.log(res.data);
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
      <Modal transparent visible={visible}>
        <View style={styles.modalView}>
          <View style={styles.mainView}>
            <Text style={styles.message}>
              {'Session Expired Please Login Again!'}
            </Text>
            <Button
              title="Ok Login"
              onPress={() => {
                setVisible(false);
                navigation.navigate('Login');
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    height: 50,
    width: '90%',
    backgroundColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  modalView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: '90%',
    backgroundColor: 'white',
  },
  message: {
    fontSize: 30,
    color: 'black',
    alignSelf: 'center',
    width: '90%',
    marginTop: 20,
    marginBottom: 20,
  },
});

export default Home;
