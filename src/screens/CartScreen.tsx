import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { products } from '../data';

const PRIMARY_COLOR = '#53B175';

// Mock some initial cart items from the products list
const initialCart = [
  { ...products.find(p => p.id === '3'), quantity: 1 }, // Bell Pepper Red
  { ...products.find(p => p.id === '5'), quantity: 1 }, // Egg Chicken Red
  { ...products.find(p => p.id === '1'), quantity: 1 }, // Organic Bananas
  { ...products.find(p => p.id === '4'), quantity: 1 }, // Ginger
].filter(p => !!p.id) as any[];

export default function CartScreen() {
  const [cartItems, setCartItems] = useState(initialCart);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    Alert.alert("Checkout", "Your order has been placed successfully!", [{ text: "OK" }]);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemContent}>
        <View style={styles.titleRow}>
          <Text style={styles.itemTitle}>{item.name}</Text>
          <TouchableOpacity onPress={() => removeItem(item.id)}>
            <Ionicons name="close" size={24} color="#B3B3B3" />
          </TouchableOpacity>
        </View>
        <Text style={styles.itemVolume}>{item.volume}</Text>
        <View style={styles.priceRow}>
          <View style={styles.qtyContainer}>
            <TouchableOpacity style={styles.qtyButton} onPress={() => updateQuantity(item.id, -1)}>
              <Ionicons name="remove" size={20} color="#B3B3B3" />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity style={styles.qtyButton} onPress={() => updateQuantity(item.id, 1)}>
              <Ionicons name="add" size={20} color={PRIMARY_COLOR} />
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Cart</Text>
      </View>

      <FlatList 
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={styles.divider} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cart-outline" size={64} color="#E2E2E2" />
            <Text style={styles.emptyText}>Your cart is empty</Text>
          </View>
        }
      />

      {cartItems.length > 0 && (
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Go to Checkout</Text>
            <View style={styles.totalBadge}>
              <Text style={styles.totalBadgeText}>${total.toFixed(2)}</Text>
            </View>
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
  cartItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    alignItems: 'center',
  },
  itemImage: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginRight: 15,
  },
  itemContent: {
    flex: 1,
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
  itemVolume: {
    fontSize: 14,
    color: '#7C7C7C',
    marginTop: 5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 35,
    height: 35,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#181725',
    marginHorizontal: 15,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#181725',
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
  checkoutButton: {
    backgroundColor: PRIMARY_COLOR,
    height: 67,
    borderRadius: 19,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  totalBadge: {
    position: 'absolute',
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.1)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 8,
  },
  totalBadgeText: {
    color: '#fff',
    fontSize: 13,
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
