import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PRIMARY_COLOR = '#53B175';

const FilterCheckbox = ({ label, isSelected, onPress }: { label: string, isSelected: boolean, onPress: () => void }) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
    <Ionicons 
      name={isSelected ? "checkbox" : "square-outline"} 
      size={24} 
      color={isSelected ? PRIMARY_COLOR : "#B3B3B3"} 
    />
    <Text style={[styles.checkboxLabel, isSelected && { color: PRIMARY_COLOR }]}>{label}</Text>
  </TouchableOpacity>
);

export default function FiltersScreen() {
  const navigation = useNavigation<any>();

  const [categories, setCategories] = useState({
    eggs: true,
    noodles: false,
    chips: false,
    fastFood: false,
  });

  const [brands, setBrands] = useState({
    individual: false,
    cocola: true,
    ifad: false,
    kazi: false,
  });

  const toggleCategory = (key: keyof typeof categories) => {
    setCategories({ ...categories, [key]: !categories[key] });
  };

  const toggleBrand = (key: keyof typeof brands) => {
    setBrands({ ...brands, [key]: !brands[key] });
  };

  const totalSelected = Object.values(categories).filter(Boolean).length + Object.values(brands).filter(Boolean).length;

  const handleApplyFilters = () => {
    Alert.alert(
      "Filters Applied", 
      `Selected ${totalSelected} filters. Search results have been updated.`,
      [{ text: "OK", onPress: () => navigation.goBack() }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#181725" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filters</Text>
        <View style={styles.closeButton} /* Placeholder for balance */ />
      </View>

      <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <FilterCheckbox label="Eggs" isSelected={categories.eggs} onPress={() => toggleCategory('eggs')} />
          <FilterCheckbox label="Noodles & Pasta" isSelected={categories.noodles} onPress={() => toggleCategory('noodles')} />
          <FilterCheckbox label="Chips & Crisps" isSelected={categories.chips} onPress={() => toggleCategory('chips')} />
          <FilterCheckbox label="Fast Food" isSelected={categories.fastFood} onPress={() => toggleCategory('fastFood')} />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Brand</Text>
          <FilterCheckbox label="Individual Collection" isSelected={brands.individual} onPress={() => toggleBrand('individual')} />
          <FilterCheckbox label="Cocola" isSelected={brands.cocola} onPress={() => toggleBrand('cocola')} />
          <FilterCheckbox label="Ifad" isSelected={brands.ifad} onPress={() => toggleBrand('ifad')} />
          <FilterCheckbox label="Kazi Farmas" isSelected={brands.kazi} onPress={() => toggleBrand('kazi')} />
        </View>
      </ScrollView>

      {/* Fixed Bottom Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilters}>
          <Text style={styles.applyButtonText}>Apply Filter</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  closeButton: {
    padding: 5,
    width: 40,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#181725',
    flex: 1,
    textAlign: 'center',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 100, // padding for fixed bottom button
  },
  section: {
    marginBottom: 35,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#181725',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#181725',
    marginLeft: 10,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E2E2E2',
  },
  applyButton: {
    backgroundColor: PRIMARY_COLOR,
    height: 67,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
