import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const NumberScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Nút Back */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#181725" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Enter your mobile number</Text>
        <Text style={styles.subtitle}>Mobile Number</Text>

        {/* Khu vực Input */}
        <View style={styles.inputContainer}>
           <Image 
            source={require('../../assets/images/flagvn.png')} // Đảm bảo đường dẫn này đúng với máy bạn
            style={styles.flagIcon} 
          />
          <Text style={styles.countryCode}>+84</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            autoFocus={true} // Tự động bật bàn phím khi vào trang
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
      </View>

      {/* Nút Next (Nổi ở góc dưới) */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        // Chuyển sang trang Verification khi bấm Next
        onPress={() => navigation.navigate('Verification')}
      >
        <Ionicons name="chevron-forward" size={24} color="#FFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCFCFC',
  },
  backButton: {
    marginTop: 10,
    marginLeft: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 25,
    marginTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
    fontWeight: '600',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 10,
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
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#181725',
    fontWeight: '500',
  },
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#53B175', // Màu xanh lá đặc trưng của Nectar
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default NumberScreen;