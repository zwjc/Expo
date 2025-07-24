import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { HapticButton } from '@/components/HapticButton';

export default function LandingScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Welcome to the Smart Meal Planner</Text>
      <HapticButton style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} onPress={() => router.push('/interests')}>
        <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].background }]}>Continue as Guest</Text>
      </HapticButton>
      <HapticButton style={[styles.button, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} onPress={() => router.push('/(auth)/sign-in')}>
        <Text style={[styles.buttonText, { color: Colors[colorScheme ?? 'light'].background }]}>Sign In</Text>
      </HapticButton>
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
});
