import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function SignInScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Sign In</Text>
      <TouchableOpacity style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} onPress={() => alert('Sign in with Apple ID')}>
        <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].background }]}>Sign in with Apple ID</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} onPress={() => alert('Sign in with Face ID')}>
        <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].background }]}>Sign in with Face ID</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={[styles.backButton, { color: Colors[colorScheme ?? 'light'].tint }]}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
  },
  backButton: {
    marginTop: 20,
    fontSize: 16,
  },
});
