import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Text, Animated } from "react-native";
import settings from "../constants/settings";
import useMeccaHeading from "../hooks/useMeccaHeading";

const image = require("../assets/arrow.png");

const CompassView = () => {
  const { northHeading, meccaHeading } = useMeccaHeading();
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateValue, {
      toValue: meccaHeading,
      duration: settings.animation.animationDelay,
      useNativeDriver: true,
    }).start();
  }, [meccaHeading]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 360],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        source={image}
        style={[styles.compassImage, { transform: [{ rotate }] }]}
      />
      <Text style={styles.text}>{Math.round(northHeading)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#040404",
    borderWidth: 3,
  },
  compassImage: {
    width: 250,
    height: 250,
  },
  text: {
    position: "absolute",
    top: 30,
    left: 20,
    color: "white",
    zIndex: 1,
  },
});

export default CompassView;
