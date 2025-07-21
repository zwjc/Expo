
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Keyboard, StyleSheet, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export default function LandingScreen() {
  const [nickname, setNickname] = useState('');
  const router = useRouter();
  const color = useThemeColor({ light: '#000', dark: '#fff' }, 'text');

  const handleContinue = () => {
    const trimmedNickname = nickname.trim();
    if (trimmedNickname !== '') {
      Alert.alert(
        'Confirm Nickname',
        `Is "${trimmedNickname}" your desired nickname?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Confirm',
            onPress: () => router.push({ pathname: '/home', params: { nickname: trimmedNickname } }),
          },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">Welcome!</ThemedText>
        <ThemedText style={styles.subtitle}>Please enter your nickname to continue</ThemedText>
        <TextInput
          style={[styles.input, { color }]}
          placeholder="Nickname"
          placeholderTextColor="#ccc"
          value={nickname}
          onChangeText={setNickname}
        />
        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <ThemedText style={styles.buttonText}>Continue</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
