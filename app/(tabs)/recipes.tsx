import CustomAlert from '@/components/CustomAlert';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useGroceryList } from '@/hooks/useGroceryList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RecipesScreen() {
  type Recipe = { idMeal: string; strMeal: string; strMealThumb: string };
  type FullRecipeDetails = { 
    idMeal: string; 
    strMeal: string; 
    strMealThumb: string; 
    strInstructions: string; 
    ingredients: { name: string; measure: string }[];
  };

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipeDetails, setRecipeDetails] = useState<FullRecipeDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);
  const colorScheme = useColorScheme();
  const { addItems } = useGroceryList();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const selectedCategoriesJSON = await AsyncStorage.getItem('selectedCategories');
        const selectedCategories = selectedCategoriesJSON ? JSON.parse(selectedCategoriesJSON) : [];

        if (selectedCategories.length > 0) {
          const allFetchedRecipes: Recipe[] = [];
          for (const category of selectedCategories) {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
            const data = await response.json();
            if (data.meals) {
              allFetchedRecipes.push(...data.meals);
            }
          }
          
          const uniqueRecipes = Array.from(new Set(allFetchedRecipes.map(r => r.idMeal))).map(id => allFetchedRecipes.find(r => r.idMeal === id)!);
          setRecipes(uniqueRecipes);
          setFilteredRecipes(uniqueRecipes);
        }
      } catch (error) {
        console.error('Failed to fetch recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filteredByName = recipes.filter(recipe => 
          recipe.strMeal.toLowerCase().includes(lowercasedQuery)
        );
        
        if (filteredByName.length > 0) {
          setFilteredRecipes(filteredByName);
        } else {
          
          try {
            setLoading(true);
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchQuery}`);
            const data = await response.json();
            if (data.meals) {
              setFilteredRecipes(data.meals);
            } else {
              setFilteredRecipes([]);
            }
          } catch (error) {
            console.error('Failed to fetch recipes by ingredient:', error);
            setFilteredRecipes([]);
          } finally {
            setLoading(false);
          }
        }
      } else {
        setFilteredRecipes(recipes);
      }
    };

    const debounceSearch = setTimeout(() => {
        handleSearch();
    }, 500);

    return () => clearTimeout(debounceSearch);
  }, [searchQuery, recipes]);

  const fetchRecipeDetails = async (recipeId: string) => {
    setLoadingDetails(true);
    setRecipeDetails(null);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
      const data = await response.json();
      if (data && data.meals && data.meals.length > 0) {
        const meal = data.meals[0];
        const ingredients: { name: string; measure: string }[] = [];
        for (let i = 1; i <= 20; i++) {
          const ingredient = meal[`strIngredient${i}`];
          const measure = meal[`strMeasure${i}`];
          if (ingredient && ingredient.trim() !== '') {
            ingredients.push({ name: ingredient.trim(), measure: measure ? measure.trim() : '' });
          }
        }
        setRecipeDetails({ ...meal, ingredients });
      } else {
        console.error('No recipe details found.');
      }
    } catch (error) {
      console.error('Error fetching recipe details:', error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const handleAddToGroceryList = () => {
    if (recipeDetails) {
      addItems(recipeDetails.ingredients);
      setAlertVisible(true);
    }
  };

  const renderRecipeList = () => (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Recipes</Text>
      <TextInput 
        style={[styles.searchBar, { backgroundColor: Colors[colorScheme ?? 'light'].card, color: Colors[colorScheme ?? 'light'].text }]} 
        placeholder="Search recipes..." 
        placeholderTextColor={Colors[colorScheme ?? 'light'].text}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
      ) : (
        filteredRecipes.map((recipe) => (
          <TouchableOpacity key={recipe.idMeal} style={styles.recipeCard} onPress={() => {
            setSelectedRecipe(recipe);
            fetchRecipeDetails(recipe.idMeal);
          }}>
            <ImageBackground source={{ uri: recipe.strMealThumb }} style={styles.cardImage} imageStyle={styles.cardImageStyle}>
              <View style={styles.cardOverlay}>
                <Text style={styles.cardText}>{recipe.strMeal}</Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))
      )}
    </ScrollView>
  );

  const renderRecipeDetails = () => (
    <ScrollView style={styles.detailsScrollView} contentContainerStyle={styles.detailsScrollViewContent}>
      {loadingDetails ? (
        <ActivityIndicator size="large" color={Colors[colorScheme ?? 'light'].tint} />
      ) : recipeDetails ? (
        <>
          <TouchableOpacity style={styles.backArrow} onPress={() => {
            setSelectedRecipe(null);
            setRecipeDetails(null);
          }}>
            <IconSymbol name="arrow.left" size={24} color={Colors[colorScheme ?? 'light'].text} />
          </TouchableOpacity>
          <Text style={[styles.detailsTitle, { color: Colors[colorScheme ?? 'light'].text }]}>
            {recipeDetails.strMeal}
          </Text>

          <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
            <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Ingredients:</Text>
            {recipeDetails.ingredients.map((ingredient, index) => (
              <Text key={index} style={[styles.ingredientItem, { color: Colors[colorScheme ?? 'light'].text }]}>
                {`• ${ingredient.measure} ${ingredient.name}`}
              </Text>
            ))}
          </View>

          <View style={[styles.card, { backgroundColor: Colors[colorScheme ?? 'light'].card }]}>
            <Text style={[styles.sectionTitle, { color: Colors[colorScheme ?? 'light'].text }]}>Instructions:</Text>
            {recipeDetails.strInstructions.split('\r\n').filter(Boolean).map((step, index) => (
              <Text key={index} style={[styles.instructionStep, { color: Colors[colorScheme ?? 'light'].text }]}>
                {`${index + 1}. ${step.trim()}`}
              </Text>
            ))}
          </View>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} onPress={handleAddToGroceryList}>
            <Text style={[styles.actionButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>Add to Grocery List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.backButton, { backgroundColor: Colors[colorScheme ?? 'light'].card }]} onPress={() => {
            setSelectedRecipe(null);
            setRecipeDetails(null);
          }}>
            <Text style={[styles.backButtonText, { color: Colors[colorScheme ?? 'light'].text }]}>Back to Recipes</Text>
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
      <CustomAlert 
        visible={alertVisible} 
        title="Success" 
        message="Ingredients have been added to your grocery list."
        onClose={() => setAlertVisible(false)}
      />
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
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
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
    paddingTop: 80,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backArrow: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
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
    marginBottom: 10,
    lineHeight: 24,
    width: '100%',
  },
  ingredientItem: {
    fontSize: 16,
    marginBottom: 5,
    width: '100%',
  },
  actionButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
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
  card: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
});