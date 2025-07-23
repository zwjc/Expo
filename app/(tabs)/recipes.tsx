import { View, Text, StyleSheet, Button } from 'react-native';
import { Link } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function RecipesScreen() {
  const recipes = [
    { id: '1', name: 'Spaghetti Carbonara' },
    { id: '2', name: 'Chicken Curry' },
    { id: '3', name: 'Vegetable Stir-fry' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
      {recipes.map((recipe) => (
        <Link key={recipe.id} href={{ pathname: '/recipes/[id]', params: { id: recipe.id } }} asChild>
          <Button title={recipe.name} />
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.aragoniteWhite,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.darkout,
    marginBottom: 20,
  },
});
