import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import React, { useState } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RecipesScreen() {
  type Recipe = { id: string; name: string; description: string; image: any };
  type FullRecipeDetails = Recipe & { instructions: string; ingredients: string[] };

  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeDetails, setRecipeDetails] = useState<FullRecipeDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const colorScheme = useColorScheme();

  const recipes: Recipe[] = [
    { id: '52802', name: 'Fish pie', description: 'A classic British fish pie.', image: { uri: 'https://www.themealdb.com/images/media/meals/ysxwuq1487323065.jpg' } },
    { id: '52940', name: 'Salmon Prawn Risotto', description: 'A creamy risotto with salmon and prawns.', image: { uri: 'https://www.themealdb.com/images/media/meals/xxrxux1503070723.jpg' } },
    { id: '52959', name: 'Tuna Nicoise', description: 'A fresh and healthy tuna salad.', image: { uri: 'https://www.themealdb.com/images/media/meals/yypwwq1511304979.jpg' } },
    { id: '52956', name: 'Chicken Handi', description: 'A rich and creamy chicken curry.', image: { uri: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg' } },
    { id: '52920', name: 'Kung Pao Chicken', description: 'A spicy and flavorful Chinese chicken dish.', image: { uri: 'https://www.themealdb.com/images/media/meals/1525872624.jpg' } },
    { id: '52937', name: 'Teriyaki Chicken Casserole', description: 'A sweet and savory chicken casserole.', image: { uri: 'https://www.themealdb.com/images/media/meals/wvpsxx1468256321.jpg' } },
    { id: '52893', name: 'Apple & Blackberry Crumble', description: 'A classic British dessert.', image: { uri: 'https://www.themealdb.com/images/media/meals/xvsurr1511719182.jpg' } },
    { id: '52894', name: 'Battenberg Cake', description: 'A light sponge cake.', image: { uri: 'https://www.themealdb.com/images/media/meals/ywwrsp1511720277.jpg' } },
    { id: '52897', name: 'Carrot Cake', description: 'A moist and flavorful cake.', image: { uri: 'https://www.themealdb.com/images/media/meals/vrspxv1511722107.jpg' } },
  ];

  const fetchRecipeDetails = async (recipeId: string) => {
    setLoadingDetails(true);
    setRecipeDetails(null);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const data = await response.json();
      if (data && data.meals && data.meals.length > 0) {
        const meal = data.meals[0];
        const ingredients: string[] = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.trim() !== '') {
            ingredients.push(`${measure ? measure.trim() + ' ' : ''}${ingredient.trim()}`);
          }
        }
        setRecipeDetails({
          id: meal.idMeal,
          name: meal.strMeal,
          description: meal.strCategory,
          image: { uri: meal.strMealThumb },
          instructions: meal.strInstructions,
          ingredients: ingredients,
        });
      } else {
        console.error('No recipe details found.');
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const renderRecipeList = () => (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Recipes</Text>
      {recipes.map((recipe) => (
        <TouchableOpacity key={recipe.id} style={styles.recipeCard} onPress={() => {
          setSelectedRecipe(recipe);
          fetchRecipeDetails(recipe.id);
        }}>
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
    <ScrollView style={styles.detailsScrollView} contentContainerStyle={styles.detailsScrollViewContent}>
      {loadingDetails ? (
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
      ) : recipeDetails ? (
        <>
          <Text style={[styles.detailsTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            {recipeDetails.name}
          </Text>
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Ingredients:</Text>
          {recipeDetails.ingredients.map((ingredient, index) => (
            <Text key={index} style={[styles.ingredientItem, { color: Colors[colorScheme ?? 'light'].text }]}>
              {`• ${ingredient}`}
            </Text>
          ))}
          <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Instructions:</Text>
          {recipeDetails.instructions.split('. ').filter(Boolean).map((step, index) => (
            <Text key={index} style={[styles.instructionStep, { color: Colors[colorScheme ?? 'light'].text }]}>
              {`${index + 1}. ${step.trim()}`}
            </Text>
          ))}
          <TouchableOpacity style={[styles.backButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} onPress={() => {
            setSelectedRecipe(null);
            setRecipeDetails(null);
          }}>
            <Text style={[styles.backButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>Back to Recipes</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={[styles.detailsDescription, { color: Colors[colorScheme ?? 'light'].text }]}>No details available.</Text>
      )}
    </ScrollView>
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
  detailsScrollView: {
    flex: 1,
    width: '100%',
  },
  detailsScrollViewContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 80, // Increased padding to the top
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    textAlign: 'center',
    width: '100%',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    width: '100%',
  },
  instructionStep: {
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 24,
    width: '100%',
  },
  ingredientItem: {
    fontSize: 16,
    marginBottom: 3,
    width: '100%',
  },
  backButton: {
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  backButtonText: {
    fontSize: 16,
  },
  detailsDescription: {
    fontSize: 16,
    marginTop: 20,
    textAlign: 'center',
    width: '100%',
  },
});
