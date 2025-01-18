import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, AntDesign } from "@expo/vector-icons";

const images = {
  th: require("../../assets/exampleBG/th.jpg"),
  pango: require("../../assets/exampleBG/backgroundLovary.png"),
};

const { height, width } = Dimensions.get("window");

const sections = [
  {
    date: "02.2025",
    data: [
      {
        image: "th",
      },
      {
        image: "pango",
      },
      {
        image: "pango",
      },
      {
        image: "pango",
      },
      {
        image: "pango",
      },
      {
        image: "pango",
      },
      {
        image: "pango",
      },
      {
        image: "pango",
      },
      {
        image: "pango",
      },
      {
        image: "pango",
      },
      {
        image: "pango",
      },
      {
        image: "pango",
      },
    ],
  },
  {
    date: "01.2025",
    data: [
      {
        image: "th",
      },
    ],
  },
];

const AlbumScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.screenHeaderContainer}>
          <Text style={styles.screenHeaderText}>Thư viện</Text>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity>
            <Entypo
              name="plus"
              size={35}
              color="#EF17A0"
              style={{ marginRight: 10 }}
            ></Entypo>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }}>
        {sections &&
          sections.map((section) => {
            return (
              <View style={{ flexDirection: "column" }} key={section.date}>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 15,
                    paddingBottom: 5,
                  }}
                >
                  <Text style={styles.itemDate}>{section.date}</Text>
                  <View style={{ flex: 1 }}></View>
                </View>

                <View
                  style={{ flexDirection: "row", flexWrap: "wrap", gap: 5 }}
                >
                  {section.data.map((item, index) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={1}
                        key={`${section.date}-${index}`}
                      >
                        <Image
                          source={images[item.image]}
                          style={{
                            height: height * 0.15,
                            width: width / 3.125,
                          }}
                        ></Image>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlbumScreen;

const styles = StyleSheet.create({
  screenHeaderContainer: {
    flexDirection: "row",
    padding: 10,
    paddingLeft: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  screenHeaderText: {
    fontSize: 28,
    fontWeight: "600",
  },
  container: {
    flexDirection: "column",
  },
  itemDate: {
    fontFamily: "Courgette",
    fontWeight: "600",
    fontSize: 28,
  },
  itemContainer: {
    flexDirection: "row",
    borderRadius: 5,
    opacity: 0.7,
  },
  itemTitle: {
    fontFamily: "Outfit",
    fontWeight: "800",
    fontSize: 22,
    alignSelf: "center",
  },
  itemContent: {
    padding: 10,
    paddingLeft: 40,
    fontSize: 17,
    fontWeight: "500",
  },
  itemHeart: {
    alignSelf: "center",
  },
});
