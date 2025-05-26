# 📱 Habit Tracker App

## 🎯 Project Overview
Habit Tracker – Build Good Habits, Break Bad Ones!
A React Native mobile application that helps users create, track, and maintain daily and weekly habits. The app provides a simple and intuitive interface for habit management with local data storage and progress tracking capabilities.

---

## ✨ Core Features
- 🔐 User Authentication: Local registration and login system
- ➕ Habit Creation: Add daily or weekly habits with custom names
- 📋 Habit Management: View, update, and mark habits as completed
- 📊 Progress Tracking: Monitor completion rates and weekly progress
- 💾 Local Storage: All data stored locally using AsyncStorage
- 🔄 Auto-login: Seamless user experience with persistent sessions

---

## 🛠 Technical Stack
- React Native CLI
- TypeScript
- React Navigation
- AsyncStorage 
- React Context

---

## 📁 Project Structure
```bash
habit-tracker/
├── android/                    # Android-specific files
├── ios/                       # iOS-specific files
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── auth/             # Authentication components
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── habits/           # Habit-related components
│   │   │   ├── HabitCard.tsx
│   │   │   ├── HabitForm.tsx
│   │   │   └── HabitList.tsx
│   │   ├── progress/         # Progress tracking components
│   │   │   └── ProgressChart.tsx
│   │   └── common/           # Common UI components
│   │       ├── Header.tsx
│   │       ├── Button.tsx
│   │       └── Container.tsx
│   ├── screens/              # Application screens
│   │   ├── auth/
│   │   │   ├── LoginScreen.tsx
│   │   │   └── RegisterScreen.tsx
│   │   ├── habits/
│   │   │   ├── CreateHabitScreen.tsx
│   │   │   └── HabitListScreen.tsx
│   │   └── progress/
│   │       └── ProgressScreen.tsx
│   ├── navigation/           # Navigation configuration
│   │   ├── AppNavigator.tsx
│   │   ├── AuthNavigator.tsx
│   │   └── MainTabNavigator.tsx
│   ├── services/             # Data services
│   │   ├── authService.ts
│   │   └── habitService.ts
│   ├── context/              # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── HabitContext.tsx
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/                # Utility functions
│   │   └── dateUtils.ts
│   └── App.tsx               # Main application component
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```
---

## 🧪 How to Run

### 📦 Install Dependencies

```bash
npm install
```
---

## ▶️ Start the App
```bash

#android
npx react-native run-android

# iOS
npx react-native run-ios
```
---

## 📬 Submission

GitHub Repo Link: https://github.com/Thushakaran/Habit-tracker

Demo Video Link: https://drive.google.com/file/d/1GP7cwJKwYu3FnDckx2OyvujotO8gFjTa/view?usp=sharing





