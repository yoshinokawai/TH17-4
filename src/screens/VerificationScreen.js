import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VerificationScreen = ({ navigation }) => {
  const [code, setCode] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Nút Back */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="#181725" />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Enter your 4-digit code</Text>
        <Text style={styles.subtitle}>Code</Text>

        {/* Khu vực Input OTP */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            keyboardType="number-pad"
            maxLength={4} // Giới hạn 4 số
            autoFocus={true}
            placeholder="- - - -"
            placeholderTextColor="#7C7C7C"
            value={code}
            onChangeText={setCode}
          />
        </View>

        {/* Nút Resend Code */}
        <TouchableOpacity style={styles.resendButton}>
          <Text style={styles.resendText}>Resend Code</Text>
        </TouchableOpacity>
      </View>

      {/* Nút Next */}
      <TouchableOpacity 
        style={styles.fab} 
        activeOpacity={0.8}
        // Xử lý logic khi nhập xong OTP (Ví dụ: Chuyển vào trang chủ Home)
        onPress={() => navigation.navigate('Location')}
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
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
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
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    paddingBottom: 10,
    marginBottom: 25,
  },
  input: {
    fontSize: 24,
    color: '#181725',
    fontWeight: '500',
    letterSpacing: 10, // Tạo khoảng cách giữa các số
  },
  resendButton: {
    alignSelf: 'flex-start',
  },
  resendText: {
    color: '#53B175',
    fontSize: 16,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 40,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#53B175',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default VerificationScreen;