import React from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

const SelectTypeModal = ({ visible, onSelectType, onClose }) => {
  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Chọn loại để thêm</Text>
          <TouchableOpacity
            style={[styles.typeButton, { backgroundColor: "#FFC1E1" }]}
            onPress={() => onSelectType("events")}
          >
            <Text style={styles.typeText}>Sự kiện</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, { backgroundColor: "#C9C3FF" }]}
            onPress={() => onSelectType("photos")}
          >
            <Text style={styles.typeText}>Ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, { backgroundColor: "#B0F3C4" }]}
            onPress={() => onSelectType("notes")}
          >
            <Text style={styles.typeText}>Ghi chú</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text>Hủy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SelectTypeModal;

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
  typeButton: {
    padding: 15,
    borderRadius: 5,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
  },
  typeText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  cancelButton: {
    marginTop: 10,
    alignItems: "center",
  },
});
