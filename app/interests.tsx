import { HapticButton } from '@/components/HapticButton';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface Category {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
  strCategoryDescription: string;
}

export default function InterestsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
        const data = await response.json();
        const modifiedCategories = data.categories.map((category: Category) => {
          if (category.strCategory === 'Miscellaneous') {
            return { ...category, strCategory: 'Others' };
          }
          return category;
        });
        setCategories(modifiedCategories);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    );
  };

  const handleContinue = async () => {
    try {
      await AsyncStorage.setItem('selectedCategories', JSON.stringify(selectedCategories));
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Failed to save selected categories:', error);
    }
  };

  const renderItem = ({ item }: { item: Category }) => {
    const isSelected = selectedCategories.includes(item.strCategory);
    return (
      <TouchableOpacity 
        style={[
          styles.interestButton, 
          { backgroundColor: isSelected ? Colors[colorScheme ?? 'light'].tint : Colors[colorScheme ?? 'light'].card },
          isSelected && styles.selectedButton
        ]} 
        onPress={() => toggleCategory(item.strCategory)}
      >
        <Text style={[styles.interestButtonText, { color: isSelected ? Colors[colorScheme ?? 'light'].background : Colors[colorScheme ?? 'light'].text }]}>{item.strCategory}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>What are you interested in?</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.idCategory}
        numColumns={2}
        extraData={selectedCategories}
      />
      <HapticButton style={[styles.continueButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} onPress={handleContinue}>
        <Text style={[styles.continueButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>Continue</Text>
      </HapticButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  interestButton: {
    padding: 20,
    borderRadius: 15,
    margin: 10,
    width: 160,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedButton: {
    borderColor: Colors.aquitaine,
    backgroundColor: Colors.viningIvy,
  },
  interestButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  continueButton: {
    padding: 15,
    borderRadius: 10,
    margin: 20,
    width: '80%',
    alignItems: 'center',
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
