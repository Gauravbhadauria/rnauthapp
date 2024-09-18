import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    const token = await AsyncStorage.getItem('TOKEN');
    const data = {
      token,
    };
    const res = await axios.post('http://10.0.2.2:3300/verifyToken', data);
    console.log(res.data);
    if (res.data.data) {
      console.log(res.data);
      navigation.navigate('Home');
    } else {
      navigation.navigate('Login');
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'purple',
      }}>
      <Text style={{color: 'white', fontSize: 30}}>Auth App</Text>
    </View>
  );
};

export default Splash;
