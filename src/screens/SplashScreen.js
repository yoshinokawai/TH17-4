import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';

import storageService from '../services/storageService';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkLogin = async () => {
      const user = await storageService.getUser();
      
      // Đợi một chút để người dùng thấy Splash Screen (giống như ý định ban đầu là 2.5s)
      setTimeout(() => {
        if (user) {
          // Nếu đã đăng nhập, vào thẳng Home (MainTabs)
          navigation.replace('Home');
        } else {
          // Nếu chưa, vào Onboarding
          navigation.replace('Onboarding');
        }
      }, 2500);
    };

    checkLogin();
  }, [navigation]);


  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/CompanyName.png')} // Sửa lại path ảnh của bạn
        style={styles.logo} 
        resizeMode="contain" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#53B175', // Màu xanh chủ đạo của Nectar
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 60,
  },
});

export default SplashScreen;