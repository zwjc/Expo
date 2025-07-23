import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function RecipesScreen() {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const colorScheme = useColorScheme();

  const recipes = [
    { id: '1', name: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish.' },
    { id: '2', name: 'Chicken Curry', description: 'A flavorful and spicy chicken dish.' },
    { id: '3', name: 'Vegetable Stir-fry', description: 'A quick and healthy vegetable dish.' },
  ];

  const renderRecipeList = () => (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Recipes</Text>
      {recipes.map((recipe) => (
        <View key={recipe.id} style={styles.recipeItem}>
          <Button
            title={recipe.name}
            onPress={() => setSelectedRecipe(recipe)}
            color={Colors[colorScheme ?? 'light'].tint}
          />
        </View>
      ))}
    </ScrollView>
  );

  const renderRecipeDetails = () => (
    <View style={styles.detailsContainer}>
      <Text style={[styles.detailsTitle, { color: Colors[colorScheme ?? 'light'].text }]}>{selectedRecipe.name}</Text>
      <Text style={[styles.detailsDescription, { color: Colors[colorScheme ?? 'light'].text }]}>{selectedRecipe.description}</Text>
      <Button title="Back to Recipes" onPress={() => setSelectedRecipe(null)} color={Colors[colorScheme ?? 'light'].tint} />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      {selectedRecipe ? renderRecipeDetails() : renderRecipeList()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recipeItem: {
    marginBottom: 10,
    width: '80%',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  detailsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsDescription: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
