# Smart Meal Planner & Grocery List App

## Project Overview

The "Smart Meal Planner & Grocery List" app is designed to address common frustrations with existing meal planning solutions. Many current apps serve as little more than digital recipe books, failing to genuinely assist users in planning meals and generating accurate, aggregated grocery lists. This application aims to streamline the entire process, saving users time, reducing food waste, and making home cooking a more enjoyable and less hectic experience.

The app prioritizes a lightweight, offline-first approach, ensuring a smooth user experience without heavy cloud dependencies.

## Key Features

*   **Dynamic Recipe Discovery:** Explore a vast collection of recipes fetched from TheMealDB API, categorized by user interests.
*   **Intelligent Search & Filter:** Easily find recipes by name or ingredient, with a robust search functionality that includes ingredient-based suggestions.
*   **Smart Grocery List Generation:** Automatically aggregates ingredients from selected recipes, combining quantities and eliminating duplicates to produce an accurate and efficient shopping list.
*   **Customizable Interests:** Users can select their preferred meal categories, influencing the recipes displayed.
*   **Intuitive User Interface:** A clean, modern, and user-friendly design inspired by HelloFresh, ensuring a pleasant and efficient experience.
*   **Offline-First Capability:** Core functionalities are designed to work seamlessly offline, with data stored locally on the device.
*   **Themed Design:** A consistent and aesthetically pleasing color scheme applied throughout the application.

## Technical Stack

The application is built using modern mobile development technologies to ensure performance, maintainability, and scalability.

*   **Framework:** React Native (with Expo)
*   **Navigation:** Expo Router (for file-based routing and navigation management)
*   **Language:** TypeScript (for type safety and improved code quality)
*   **State Management:** Zustand (for lightweight and flexible global state management)
*   **Local Storage:** `@react-native-async-storage/async-storage` (for persistent local data storage)
*   **API Integration:** TheMealDB API (for comprehensive recipe data, including categories, ingredients, and instructions)
*   **UI Components:** Custom-built and themed components for a consistent design system.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

*   Node.js (LTS version recommended)
*   npm or Yarn (npm is used in the commands below)
*   Expo CLI (`npm install -g expo-cli`)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/ExpoApp.git
    cd ExpoApp
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the App

1.  **Start the Expo development server:**
    ```bash
    npx expo start
    ```
2.  **Open on your device/simulator:**
    *   **Expo Go:** Scan the QR code displayed in your terminal or browser with the Expo Go app on your iOS or Android device.
    *   **iOS Simulator:** Press `i` in the terminal.
    *   **Android Emulator:** Press `a` in the terminal.
    *   **Web Browser:** Press `w` in the terminal (for web preview, though the app is optimized for mobile).

## Project Structure

The project follows a standard Expo/React Native structure, with logical separation of concerns:

*   `app/`: Contains all screen components and navigation routes (using Expo Router).
*   `assets/`: Stores static assets like images and fonts.
*   `components/`: Reusable UI components used across the application.
*   `constants/`: Application-wide constants, including color schemes.
*   `hooks/`: Custom React hooks for reusable logic (e.g., `useColorScheme`, `useGroceryList`).
*   `node_modules/`: Installed third-party libraries.

## Future Enhancements

The following features are planned for future development to further enhance the app's capabilities:

*   **Meal Planning Calendar Interface:** A visual calendar to assign recipes to specific days and plan meals for the week.
*   **AI-Powered Meal Suggestions:** Full integration with a generative AI model (e.g., Gemini) to provide personalized meal recommendations based on user input and dietary preferences.
*   **Pantry Inventory Management:** Allow users to input existing pantry items to intelligently subtract them from grocery lists.
*   **Custom Recipe Input:** Enable users to add and manage their own recipes within the app.
*   **Advanced User Authentication:** Full implementation of Apple ID/Face ID sign-in for personalized experiences and cloud backup (if introduced).
*   **Dietary Restrictions & Allergies Filtering:** Implement robust filtering of recipes based on user-defined dietary needs.
*   **Unit Conversion:** Advanced aggregation of grocery list items with unit conversions (e.g., grams to kilograms, teaspoons to tablespoons).