import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  TextInput,
} from "react-native";

const AddDiaryModal = ({ visible, setModalVisible }) => {
  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput style={styles.title} placeholder="Tiêu đề"></TextInput>
          <TextInput
            style={styles.content}
            placeholder="Nội dung"
            multiline={true}
          ></TextInput>

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
              <Text>Hủy</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.Button}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text>Lưu</Text>
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
    marginTop: 10,
    alignItems: "center",
  },
});
