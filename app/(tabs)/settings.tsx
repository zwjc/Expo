import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
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
  },
});
