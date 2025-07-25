import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useGroceryList } from '@/hooks/useGroceryList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from 'react-native';

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const { clearList: clearGroceryList } = useGroceryList();

  const [mealRemindersEnabled, setMealRemindersEnabled] = useState(false);
  const [groceryRemindersEnabled, setGroceryRemindersEnabled] = useState(false);

  const handleSignOut = () => {
    Alert.alert(
      "Sign Out",
      "Are you sure you want to sign out?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Sign Out", onPress: () => {
            // Implement actual sign out logic here (e.g., clear auth tokens)
            router.replace('/(auth)/landing'); // Navigate back to landing page
          }
        },
      ]
    );
  };

  const handleManageInterests = () => {
    router.push('/interests');
  };

  const handleClearRecipeCache = () => {
    Alert.alert(
      "Clear Recipe Cache",
      "This will clear all locally stored recipe data. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", onPress: async () => {
            try {
              await AsyncStorage.removeItem('selectedCategories');
              Alert.alert("Success", "Recipe cache cleared.");
            } catch (error) {
              console.error("Failed to clear recipe cache:", error);
              Alert.alert("Error", "Failed to clear recipe cache.");
            }
          }
        },
      ]
    );
  };

  const handleClearGroceryList = () => {
    Alert.alert(
      "Clear Grocery List",
      "Are you sure you want to clear your entire grocery list?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", onPress: () => {
            clearGroceryList();
            Alert.alert("Success", "Grocery list cleared.");
          }
        },
      ]
    );
  };

  const handleClearSearchHistory = () => {
    Alert.alert(
      "Clear Search History",
      "Are you sure you want to clear your search history?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", onPress: () => {
            // Not implemented yet. Implement search history clearing logic here
            Alert.alert("Success", "Search history cleared.");
          }
        },
      ]
    );
  };

  const handleSendFeedback = () => {
    Linking.openURL('mailto:me@jeffreychang.org?subject=App Feedback');
  };

  const handleRateApp = () => {
    // Replace with actual App Store link
    Linking.openURL('https://jeffreychang.org');
  };

  const handlePrivacyPolicy = () => {
    // Replace with actual Privacy Policy URL
    Linking.openURL('https://www.jeffreychang.org');
  };

  const renderSectionHeader = (title: string) => (
    <Text style={[styles.sectionHeader, { color: Colors[colorScheme ?? 'light'].tint }]}>{title}</Text>
  );

  const renderSettingItem = (label: string, onPress?: () => void, isToggle?: boolean, toggleValue?: boolean, onToggleChange?: (value: boolean) => void) => (
    <TouchableOpacity 
      style={[styles.settingItem, { borderBottomColor: Colors[colorScheme ?? 'light'].card }]} 
      onPress={onPress} 
      disabled={!onPress && !isToggle}
    >
      <Text style={[styles.settingLabel, { color: Colors[colorScheme ?? 'light'].text }]}>{label}</Text>
      {isToggle ? (
        <Switch
          trackColor={{ false: Colors[colorScheme ?? 'light'].card, true: Colors[colorScheme ?? 'light'].tint }}
          thumbColor={Colors[colorScheme ?? 'light'].background}
          ios_backgroundColor={Colors[colorScheme ?? 'light'].card}
          onValueChange={onToggleChange}
          value={toggleValue}
        />
      ) : (
        <Text style={[styles.settingValue, { color: Colors[colorScheme ?? 'light'].icon }]}>{onPress ? ">" : ""}</Text>
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
      <Text style={[styles.title, { color: Colors[colorScheme ?? 'light'].text }]}>Settings</Text>

      {renderSectionHeader("Account")}
      {renderSettingItem("Signed in")}
      {/* placeholder for actual user info */}
      {renderSettingItem("Sign Out", handleSignOut)}

      {renderSectionHeader("App Preferences")}
      {renderSettingItem("Manage Interests", handleManageInterests)}
      {renderSettingItem("Dietary Restrictions & Allergies", () => Alert.alert("Coming Soon", "Dietary restrictions and allergies settings are coming soon!"))}
      {renderSettingItem("Theme", () => Alert.alert("Coming Soon", "Theme selection is coming soon!"))}
      {renderSettingItem("Unit Preferences", () => Alert.alert("Coming Soon", "Unit preferences are coming soon!"))}

      {renderSectionHeader("Notifications")}
      {renderSettingItem("Meal Reminders", undefined, true, mealRemindersEnabled, setMealRemindersEnabled)}
      {renderSettingItem("Grocery Reminders", undefined, true, groceryRemindersEnabled, setGroceryRemindersEnabled)}

      {renderSectionHeader("Data Management")}
      {renderSettingItem("Clear Recipe Cache", handleClearRecipeCache)}
      {renderSettingItem("Clear Grocery List", handleClearGroceryList)}
      {renderSettingItem("Clear Search History", handleClearSearchHistory)}

      {renderSectionHeader("About & Support")}
      {renderSettingItem("App Version", () => Alert.alert("App Version", "1.0.0"))}
      {renderSettingItem("Send Feedback", handleSendFeedback)}
      {renderSettingItem("Rate the App", handleRateApp)}
      {renderSettingItem("Privacy Policy", handlePrivacyPolicy)}

      <View style={{ height: 50 }} />{/* Spacer */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.roasted,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 16,
    flex: 1,
  },
  settingValue: {
    fontSize: 16,
    fontWeight: '500',
  },
});