import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SectionList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { FAB } from "react-native-paper";
import AddDiaryModal from "./AddDiaryModal";
import SelectTypeModal from "./AddDiaryModal";

const sections = [
  {
    date: "17.01.2025",
    data: [
      {
        title: "gasdfawef",
        content: "T1, doi tuyen toi yeu",
      },
    ],
  },
  {
    date: "16.01.2025",
    data: [
      {
        title: "gasdfawef",
        content:
          "gọi tên em trong đêm, trái tim này xót xa, người yêu ơi hãy quên những năm tháng êm đềm hôm nào ",
      },
    ],
  },
];

const DiaryScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);

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
            <AntDesign
              name="heart"
              size={55}
              color="#EF17A0"
              style={styles.itemHeart}
            />
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
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          padding: 16,
        }}
      >
        <FAB
          style={styles.addButton}
          icon="plus"
          onPress={() => setModalVisible(true)}
        ></FAB>
      </View>
      {modalVisible && (
        <AddDiaryModal
          isVisible={modalVisible}
          setModalVisible={setModalVisible}
        ></AddDiaryModal>
      )}
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
  container: {
    flexDirection: "column",
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
  itemHeart: {
    alignSelf: "center",
  },
  addButton: {
    width: 60,
    height: 60,
    backgroundColor: "#FEACE4",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
});
