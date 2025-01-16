import React from "react";
import { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

const ViewDetailsModal = ({ visible, modalType, items, onDelete, onClose }) => {
  const renderItems = (item, index) => (
    <View style={styles.listItem}>
      <Text>{item}</Text>
      <TouchableOpacity onPress={() => onDelete(index)}>
        <Text style={{ color: "red" }}>Xóa</Text>
      </TouchableOpacity>
    </View>
  );
 /*   useEffect(() => {
        alert(`Items: ${JSON.stringify(items)}`);
      }, [items]); */

  return (
    <Modal transparent={true} animationType="slide" visible={visible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>
            {modalType === "events"
              ? "Sự kiện"
              : modalType === "photos"
              ? "Ảnh"
              : "Ghi chú"}
          </Text>
          {modalType === "photos"
            ? items.map((photoUri, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  {photoUri && (
                    <Image
                      source={{ uri: photoUri }}
                      style={{ width: 100, height: 100, borderRadius: 10 }}
                    />
                  )}
                  <TouchableOpacity onPress={() => onDelete(index)}>
                    <Text style={{ color: "red" }}>Xóa</Text>
                  </TouchableOpacity>
                </View>
              ))
            : items.map((item, index) => (
                <View key={index} style={{ marginBottom: 10 }}>
                  <Text>{item}</Text>
                  <TouchableOpacity onPress={() => onDelete(index)}>
                    <Text style={{ color: "red" }}>Xóa</Text>
                  </TouchableOpacity>
                </View>
              ))}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ViewDetailsModal;

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
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
});
