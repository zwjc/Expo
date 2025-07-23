import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const interests = [
  { id: '1', title: 'Meats' },
  { id: '2', title: 'Fast & Simple' },
  { id: '3', title: 'Veggie' },
  { id: '4', title: 'Vegan' },
  { id: '5', title: 'Fish' },
];

export default function InterestsScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  const renderItem = ({ item }: { item: { id: string, title: string } }) => (
    <TouchableOpacity style={[styles.interestButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} onPress={() => router.push('/(tabs)/home')}>
      <Text style={[styles.interestButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>What are you interested in?</Text>
      <FlatList
        data={interests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  interestButton: {
    padding: 15,
    borderRadius: 10,
    margin: 10,
    width: 150,
    alignItems: 'center',
  },
  interestButtonText: {
    fontSize: 18,
  },
});
