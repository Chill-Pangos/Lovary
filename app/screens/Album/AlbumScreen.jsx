import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Entypo, AntDesign } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const images = {
  th: require("../../assets/exampleBG/th.jpg"),
  pango: require("../../assets/exampleBG/backgroundLovary.png"),
};

const { height, width } = Dimensions.get("window");

const AlbumScreen = () => {
  const [sections, setSections] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadImages();
  }, []);

  const loadImages = async () => {
    try {
      const storedSections = await AsyncStorage.getItem("albumSections");
      if (storedSections) {
        setSections(JSON.parse(storedSections));
      }
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  const saveImages = async (newSections) => {
    try {
      await AsyncStorage.setItem("albumSections", JSON.stringify(newSections));
    } catch (error) {
      console.error("Error saving images:", error);
    }
  };

  const handleAddImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access media library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;

      const now = new Date();
      const vietnamTime = new Date(now.getTime() + 7 * 60 * 60 * 1000);
      const month = `${vietnamTime.getMonth() + 1}`.padStart(2, "0");
      const year = vietnamTime.getFullYear();
      const dateKey = `${month}.${year}`;

      const updatedSections = [...sections];
      const sectionIndex = updatedSections.findIndex(
        (section) => section.date === dateKey
      );

      if (sectionIndex > -1) {
        updatedSections[sectionIndex].data.push({ image: uri });
      } else {
        updatedSections.push({ date: dateKey, data: [{ image: uri }] });
      }

      updatedSections.sort(
        (a, b) => new Date(`01.${b.date}`) - new Date(`01.${a.date}`)
      );

      setSections(updatedSections);
      saveImages(updatedSections);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.screenHeaderContainer}>
          <Text style={styles.screenHeaderText}>Thư viện</Text>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity onPress={handleAddImage}>
            <Entypo
              name="plus"
              size={35}
              color="#FF45BB"
              style={{ marginRight: 15 }}
            ></Entypo>
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {!sections[0] && (
          <View
            styles={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                margin: 16,
                fontStyle: "italic",
                fontSize: 18,
                textAlign: "center",
                color: "#FF45BB",
              }}
            >
              Thư viện hiện tại chưa có ảnh.
            </Text>
            <Text
              style={{
                margin: 16,
                fontStyle: "italic",
                fontSize: 14,
                textAlign: "center",
                color: "#FF45BB",
              }}
            >
              Hãy thêm những khoảnh khắc bên nhau {"\n"}bằng cách nhấn vào nút "
              + "
            </Text>
          </View>
        )}
        {sections &&
          sections?.map((section) => {
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
                        onPress={() => setSelectedImage(item.image)} 
                      >
                        <Image
                          source={{ uri: item.image }}
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

      {/*  Modal xem ảnh */}
      <Modal
        visible={!!selectedImage}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setSelectedImage(null)} // Đóng modal khi người dùng nhấn Back
      >
        <View style={styles.modalBackground}>
          <TouchableOpacity
            style={styles.modalCloseButton}
            onPress={() => setSelectedImage(null)}
          >
            <AntDesign name="close" size={28} color="#fff" />
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
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
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    width: "100%",
    height: "100%",
  },
  modalCloseButton: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  
});
