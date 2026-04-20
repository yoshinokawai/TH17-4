import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Image, TextInput, ScrollView } from 'react-native';
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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
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
            <View style={styles.dropdownInput}>
              <TextInput
                style={styles.textInput}
                value={zone}
                onChangeText={setZone}
                placeholder="Types of your zone"
                placeholderTextColor="#7C7C7C"
              />
            </View>
          </View>

          {/* Input: Your Area */}
          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Your Area</Text>
            <View style={styles.dropdownInput}>
              <TextInput
                style={styles.textInput}
                value={area}
                onChangeText={setArea}
                placeholder="Types of your area"
                placeholderTextColor="#7C7C7C"
              />
            </View>
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
      </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 40,
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
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
  textInput: {
    flex: 1,
    fontSize: 18,
    color: '#181725',
    fontWeight: '500',
    paddingVertical: 5,
  },
  submitButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default LocationScreen;