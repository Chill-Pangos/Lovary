import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Animated, {
  Easing,
  withTiming,
  useAnimatedStyle,
} from "react-native-reanimated";
import { colors } from "./app/theme/Colors";
import HomeScreen from "./app/screens/Home/HomeScreen";
import CalendarScreen from "./app/screens/Calendar/CalendarScreen";

const PolaroidScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Polaroid Screen</Text>
  </View>
);

const DairyScreen = () => (
  <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>Dairy Screen</Text>
  </View>
);

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.white[50],
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Polaroid") {
              iconName = focused ? "camera" : "camera-outline";
            } else if (route.name === "Dairy") {
              iconName = focused ? "book" : "book-outline";
            } else if (route.name === "Calendar") {
              iconName = focused ? "calendar" : "calendar-outline";
            }

            const animatedStyle = useAnimatedStyle(() => {
              return {
                opacity: withTiming(focused ? 1 : 0.5, {
                  duration: 300,
                  easing: Easing.ease,
                }),
              };
            });

            return (
              <Animated.View style={animatedStyle}>
                <Icon name={iconName} size={size} color={color} />
              </Animated.View>
            );
          },
          tabBarActiveTintColor: colors.lightpink,
          tabBarInactiveTintColor: colors.gray[300],
          tabBarActiveBackgroundColor: colors.white[50],
          tabBarInactiveBackgroundColor: colors.white[50],
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Polaroid" component={PolaroidScreen} />
        <Tab.Screen name="Dairy" component={DairyScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
