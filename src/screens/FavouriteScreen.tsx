import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { products } from '../data';

const PRIMARY_COLOR = '#53B175';

// Mock some favorite items from the products list
const favouriteItems = [
  { ...products.find(p => p.id === '7') }, // Sprite Can
  { ...products.find(p => p.id === '6') }, // Diet Coke
  { ...products.find(p => p.id === '8') }, // Apple & Grape Juice
  { ...products.find(p => p.id === '9') }, // Coca Cola Can
  { ...products.find(p => p.id === '10') }, // Pepsi Can
].filter(p => !!p.id) as any[];

export default function FavouriteScreen() {
  const navigation = useNavigation<any>();

  const handleAddAllToCart = () => {
    Alert.alert("Cart", "All items have been added to your cart!", [{ text: "OK" }]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.favouriteItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <View style={styles.titleRow}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        </View>
        <View style={styles.volumeRow}>
          <Text style={styles.itemVolume}>{item.volume}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
            <Ionicons name="chevron-forward" size={24} color="#181725" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Favourite</Text>
      </View>

      <FlatList 
        data={favouriteItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="heart-outline" size={64} color="#E2E2E2" />
            <Text style={styles.emptyText}>No favorite items yet</Text>
          </View>
        }
      />

      {favouriteItems.length > 0 && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.addAllButton} onPress={handleAddAllToCart}>
            <Text style={styles.addAllText}>Add All To Cart</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2',
    alignItems: 'center',
    marginBottom: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181725',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 120, // push list above absolutely positioned bottom container
  },
  favouriteItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 15,
  },
  itemContent: {
    flex: 1,
    justifyContent: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#181725',
  },
  volumeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  itemVolume: {
    fontSize: 14,
    color: '#7C7C7C',
  },
  divider: {
    height: 1,
    backgroundColor: '#E2E2E2',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  addAllButton: {
    backgroundColor: PRIMARY_COLOR,
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addAllText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#7C7C7C',
    textAlign: 'center',
    marginTop: 10,
  },
});
