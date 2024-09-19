import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, Text, Animated } from "react-native";
import settings from "../constants/settings";
import useMeccaHeading from "../hooks/useMeccaHeading";

const image = require("../assets/arrow.png");

const CompassView = () => {
  const heading = useMeccaHeading();
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateValue, {
      toValue: -1 * heading,
      duration: settings.animation.animationDelay,
      useNativeDriver: true,
    }).start();
  }, [heading]);

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
      <Text style={styles.text}></Text>
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
