import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect } from "react";

const AddDetailModal = ({
  visible,
  modalType,
  inputValue,
  onChangeText,
  imageUri,
  setImage,
  onSave,
  onClose,
}) => {
  const [selectedImage, setSelectedImage] = useState();

  const pickImage = async () => {
    try {
      // Yêu cầu quyền truy cập thư viện ảnh
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert(
          "Bạn cần cấp quyền truy cập thư viện ảnh để sử dụng tính năng này!"
        );
        return;
      }

      // Mở thư viện ảnh
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images, // Sử dụng API đúng
        allowsEditing: true,
        quality: 1,
      });

      // Kiểm tra kết quả trả về
      if (!result.assets || result.assets.length === 0) {
        return;
      }
      /* alert(result.assets[0].uri) */
      setImage(result.assets[0].uri);
      setSelectedImage(result.assets[0].uri);
    } catch (error) {
      console.error("Lỗi khi mở thư viện ảnh:", error);
    }
  };

  const handleSave = () => {
    /* if (modalType === "photos" && selectedImage) {
      setImage(selectedImage);
    } */
    onSave();
    setSelectedImage(null);
  };

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>
            Thêm{" "}
            {modalType === "events"
              ? "Sự kiện"
              : modalType === "photos"
              ? "Ảnh"
              : "Ghi chú"}
          </Text>
          {modalType === "photos" ? (
            <>
              <TouchableOpacity
                style={styles.imagePickerButton}
                onPress={pickImage}
              >
                <Text style={styles.imagePickerText}>Chọn ảnh từ thư viện</Text>
              </TouchableOpacity>
              {selectedImage && (
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.previewImage}
                />
              )}
            </>
          ) : (
            <TextInput
              style={styles.input}
              placeholder={`Nhập ${
                modalType === "events" ? "sự kiện" : "ghi chú"
              }`}
              value={inputValue}
              onChangeText={onChangeText}
            />
          )}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={{ color: "white", fontWeight: "bold" }}>Lưu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddDetailModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: "#FF69B4",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
  cancelButton: {
    marginTop: 10,
    alignItems: "center",
  },
  imagePickerButton: {
    backgroundColor: "#FF69C9",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  imagePickerText: {
    color: "white",
    fontWeight: "bold",
  },
  previewImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginVertical: 10,
  },
});
