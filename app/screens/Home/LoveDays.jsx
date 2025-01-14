import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import DayService from "../../services/DayServices";
import { colors } from "../../theme/Colors";

const LoveDays = () => {
  const [daysUsed, setDaysUsed] = useState(0);
  const [days, setDays] = useState(null);

  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("vi-VN", options); // Định dạng ngày theo chuẩn Việt Nam
  };

  useEffect(() => {
    const initializeDate = async () => {
      const firstDate = await DayService.getFirstDate();
      if (!firstDate) {
        await DayService.storeFirstDate();
        setDaysUsed(0);
      } else {
        const days = DayService.getDaysInLove();
        setDaysUsed(days);
      }
      setDays(firstDate);
    };

    initializeDate();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.text}>Số ngày yêu nhau</Text>
        <Text style={styles.number}>{daysUsed}</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.text}>Ngày đầu tiên yêu</Text>
        <Text style={styles.number}>{formatDate(new Date(days))}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "stretch",
    padding: 10,
    borderRadius: 16,
    backgroundColor: colors.lightpink,
  },
  box: {
    flex: 1,
    margin: 10,
    backgroundColor: colors.white[50],
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.gray[50],
    padding: 10,
    alignItems: "center",
    elevation: 5,
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  number: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.pink,
  },
});

export default LoveDays;
