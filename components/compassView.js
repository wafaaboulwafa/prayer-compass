import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import settings from "../constants/settings";
import useMeccaHeading from "../hooks/useMeccaHeading";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { flipAngle, safeAngleValue } from "../utils/heading";

const arrowImage = require("../assets/meccah-arrow.png");
const compassImage = require("../assets/compass.png");

const CompassView = () => {
  const { northHeading, meccaHeading } = useMeccaHeading();
  const arrowRotateValue = useRef(new Animated.Value(0)).current;
  const compassRotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(arrowRotateValue, {
      toValue: safeAngleValue(meccaHeading),
      duration: settings.animation.animationDelay,
      useNativeDriver: true,
    }).start();

    Animated.timing(compassRotateValue, {
      toValue: safeAngleValue(flipAngle(northHeading)),
      duration: settings.animation.animationDelay,
      useNativeDriver: true,
    }).start();
  }, [meccaHeading, northHeading]);

  const rotateArrow = arrowRotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  const rotateCompass = compassRotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={arrowImage}
        style={[styles.arrowImage, { transform: [{ rotate: rotateArrow }] }]}
      />
      <Animated.Image
        source={compassImage}
        style={[
          styles.compassImage,
          { transform: [{ rotate: rotateCompass }] },
        ]}
      />
      <Text style={styles.text}></Text>
    </View>
  );
};

const screenWidth = Math.round(wp(100));
const screenHeight = Math.round(hp(100));

const smallestSize = Math.min(screenWidth, screenHeight);

const compassWidth = Math.round(smallestSize * 0.5);
const arrowWidth = Math.round(smallestSize * 1);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 3,
  },
  compassImage: {
    resizeMode: "contain",
    position: "absolute",
    width: compassWidth,
    height: compassWidth,
    left: Math.round(screenWidth / 2 - compassWidth / 2),
    top: Math.round(screenHeight / 2 - compassWidth / 2),
  },
  arrowImage: {
    resizeMode: "contain",
    position: "absolute",
    width: arrowWidth,
    height: arrowWidth,
    left: Math.round(screenWidth / 2 - arrowWidth / 2),
    top: Math.round(screenHeight / 2 - arrowWidth / 2),
  },
  text: {
    position: "absolute",
    top: 30,
    left: 20,
    color: "#050505",
    zIndex: 1,
  },
});

export default CompassView;
