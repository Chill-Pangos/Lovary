import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Svg, { G, LinearGradient, Stop, Path, Defs } from "react-native-svg";
import { useFonts } from "expo-font";

const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const [fontsLoaded] = useFonts({
    Outfit: require("../../assets/fonts/Outfit-VariableFont_wght.ttf"),
    Courgette: require("../../assets/fonts/Courgette-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={styles.container}
        source={require("../../assets/exampleBG/backgroundLovary.png")}
      >
        <View style={styles.screenHeaderContainer}>
          <Text style={styles.screenHeaderText}>Lovary</Text>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity>
            <Ionicons name={"camera"} size={27} color="white"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name={"book"} size={27} color="white"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name={"calendar"} size={27} color="white"></Ionicons>
          </TouchableOpacity>
        </View>

        <View style={styles.heartContainer}>
          <Svg width="200" height="180">
            <Path
              d="m99.90774,26.3624c39.78649,-76.45372 195.67126,47.72105 0,146.01869c-195.67126,-98.29764 -39.78649,-222.47242 0,-146.01869z"
              opacity="0.4"
              fill="#E7E7E7"
              strokeWidth="0"
            />
            <Path
              d="m99.5046,41.23985c34.22056,-74.51547 169.15792,23.33564 0.8601,119.14125c-168.29781,-95.80561 -35.08066,-193.65672 -0.8601,-119.14125z"
              stroke="#FF41EC"
              strokeWidth="6"
              fill="none"
            />
          </Svg>
          <View style={styles.heartCountTextContainer}>
            <Text style={styles.heartCountDay}>262</Text>
            <Text style={styles.heartCountText}>Ngày</Text>
          </View>
        </View>

        <View style={styles.userContainer}>
          <View style={styles.userContainerOpacity}></View>
          <View style={styles.userContainerWithAvatar}>
            <TouchableOpacity
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
              activeOpacity={0.9}
            >
              <Image
                style={styles.userAvatar}
                source={require("../../assets/exampleBG/th.jpg")}
              ></Image>
              <Text style={styles.userName}>mintun</Text>
            </TouchableOpacity>

            <Svg width="45" height="65">
              <Defs>
                <LinearGradient
                  id="svg_5"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                  spreadMethod="pad"
                >
                  <Stop offset="0" stopOpacity="0.99219" stopColor="#e819ff" />
                  <Stop offset="1" stopOpacity="0.99219" stopColor="#8200ce" />
                </LinearGradient>
              </Defs>
              <G id="Layer_1">
                <Path
                  id="svg_1"
                  d="m22.70313,8.81444c9.02457,-22.67526 44.208,6.15694 -0.17511,35.31084c-44.38311,-29.1539 -8.84946,-57.9861 0.17511,-35.31084z"
                  fillOpacity="0.84"
                  stroke="#000"
                  strokeWidth="0"
                  fill="url(#svg_5)"
                />

                <Path
                  id="svg_28"
                  d="m31.96008,7.68289c0,0 0.62782,-3.59067 1.2621,-2.39234c1.20121,-0.70383 5.57708,2.95489 6.09604,5.72025c0.69195,1.10615 -0.70758,3.02898 -1.0212,3.20603c-0.37832,-0.73012 -1.72395,-5.51997 -6.33694,-6.53394z"
                  fill="#ffffff"
                  stroke="#000"
                  strokeWidth="0"
                />
              </G>
            </Svg>

            <TouchableOpacity
              style={{
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 5,
              }}
              activeOpacity={0.9}
            >
              <Image
                style={styles.userAvatar}
                source={require("../../assets/exampleBG/background.jpg")}
              ></Image>
              <Text style={styles.userName}>DTT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  screenHeaderContainer: {
    flexDirection: "row",
    padding: 10,
    paddingLeft: 15,
    alignItems: "center",
    justifyContent: "center",
    gap: 23,
  },
  screenHeaderText: {
    fontSize: 40,
    color: "white",
    fontFamily: "Courgette",
  },
  heartContainer: {
    marginTop: height * 0.1,
    justifyContent: "center",
    alignItems: "center",
  },
  heartCountTextContainer: {
    position: "absolute",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heartCountDay: {
    fontSize: 60,
    color: "#FF41EC",
    fontFamily: "Outfit",
    fontWeight: "800",
  },
  heartCountText: {
    fontSize: 18,
    color: "#FF41EC",
    fontFamily: "Outfit",
    fontWeight: "700",
  },
  userContainer: {
    marginTop: height * 0.2,
    height: height * 0.125,
    width: width * 0.55,
    borderRadius: 20,
  },
  userContainerOpacity: {
    backgroundColor: "#E9E9E9",
    opacity: 0.5,
    height: height * 0.125,
    width: width * 0.55,
    borderRadius: 20,
  },
  userContainerWithAvatar: {
    height: height * 0.125,
    width: width * 0.55,
    borderRadius: 20,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  userAvatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  userName: {
    fontFamily: "Outfit",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default HomeScreen;
