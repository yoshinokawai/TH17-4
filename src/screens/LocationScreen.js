import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';

const LocationScreen = ({ navigation }) => {
  // State giả lập cho việc chọn khu vực
  const [zone, setZone] = useState('Badda');
  const [area, setArea] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Nút Back */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#181725" />
      </TouchableOpacity>

      <View style={styles.content}>
        {/* Ảnh minh họa: Tạm dùng Icon, nếu có ảnh bạn thay bằng thẻ <Image /> */}
        <View style={styles.illustrationContainer}>
            <Image 
              source={require('../../assets/images/map.png')} // Đảm bảo đường dẫn này đúng với máy bạn
              style={{ width: 200, height: 200 }}
              resizeMode="contain"
            />
        </View>

        <Text style={styles.title}>Select Your Location</Text>
        <Text style={styles.subtitle}>
          Switch on your location to stay in tune with what's happening in your area
        </Text>

        {/* Input: Your Zone */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Your Zone</Text>
          <TouchableOpacity style={styles.dropdownInput} activeOpacity={0.7}>
            <Text style={[styles.dropdownText, !zone && { color: '#7C7C7C' }]}>
              {zone || 'Types of your zone'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#7C7C7C" />
          </TouchableOpacity>
        </View>

        {/* Input: Your Area */}
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Your Area</Text>
          <TouchableOpacity style={styles.dropdownInput} activeOpacity={0.7}>
            <Text style={[styles.dropdownText, !area && { color: '#7C7C7C' }]}>
              {area || 'Types of your area'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#7C7C7C" />
          </TouchableOpacity>
        </View>

        {/* Nút Submit */}
        <TouchableOpacity 
          style={styles.submitButton}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Login')} 
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
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
    flex: 1,
    paddingHorizontal: 25,
    alignItems: 'center',
    marginTop: 20,
  },
  illustrationContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  dropdownContainer: {
    width: '100%',
    marginBottom: 25,
  },
  dropdownLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7C7C7C',
    marginBottom: 10,
  },
  dropdownInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 10,
  },
  dropdownText: {
    fontSize: 18,
    color: '#181725',
    fontWeight: '500',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#53B175',
    paddingVertical: 18,
    borderRadius: 19,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LocationScreen;