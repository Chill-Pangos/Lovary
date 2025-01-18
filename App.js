import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "./app/theme/Colors";
import HomeScreen from "./app/screens/Home/HomeScreen";
import CalendarScreen from "./app/screens/Calendar/CalendarScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import DiaryScreen from "./app/screens/Diary/DiaryScreen";
import AlbumScreen from "./app/screens/Album/AlbumScreen";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            animation: "fade",
            headerShown: false,
            tabBarStyle: {},
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "Trang chủ") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Thư viện") {
                iconName = focused ? "camera" : "camera-outline";
              } else if (route.name === "Nhật ký") {
                iconName = focused ? "book" : "book-outline";
              } else if (route.name === "Lịch") {
                iconName = focused ? "calendar" : "calendar-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#FF45BB",
            tabBarInactiveTintColor: colors.gray[300],
            tabBarActiveBackgroundColor: "transparent",
            tabBarInactiveBackgroundColor: "transparent",
          })}
        >
          <Tab.Screen name="Trang chủ" component={HomeScreen} />
          <Tab.Screen name="Thư viện" component={AlbumScreen} />
          <Tab.Screen name="Nhật ký" component={DiaryScreen} />
          <Tab.Screen name="Lịch" component={CalendarScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default App;
