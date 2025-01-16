import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Calendar } from "react-native-calendars";
import {
  FontAwesome,
  Entypo,
  FontAwesome6,
  Feather,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AddDetailModal from "./AddDetailsModal";
import ViewDetailsModal from "./ViewDetailsModal";
import SelectTypeModal from "./SelectTypeModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width, height } = Dimensions.get("window");

const renderCustomHeader = (date) => {
  const month = new Date(date).getMonth() + 1;
  const year = new Date(date).getFullYear();

  return (
    <TouchableOpacity
      style={styles.calendarHeaderContainer}
      activeOpacity={0.8}
    >
      <Text style={styles.calendarHeaderText}>
        {month.toString()}.{year}
      </Text>
    </TouchableOpacity>
  );
};

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-");
  return `${day}/${month}/${year}`;
};

const CalendarScreen = () => {
  /*  let now = new Date();
  useEffect(() => {
    now = new Date(Date.now());
  }, []);
  const today =
    now.getFullYear().toString() +
    "-" +
    (now.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    now.getDate().toString().padStart(2, "0");

  const [selectedDate, setSelectedDate] = useState(today); */
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [data, setData] = useState({});
  const [modalType, setModalType] = useState(null);
  const [currentModal, setCurrentModal] = useState(null); // 'add' | 'view' | 'selectType'
  const [inputValue, setInputValue] = useState(""); // dùng cho note
  const [imageUri, setImageUri] = useState(null); // dùng cho uri

  useEffect(() => {
    const fetchData = async () => {
      const storedData = await AsyncStorage.getItem("calendarData");
      if (storedData) setData(JSON.parse(storedData));
    };
    fetchData();
  }, []);

  const saveData = async (newData) => {
    setData(newData);
    await AsyncStorage.setItem("calendarData", JSON.stringify(newData));
  };

  const addItem = async () => {
    const newData = { ...data };
    if (!newData[selectedDate]) {
      newData[selectedDate] = { events: [], photos: [], notes: [] };
    }

    if (!newData[selectedDate][modalType]) {
      newData[selectedDate][modalType] = [];
    }
    if (imageUri) {
      newData[selectedDate].photos.push(imageUri);
    } else {
      newData[selectedDate][modalType].push(inputValue);
    }
   /*  alert("imageUri before saving:", imageUri);
    alert("newData before saving:", newData); */
    await saveData(newData);
    setInputValue("");
    setImageUri(null);
    setCurrentModal(null);
  };

  const deleteItem = async (index) => {
    const newData = { ...data };
    newData[selectedDate][modalType].splice(index, 1);
    await saveData(newData);
  };

  const openAddDetailModal = (type) => {
    setModalType(type);
    setCurrentModal("add");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.screenHeaderContainer}>
          <Text style={styles.screenHeaderText}>Lịch</Text>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => setCurrentModal("selectType")}
          >
            <Entypo name="plus" size={30} color="#FF45BB" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome6 name="bars" size={24} color="#FF45BB" />
          </TouchableOpacity>
        </View>

        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              marked: true,
              selectedColor: "#FF69B4",
            },
          }}
          theme={{
            todayTextColor: "#000",
            arrowStyle: { marginHorizontal: 40 },
            calendarBackground: "#FFEEF7",
            arrowColor: "#FF69C9",
            arrowHeight: 200,
            textDisabledColor: "#BABABA",
            textDayFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
          firstDay={1}
          renderHeader={(date) => renderCustomHeader(date)}
          renderArrow={(direction) => (
            <FontAwesome
              name={direction === "left" ? "chevron-left" : "chevron-right"}
              size={20}
              color="#FF45BB"
            ></FontAwesome>
          )}
        ></Calendar>
        <TouchableOpacity
          style={styles.quoteContainer}
          activeOpacity={1}
          onPress={() => setCurrentModal("selectType")}
        >
          <View style={{ flexDirection: "column", flex: 1, gap: 10 }}>
            <Text style={styles.quoteTextHeader}>
              Hãy cùng nhau tạo nên ngày đặc biệt
            </Text>
            <Text style={styles.quoteTextDay}>{formatDate(selectedDate)}</Text>
          </View>
          <Feather name="chevron-right" size={35} color="#FF45BB"></Feather>
        </TouchableOpacity>

        <View style={styles.widgetContainer}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.eventWidget}
            onPress={() => {
              setModalType("events");
              setCurrentModal("view");
            }}
          >
            <View
              style={{
                borderRadius: 50,
                backgroundColor: "white",
                padding: 13,
              }}
            >
              <MaterialIcons name="event" size={40} color="#FD499D" />
            </View>
            <Text style={{ fontSize: 22, color: "#FD499D", fontWeight: "600" }}>
              {data[selectedDate]?.events?.length || 0}
            </Text>
            <Text style={{ fontSize: 18, color: "#6E6E6E" }}>Sự kiện</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.imageWidget}
            onPress={() => {
              setModalType("photos");
              setCurrentModal("view");
            }}
          >
            <View
              style={{
                borderRadius: 50,
                backgroundColor: "white",
                padding: 13,
              }}
            >
              <FontAwesome6 name="images" size={40} color="#5D42FA" />
            </View>
            <Text style={{ fontSize: 22, color: "#5D42FA", fontWeight: "600" }}>
              {data[selectedDate]?.photos?.length || 0}
            </Text>
            <Text style={{ fontSize: 18, color: "#6E6E6E" }}>Ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.noteWidget}
            onPress={() => {
              setModalType("notes");
              setCurrentModal("view");
            }}
          >
            <View
              style={{
                borderRadius: 50,
                backgroundColor: "white",
                padding: 13,
              }}
            >
              <MaterialCommunityIcons
                name="heart-box-outline"
                size={40}
                color="#0AB73E"
              />
            </View>
            <Text style={{ fontSize: 22, color: "#0AB73E", fontWeight: "600" }}>
              {data[selectedDate]?.notes?.length || 0}
            </Text>
            <Text style={{ fontSize: 18, color: "#6E6E6E" }}>Ghi chú</Text>
          </TouchableOpacity>
        </View>
        <SelectTypeModal
          visible={currentModal === "selectType"}
          onSelectType={(type) => {
            setCurrentModal(null);
            openAddDetailModal(type);
          }}
          onClose={() => setCurrentModal(null)}
        />
        <AddDetailModal
          visible={currentModal === "add"}
          modalType={modalType}
          inputValue={inputValue}
          onChangeText={setInputValue}
          imageUri={imageUri}
          setImage={setImageUri}
          onSave={addItem}
          onClose={() => setCurrentModal(null)}
        />

        <ViewDetailsModal
          visible={currentModal === "view"}
          modalType={modalType}
          items={data[selectedDate]?.[modalType] || []}
          onDelete={deleteItem}
          onClose={() => setCurrentModal(null)}
        />
      </View>
    </SafeAreaView>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
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
  calendarHeaderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
  },
  calendarHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    backgroundColor: "#FFD3E4",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 8,
  },
  quoteContainer: {
    flexDirection: "row",
    padding: 20,
    paddingTop: 25,
    justifyContent: "center",
    alignItems: "center",
    gap: 35,
  },
  quoteTextHeader: {
    fontSize: 22,
    color: "#BE2B66",
    fontWeight: "600",
  },
  quoteTextDay: {
    fontSize: 18,
  },
  widgetContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 20,
    gap: 15,
  },
  eventWidget: {
    borderRadius: 30,
    backgroundColor: "#FFC1E1",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.29,
    height: height * 0.19,
    gap: 5,
    padding: 5,
  },
  imageWidget: {
    borderRadius: 30,
    backgroundColor: "#C9C3FF",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.29,
    height: height * 0.19,
    gap: 5,
    padding: 5,
  },
  noteWidget: {
    borderRadius: 30,
    backgroundColor: "#B0F3C4",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.29,
    height: height * 0.19,
    gap: 5,
    padding: 5,
  },
});
