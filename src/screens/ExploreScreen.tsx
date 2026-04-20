import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, FlatList, Dimensions, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { products, categories } from '../data';
import { useCart } from '../context/CartContext';

import { useStorage } from '../hooks/useStorage';
import { SkeletonItem } from '../components/SkeletonItem';

const MAX_WIDTH = 800;
const PRIMARY_COLOR = '#53B175';
const { width: windowWidth } = Dimensions.get('window');
const contentWidth = Math.min(windowWidth, MAX_WIDTH);
const COLUMN_WIDTH = (contentWidth - 50) / 2;

export default function ExploreScreen() {
  const navigation = useNavigation<any>();
  const [searchText, setSearchText] = useState('');
  const { addToCart } = useCart();
  const { loading } = useStorage('user', null); // Simulated load

  const renderSkeletonCategory = () => (
    <View style={[styles.categoryCard, { backgroundColor: '#F2F3F2', borderColor: '#E2E2E2' }]}>
      <SkeletonItem width={90} height={90} borderRadius={18} style={{ marginBottom: 15 }} />
      <SkeletonItem width={100} height={20} />
    </View>
  );

  const filteredProducts = useMemo(() => {
    if (!searchText.trim()) return [];
    return products.filter(item => 
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText]);

  const renderCategory = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={[styles.categoryCard, { backgroundColor: item.color, borderColor: item.borderColor }]}
      onPress={() => {
        navigation.navigate('Beverages', { category: item.name });
      }}
    >
      <Image source={{ uri: item.image }} style={styles.categoryImage} />
      <Text style={styles.categoryTitle}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={typeof item.image === 'string' ? { uri: item.image } : item.image} style={styles.productImage} />
      <Text style={styles.productTitle}>{item.name}</Text>
      <Text style={styles.productVolume}>{item.volume}</Text>
      <View style={styles.productBottom}>
        <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.headerTitle}>Find Products</Text>
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#7C7C7C" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search Store" 
            placeholderTextColor="#7C7C7C"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity onPress={() => navigation.navigate('Filters')}>
            <Ionicons name="options-outline" size={20} color="#181725" />
          </TouchableOpacity>
        </View>

        {searchText.trim() === '' ? (
          <FlatList 
            data={loading ? [1, 2, 3, 4, 5, 6] : categories}
            renderItem={loading ? renderSkeletonCategory : renderCategory}
            keyExtractor={(item, index) => loading ? `skeleton-${index}` : item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList 
            data={filteredProducts}
            renderItem={renderProduct}
            keyExtractor={item => item.id}
            numColumns={2}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No products found for "{searchText}"</Text>
              </View>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: '100%',
    maxWidth: MAX_WIDTH,
    alignSelf: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181725',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#F2F3F2',
    borderRadius: 15,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    height: 50,
    alignItems: 'center',
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#181725',
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  categoryCard: {
    flex: 1,
    height: 190,
    margin: 5,
    borderRadius: 18,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  categoryImage: {
    width: 90,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    textAlign: 'center',
  },
  productCard: {
    width: COLUMN_WIDTH,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E2E2',
    borderRadius: 18,
    padding: 15,
    margin: 5,
  },
  productImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 5,
  },
  productVolume: {
    fontSize: 14,
    color: '#7C7C7C',
    marginBottom: 15,
  },
  productBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181725',
  },
  addButton: {
    backgroundColor: PRIMARY_COLOR,
    width: 45,
    height: 45,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#7C7C7C',
  },
});
