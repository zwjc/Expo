import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export default function AiScreen() {
  const colorScheme = useColorScheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');

  const handleSend = () => {
    if (inputText.trim().length > 0) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
      };
      setMessages(prev => [newMessage, ...prev]);
      // Here you would call the AI API and get a response
      // For now, we'll just simulate a response
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now().toString(),
          text: `This is a simulated response to "${inputText}"`,
          isUser: false,
        };
        setMessages(prev => [aiResponse, ...prev]);
      }, 1000);
      setInputText('');
    }
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.aiMessage]}>
      <Text style={{ color: item.isUser ? '#fff' : Colors[colorScheme ?? 'light'].text }}>{item.text}</Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>AI Meal Suggestions</Text>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
        style={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { backgroundColor: Colors[colorScheme ?? 'light'].card, color: Colors[colorScheme ?? 'light'].text }]}
          value={inputText}
          onChangeText={setInputText}
          placeholder="Ask for a meal suggestion..."
          placeholderTextColor={Colors[colorScheme ?? 'light'].text}
        />
        <TouchableOpacity style={[styles.sendButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]} onPress={handleSend}>
          <Text style={[styles.sendButtonText, { color: Colors[colorScheme ?? 'light'].background }]}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.light.tint,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.light.card,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonText: {
    fontWeight: 'bold',
  },
});
