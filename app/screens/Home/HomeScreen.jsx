import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import ImageSlider from "./ImageSlider";
import LoveDays from "./LoveDays";
import { colors } from "../../theme/Colors";

const HomeScreen = () => {
  const images = [
    require("../../assets/exampleBG/background.jpg"),
    require("../../assets/exampleBG/backgroundLovary.png"),
    require("../../assets/exampleBG/pango.png"),
  ];

  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <ImageSlider images={images} autoplay={true} autoplayTimeout={5} />
      </View>
      <View style={styles.daysContainer}>
        <LoveDays />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white[50],
  },
  sliderContainer: {
    position: "absolute", // Đặt container phía trên
    top: 0, // Khoảng cách từ đỉnh màn hình
    width: "100%", // Chiều rộng 90% màn hình
    height: "70%", // Chiều cao slider
    padding: 20,
    paddingTop: 40,
    paddingBottom: 20,
    backgroundColor: colors.lightpink,
    borderWidth: 2,
    borderColor: colors.lightpink,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  daysContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "20%",
    bottom: "5%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
});

export default HomeScreen;
