import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Svg, { G, LinearGradient, Stop, Path, Defs } from "react-native-svg";
import { useFonts } from "expo-font";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DayService from "../../services/DayServices";
const { width, height } = Dimensions.get("window");

const HomeScreen = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({
    Outfit: require("../../assets/fonts/Outfit-VariableFont_wght.ttf"),
    Courgette: require("../../assets/fonts/Courgette-Regular.ttf"),
  });

  const [daysUsed, setDaysUsed] = useState(0);
  const [days, setDays] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [user1, setUser1] = useState({ name: "mintun", avatar: null });
  const [user2, setUser2] = useState({ name: "DTT", avatar: null });
  const [editingUser, setEditingUser] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("vi-VN", options);
  };

  useEffect(() => {
    const initializeDate = async () => {
      try {
        const firstDate = await DayService.getFirstDate();
        if (!firstDate) {
          await DayService.storeFirstDate();
          setDaysUsed(0);
        } else {
          const days = await DayService.getDaysInLove();
          setDaysUsed(days);
        }
        setDays(firstDate);
      } catch (error) {
        console.error("Error initializing date:", error);
      }
    };

    const loadData = async () => {
      try {
        const storedBackground = await AsyncStorage.getItem("backgroundImage");
        const storedUser1 = await AsyncStorage.getItem("user1");
        const storedUser2 = await AsyncStorage.getItem("user2");
    
        if (storedBackground) setBackgroundImage(storedBackground);
        if (storedUser1) setUser1(JSON.parse(storedUser1));
        if (storedUser2) setUser2(JSON.parse(storedUser2));
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
    initializeDate();
  }, []);

  const pickBackgroundImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri; // Lấy URI từ kết quả.
      setBackgroundImage(uri);
      await AsyncStorage.setItem("backgroundImage", uri); // Lưu vào AsyncStorage.
    }
  };

  const editUser = (user) => {
    setEditingUser(user);
    setNewName(user.name);
    setNewAvatar(user.avatar);
    setModalVisible(true);
  };

  const saveUser = async () => {
    const updatedUser = { name: newName, avatar: newAvatar };
    try {
      if (editingUser === user1) {
        setUser1(updatedUser);
        await AsyncStorage.setItem("user1", JSON.stringify(updatedUser));
      } else {
        setUser2(updatedUser);
        await AsyncStorage.setItem("user2", JSON.stringify(updatedUser));
      }
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const pickAvatar = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      const uri = result.assets[0].uri; // Lấy URI từ kết quả.
      setNewAvatar(uri);
    }
  };

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        style={styles.container}
        source={
          backgroundImage
            ? { uri: backgroundImage }
            : require("../../assets/exampleBG/backgroundLovary.png")
        }
      >
        <View style={styles.screenHeaderContainer}>
          <Text style={styles.screenHeaderText}>Lovary</Text>
          <View style={{ flex: 1 }}></View>
          <TouchableOpacity onPress={pickBackgroundImage}>
            <Ionicons name="image" size={27} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name={"camera"}
              size={27}
              color="white"
              onPress={() => navigation.navigate("Thư viện")}
            ></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name={"book"}
              size={27}
              color="white"
              onPress={() => navigation.navigate("Nhật ký")}
            ></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name={"calendar"}
              size={27}
              color="white"
              onPress={() => navigation.navigate("Lịch")}
            ></Ionicons>
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
            <Text style={styles.heartCountDay}>{daysUsed}</Text>
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
              onPress={() => editUser(user1)}
              activeOpacity={0.9}
            >
              <Image
                style={styles.userAvatar}
                source={
                  user1.avatar
                    ? { uri: user1.avatar }
                    : require("../../assets/exampleBG/th.jpg")
                }
              ></Image>
              <Text style={styles.userName}>{user1.name}</Text>
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
              onPress={() => editUser(user2)}
              activeOpacity={0.9}
            >
              <Image
                style={styles.userAvatar}
                source={
                  user2.avatar
                    ? { uri: user2.avatar }
                    : require("../../assets/exampleBG/background.jpg")
                }
              ></Image>
              <Text style={styles.userName}>{user2.name}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <Modal transparent={true} animationType="fade" visible={modalVisible}>
  <View style={styles.modalContainer}>
    <View style={styles.modalContent}>
      <Text style={styles.headerText}>Chỉnh sửa thông tin</Text>
      <TextInput
        style={styles.title}
        value={newName}
        onChangeText={setNewName}
        placeholder="Nhập tên mới"
      />
      <TouchableOpacity style={styles.avatarButton} onPress={pickAvatar}>
        <Text style={styles.buttonText}>Đổi ảnh đại diện</Text>
      </TouchableOpacity>

      <View style={styles.modalButtonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.buttonText}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={saveUser}>
          <Text style={styles.buttonText}>Lưu</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  title: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: "80%",
    borderRadius: 5,
  },
  avatarButton: {
    borderColor: "#FF41EC",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  button: {
    borderColor: "#FF41EC",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#FF41EC",
  },
});

export default HomeScreen;
