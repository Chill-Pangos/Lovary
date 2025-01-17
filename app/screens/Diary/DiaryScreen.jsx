import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";

const sections = [
  {
    date: "17.01.2025",
    data: [
      {
        title: "gasdfawef",
        content: "sdgeasdf",
      },
    ],
  },
  {
    date: "16.01.2025",
    data: [
      {
        title: "gasdfawef",
        content: "sdgeasdf",
      },
    ],
  },
];

const DiaryScreen = () => {
  const [fontsLoaded] = useFonts({
    Outfit: require("../../assets/fonts/Outfit-VariableFont_wght.ttf"),
    Courgette: require("../../assets/fonts/Courgette-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.screenHeaderContainer}>
          <Text style={styles.screenHeaderText}>Nhật ký</Text>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity style={{ marginRight: 5 }}>
            <AntDesign name="bars" size={30} color="#FF45BB" />
          </TouchableOpacity>
        </View>
      </View>

      <SectionList
        style={{ paddingLeft: 10, paddingRight: 10 }}
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemContent}>{item.content}</Text>
          </View>
        )}
        renderSectionHeader={({ section: { date } }) => (
          <View style={{ flexDirection: "row", marginTop: 15 }}>
            <Text style={styles.itemDate}>{date}</Text>
            <View style={{ flex: 1 }}></View>
            <Text
              style={{
                marginTop: 17,
                marginRight: 10,
                fontFamily: "Courgette",
                fontWeight: "600",
                fontSize: 12,
              }}
            >
              {" "}
              Hẹn hò 6 ngày ..
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default DiaryScreen;

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
  itemDate: {
    fontFamily: "Courgette",
    fontWeight: "600",
    fontSize: 28,
  },
  itemContainer: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#FFC3EC",
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
});
