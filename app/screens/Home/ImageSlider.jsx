import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { colors } from "../../theme/Colors";

const ImageSlider = ({ images, autoplay = true, autoplayTimeout = 3 }) => {
  return (
    <View style={styles.container}>
      <Swiper
        autoplay={autoplay}
        autoplayTimeout={autoplayTimeout}
        showsPagination={true}
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
      >
        {images.map((image, index) => (
          <View key={index} style={styles.slide}>
            <Image source={image} style={styles.image} />
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center", 
    width: "100%", 
    height: "100%", 
    backgroundColor: "#ffffff", 
    borderRadius: 16, 
    borderWidth: 0, 
    borderColor: "#ddd", 
    overflow: "hidden",
    shadowColor: "#000", 
    shadowOffset: { width: 4, height: 4 }, 
    shadowOpacity: 0.8, 
    shadowRadius: 4, 
    elevation: 5,
  },
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    width: Dimensions.get("window").width,
    height: "100%",
    resizeMode: "cover",
  },
  dot: {
    borderColor: colors.gray[50], 
    backgroundColor: colors.lightblue+"80",
    width: 16,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 3,
    borderWidth: 2,
  },
  activeDot: {
    borderColor: colors.white[50], 
    backgroundColor: colors.blue +"80",
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 3,
    borderWidth: 2,
  },
});

export default ImageSlider;
