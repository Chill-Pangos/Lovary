import { StyleSheet, Text, View, SectionList } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { FAB } from "react-native-paper";
import AddDiaryModal from "./AddDiaryModal";
import SelectTypeModal from "./AddDiaryModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import DayService from "../../services/DayServices";

const DiaryScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [diaries, setDiaries] = useState([]);
  const [firstDate, setFirstDate] = useState(null);

  const [fontsLoaded] = useFonts({
    Outfit: require("../../assets/fonts/Outfit-VariableFont_wght.ttf"),
    Courgette: require("../../assets/fonts/Courgette-Regular.ttf"),
  });

  useEffect(() => {
    loadDiaries();
    fetchFirstDate();
  }, []);

  const fetchFirstDate = async () => {
    const date = await DayService.getFirstDate();
    if (!date) {
      await DayService.storeFirstDate();
      setFirstDate(new Date());
    } else {
      setFirstDate(date);
    }
  };

  const loadDiaries = async () => {
    try {
      const existingDiaries = await AsyncStorage.getItem("diaries");
      const parsedDiaries = existingDiaries ? JSON.parse(existingDiaries) : [];
      const groupedDiaries = parsedDiaries.reduce((acc, diary) => {
        const section = acc.find((s) => s.date === diary.date);
        if (section) {
          section.data.push(diary);
        } else {
          acc.push({ date: diary.date, data: [diary] });
        }
        return acc;
      }, []);
      setDiaries(groupedDiaries);
    } catch (error) {
      console.error("Error loading diaries: ", error);
    }
  };

  const calculateDaysFromFirstDate = (sectionDate) => {
    if (!firstDate) return "N/A";

    const [day, month, year] = sectionDate.split("/").map(Number);
    const sectionDateObj = new Date(year, month - 1, day);

    const firstDateObj = new Date(firstDate);

    const daysDifference = Math.floor(
      (sectionDateObj - firstDateObj) / (1000 * 60 * 60 * 24)
    );

    return daysDifference >= 0 ? daysDifference : 0;
  };

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
        sections={diaries}
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
              Hẹn hò {calculateDaysFromFirstDate(date)} ngày
            </Text>
          </View>
        )}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          alignItems: "flex-end",
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
          refreshDiaryList={loadDiaries}
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
    padding: 10,
    marginBottom: 10,
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
    margin: 16,
  },
});
