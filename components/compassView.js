import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, Text, Animated } from "react-native";
import { Magnetometer } from "expo-sensors";
import { calculateHeading } from "../utils/heading";
import settings from "../constants/settings";
import * as Location from "expo-location";

const image = require("../assets/arrow.png");

const CompassView = () => {
  const subscription = useRef(null);
  const headingAdjustment = useRef(0);
  const [heading, setHeading] = useState(0);
  const [text, setText] = useState("");
  const lastExecTime = useRef(0);
  const onCompass = async (result) => {
    try {
      let { trueHeading: northHeading } = await Location.getHeadingAsync();
      let meccaHeading = headingAdjustment.current - northHeading;
      if (meccaHeading < 0) meccaHeading += 360;

      if (
        new Date().getTime() - lastExecTime.current >
        settings.animation.compassUpdateDelay
      ) {
        setText(northHeading + "," + meccaHeading);
        setHeading(-1 * meccaHeading);
        lastExecTime.current = new Date().getTime();
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted")
          throw "Permission to access location was denied";

        let { status: magnetoStatus } =
          await Magnetometer.requestPermissionsAsync();

        if (magnetoStatus !== "granted")
          throw "Permission to access sensor was denied";

        let loc = await Location.getCurrentPositionAsync({});
        const headAdjustment = calculateHeading(
          loc.coords.latitude,
          loc.coords.longitude,
          settings.meccaLocation.lat,
          settings.meccaLocation.lng
        );

        headingAdjustment.current = headAdjustment;
        subscription.current = Magnetometer.addListener(onCompass);
      } catch (e) {
        console.log(e);
      }
    })();
    return () => {
      if (subscription.current !== null) subscription.current.remove();
    };
  }, []);

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
      <Text style={styles.text}>{text}</Text>
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
