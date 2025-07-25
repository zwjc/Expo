import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useGroceryList } from '@/hooks/useGroceryList';

export default function GroceryListScreen() {
  const colorScheme = useColorScheme();
  const { items, removeItem, clearList } = useGroceryList();

  const renderItem = ({ item }: { item: { name: string; measure: string } }) => (
    <View style={styles.itemContainer}>
      <Text style={[styles.itemText, { color: Colors[colorScheme ?? 'light'].text }]}>{`• ${item.measure} ${item.name}`}</Text>
      <TouchableOpacity onPress={() => removeItem(item.name)}>
        <Text style={styles.removeButton}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Grocery List</Text>
      {items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          style={styles.list}
        />
      ) : (
        <Text style={[styles.emptyText, { color: Colors[colorScheme ?? 'light'].text }]}>Your grocery list is empty.</Text>
      )}
      {items.length > 0 && (
        <TouchableOpacity style={[styles.clearButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} onPress={clearList}>
          <Text style={[styles.clearButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>Clear List</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 18,
  },
  removeButton: {
    color: 'red',
    fontSize: 16,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
  },
  clearButton: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
