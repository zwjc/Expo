import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RecipesScreen() {
  type Recipe = { id: string; name: string; description: string; image: any };
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const colorScheme = useColorScheme();

  const recipes: Recipe[] = [
    { id: '1', name: 'Spaghetti Carbonara', description: 'A classic Italian pasta dish.', image: require('@/assets/images/project6.jpg') },
    { id: '2', name: 'Chicken Curry', description: 'A flavorful and spicy chicken dish.', image: require('@/assets/images/project6.jpg') },
    { id: '3', name: 'Vegetable Stir-fry', description: 'A quick and healthy vegetable dish.', image: require('@/assets/images/project6.jpg') },
    { id: '4', name: 'Pancakes', description: 'Fluffy pancakes for a perfect breakfast.', image: require('@/assets/images/project6.jpg') },
    { id: '5', name: 'Steak Frites', description: 'Classic steak and fries.', image: require('@/assets/images/project6.jpg') },
  ];

  const renderRecipeList = () => (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Recipes</Text>
      {recipes.map((recipe) => (
        <TouchableOpacity key={recipe.id} style={styles.recipeCard} onPress={() => setSelectedRecipe(recipe)}>
          <ImageBackground source={recipe.image} style={styles.cardImage} imageStyle={styles.cardImageStyle}>
            <View style={styles.cardOverlay}>
              <Text style={styles.cardText}>{recipe.name}</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderRecipeDetails = () => (
    <View style={styles.detailsContainer}>
      <Text style={[styles.detailsTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
        {selectedRecipe?.name ?? ''}
      </Text>
      <Text style={[styles.detailsDescription, { color: Colors[colorScheme ?? 'light'].text }]}>
        {selectedRecipe?.description ?? ''}
      </Text>
      <TouchableOpacity style={[styles.backButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} onPress={() => setSelectedRecipe(null)}>
        <Text style={[styles.backButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>Back to Recipes</Text>
      </TouchableOpacity>
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
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingTop: 60,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  recipeCard: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardImage: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardImageStyle: {
    resizeMode: 'cover',
  },
  cardOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    alignItems: 'center',
  },
  cardText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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
  backButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 16,
  },
});
