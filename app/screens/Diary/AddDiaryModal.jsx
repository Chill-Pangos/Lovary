import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Alert } from "react-native";

const AddDiaryModal = ({ visible, setModalVisible, refreshDiaryList }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSave = async () => {
    if (!title || !content) {
      Alert.alert("Nhắc nhở", "Bạn chưa nhập đủ các phần");
      return;
    }
    const newDiary = {
      title,
      content,
      date: new Date().toLocaleDateString("vi-VN"), 
    };

    try {
      const existingDiaries = await AsyncStorage.getItem("diaries");
      const diaries = existingDiaries ? JSON.parse(existingDiaries) : [];
      diaries.unshift(newDiary); 
      await AsyncStorage.setItem("diaries", JSON.stringify(diaries));
      refreshDiaryList(); 
    } catch (error) {
      console.error("Error saving diary: ", error);
    }

    setTitle("");
    setContent("");
    setModalVisible(false); 
  };
  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.headerText}>Thêm nhật ký</Text>
        <TextInput
            style={styles.title}
            placeholder="Tiêu đề"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.content}
            placeholder="Nội dung"
            value={content}
            onChangeText={setContent}
            multiline={true}
          />

          <View
            style={{
              flexDirection: "row",
              gap: 55,
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={styles.Button}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Button}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Lưu</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddDiaryModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    marginBottom:10,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalHeader: {
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
  content: {
    height: 80,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: "80%",
    borderRadius: 5,
    textAlignVertical: "top",
  },
  Button: {
    borderColor: "#FF41EC",
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical:10,
    paddingHorizontal:30,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color:"#FF41EC",
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom:20,
  }
});
