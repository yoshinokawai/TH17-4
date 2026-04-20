import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';

const SignInScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* KHU VỰC ẢNH BÌA */}
      <View style={styles.imageWrapper}>
        <Image 
          source={require('../../assets/images/backgroundLogin.jpg')} 
          style={styles.topImage}
          resizeMode="cover" 
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Get your groceries{"\n"}with nectar</Text>

        {/* KHU VỰC SỐ ĐIỆN THOẠI - Đã chuyển thành Nút bấm */}
        <TouchableOpacity 
          style={styles.phoneInputContainer}
          activeOpacity={0.7}
          // Chú ý: Đổi 'Number' thành tên Screen thực tế bạn đã khai báo trong App.tsx (ví dụ: 'NumberScreen', 'PhoneEntry',...)
          onPress={() => navigation.navigate('Number')} 
        >
          <Image 
            source={require('../../assets/images/flagvn.png')} 
            style={styles.flagIcon} 
          />
          <Text style={styles.countryCode}>+84</Text>
          {/* Nhìn giống TextInput nhưng thực chất là Text để bấm được mượt hơn */}
          <Text style={styles.placeholderText}>
            Enter your mobile number
          </Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <Text style={styles.dividerText}>Or connect with social media</Text>
        </View>

        {/* Nút Google */}
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#5383EC' }]}>
          <View style={styles.iconWrapper}>
            <AntDesign name="google" size={24} color="white" />
          </View>
          <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        {/* Nút Facebook */}
        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#4A66AC', marginTop: 20 }]}>
          <View style={styles.iconWrapper}>
            <FontAwesome name="facebook-official" size={24} color="white" /> 
          </View>
          <Text style={styles.socialButtonText}>Continue with Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  imageWrapper: {
    width: '100%',
    height: 350,
  },
  topImage: {
    width: '100%',
    height: '100%',
    transform: [
      { rotate: '230deg' }, 
      { translateX: -40},  
      { translateY: 130 }, 
      { scale: 1.5 },     
    ],
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 10,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 30,
    lineHeight: 35,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 10,
    marginBottom: 35,
  },
  flagIcon: {
    width: 30,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
  },
  countryCode: {
    fontSize: 18,
    color: '#181725',
    marginRight: 15,
  },
  // Thêm style cho phần text giả TextInput
  placeholderText: {
    flex: 1,
    fontSize: 18,
    color: '#7C7C7C', // Màu xám giống placeholder
  },
  dividerContainer: {
    alignItems: 'center',
    marginBottom: 35,
  },
  dividerText: {
    color: '#828282',
    fontSize: 14,
    fontWeight: '600',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 15,
    paddingHorizontal: 20,
  },
  iconWrapper: {
    position: 'absolute',
    left: 30,
  },
  socialButtonText: {
    flex: 1,
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default SignInScreen;