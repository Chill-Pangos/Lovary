import { MaterialIcons } from "@expo/vector-icons";
import React,{useState} from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";


const ViewDetailsModal = ({ visible, modalType, items, onDelete, onClose }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Trạng thái ảnh chi tiết
  const [photoModalVisible, setPhotoModalVisible] = useState(false); // Trạng thái modal chi tiết ảnh

  const openPhotoDetail = (photoUri) => {
    setSelectedPhoto(photoUri);
    setPhotoModalVisible(true);
  };

  const closePhotoDetail = () => {
    setSelectedPhoto(null);
    setPhotoModalVisible(false);
  };
 /*  const renderItems = (item, index) => (
    <View style={styles.listItem}>
      <Text>{item}</Text>
      <TouchableOpacity onPress={() => onDelete(index)}>
        <Text style={{ color: "red" }}>Xóa</Text>
      </TouchableOpacity>
    </View>
  ); */
  /*   useEffect(() => {
        alert(`Items: ${JSON.stringify(items)}`);
      }, [items]); */

  return (
    <>
      <Modal transparent={true} animationType="fade" visible={visible}>
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
              ? (<View style={styles.gridContainer}>
                {items.map((photoUri, index) => (
                <View
                  key={index}
                  style={styles.gridItem}
                >
                  {photoUri && (
                    <TouchableOpacity onPress={() => openPhotoDetail(photoUri)}>
                    <Image
                      source={{ uri: photoUri }}
                      style={styles.image}
                      resizeMode="cover"
                    />
                  </TouchableOpacity>

                  )}
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDelete(index)}
                  >
                    <AntDesign name="close" size={16} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </View>)
            : modalType === "notes"
            ? items.map((item, index) => (
                <View
                  key={index}
                  style={{
                    marginBottom: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Text>{item}</Text>
                  <TouchableOpacity onPress={() => onDelete(index)}>
                    <Text
                      style={{
                        color: "red",
                        borderColor: "red",
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderWidth: 1,
                        borderRadius: 8,
                      }}
                    >
                      X
                    </Text>
                  </TouchableOpacity>
                </View>
              ))
            : items.map((item, index) => (
                <View
                  key={index}
                  style={{
                    marginBottom: 10,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View  style={styles.eventItem}>
            <MaterialIcons name={item?.icon} size={24} color="black" />
            <Text style={styles.eventName}>{item?.name}</Text>
          </View>
                  <TouchableOpacity onPress={() => onDelete(index)}>
                    <Text
                      style={{
                        color: "red",
                        borderColor: "red",
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderWidth: 1,
                        borderRadius: 8,
                      }}
                    >
                      X
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
      
       {/* Modal xem chi tiết ảnh */}
       <Modal transparent={true} animationType="fade" visible={photoModalVisible}>
        <View style={styles.photoModalContainer}>
          <TouchableOpacity style={styles.photoModalClose} onPress={closePhotoDetail}>
          <AntDesign name="close" size={28} color="#fff" />
          </TouchableOpacity>
          {selectedPhoto && (
            <Image
              source={{ uri: selectedPhoto }}
              style={{ width: "90%", height: "70%", borderRadius: 10 }}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
    </>
    
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
  eventItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  eventName: {
    marginLeft: 10,
    fontSize: 16,
  },
  photoModalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  photoModalClose: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  gridItem: {
    position: "relative",
    width: "30%",
    aspectRatio: 1, // Tỷ lệ 1:1
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  deleteButton: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 12,
    padding: 4,
  },
});
