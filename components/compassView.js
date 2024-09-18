import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Magnetometer } from "expo-sensors";
import { calculateHeading } from "../utils/heading";
import settings from "../constants/settings";

const CompassView = () => {
  const subscription = useRef(null);
  const headingAdjustment = useRef(0);
  const rotateValue = new Animated.Value(0);

  const onCompass = (result) => {
    setData(result);
    let heading = Math.atan2(result.y, result.x) * (180 / Math.PI);
    if (heading < 0) heading += 360;
    heading += headingAdjustment.current;
    Animated.timing(rotateValue, {
      toValue: heading,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted")
        throw "Permission to access location was denied";
      let loc = await Location.getCurrentPositionAsync({});
      headingAdjustment.current = calculateHeading(
        loc.lat,
        loc.lng,
        settings.meccaLocation.lat,
        settings.meccaLocation.lng
      );

      subscription.current = Magnetometer.addListener(onCompass);
    })();
    return () => {
      if (subscription.current !== null) subscription.current.remove();
    };
  }, []);

  const rotateStyle = {
    transform: [
      {
        rotate: rotateValue.interpolate({
          inputRange: [0, 360],
          outputRange: ["0deg", "360deg"],
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <View style={styles.compassContainer}>
        <Animated.Image
          source={require("../assets/compass.png")}
          style={[styles.compassImage, rotateStyle]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  compassContainer: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 125,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  compassImage: {
    width: 200,
    height: 200,
  },
});

export default CompassView;
