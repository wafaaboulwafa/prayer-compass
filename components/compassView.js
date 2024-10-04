import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Location from "expo-location";
import { calculateHeading, flipAngle, safeAngleValue } from "../utils/heading";
import settings from "../constants/settings";

const arrowImage = require("../assets/meccah-arrow.png");
const compassImage = require("../assets/compass.png");

const CompassView = ({ location }) => {
  if (!location) return null;

  const subscription = useRef(null);
  const headingAdjustment = useRef(0);
  const lastExecTime = useRef(0);

  const arrowRef = useRef(null);
  const compassRef = useRef(null);
  const updatingRef = useRef(false);

  const onCompass = async (headingData) => {
    if (updatingRef.current === true) return;
    updatingRef.current = true;
    try {
      let northHeading = headingData?.trueHeading || 0;
      if (isNaN(northHeading)) return;
      let meccaHeading = headingAdjustment.current - northHeading;
      if (meccaHeading < 0) meccaHeading += 360;

      if (
        new Date().getTime() - lastExecTime.current >
        settings.animation.compassUpdateDelay
      ) {
        if (
          northHeading >= 0 &&
          northHeading <= 360 &&
          meccaHeading >= 0 &&
          meccaHeading <= 360
        )
          setHeading({ northHeading, meccaHeading });
        lastExecTime.current = new Date().getTime();
      }
    } catch (e) {
      console.warn(e);
    } finally {
      updatingRef.current = false;
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const headAdjustment = calculateHeading(
          location.latitude,
          location.longitude,
          settings.meccaLocation.lat,
          settings.meccaLocation.lng
        );

        headingAdjustment.current = headAdjustment;
        subscription.current = await Location.watchHeadingAsync(onCompass);
      } catch (e) {
        console.warn(e);
      }
    })();
    return () => {
      if (subscription.current !== null) subscription.current.remove();
    };
  }, []);

  const arrowRotateValue = useRef(new Animated.Value(0)).current;
  const compassRotateValue = useRef(new Animated.Value(0)).current;

  setHeading = ({ northHeading, meccaHeading }) => {
    Animated.timing(arrowRotateValue, {
      toValue: safeAngleValue(Math.round(meccaHeading)),
      duration: settings.animation.animationDelay,
      useNativeDriver: true,
    }).start();

    Animated.timing(compassRotateValue, {
      toValue: safeAngleValue(flipAngle(Math.round(northHeading))),
      duration: settings.animation.animationDelay,
      useNativeDriver: true,
    }).start();
  };

  const rotateArrow = arrowRotateValue.interpolate({
    inputRange: [0, 359],
    outputRange: ["0deg", "359deg"],
  });

  const compassArrow = compassRotateValue.interpolate({
    inputRange: [0, 359],
    outputRange: ["0deg", "359deg"],
  });

  return (
    <View style={styles.container}>
      <Animated.Image
        ref={arrowRef}
        source={arrowImage}
        style={[styles.arrowImage, { transform: [{ rotate: rotateArrow }] }]}
      />
      <Animated.Image
        ref={compassRef}
        source={compassImage}
        style={[styles.compassImage, { transform: [{ rotate: compassArrow }] }]}
      />
    </View>
  );
};

const screenWidth = Math.round(wp(100));
const screenHeight = Math.round(hp(100));

const smallestSize = Math.min(screenWidth, screenHeight);

const compassWidth = Math.round(smallestSize * 0.5);
const arrowWidth = Math.round(smallestSize * 1);
const adsBannerShift = 90;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  compassImage: {
    resizeMode: "contain",
    position: "absolute",
    width: compassWidth,
    height: compassWidth,
    left: Math.round(screenWidth / 2 - compassWidth / 2),
    top: Math.round(screenHeight / 2 - compassWidth / 2) - adsBannerShift,
  },
  arrowImage: {
    resizeMode: "contain",
    position: "absolute",
    width: arrowWidth,
    height: arrowWidth,
    left: Math.round(screenWidth / 2 - arrowWidth / 2),
    top: Math.round(screenHeight / 2 - arrowWidth / 2) - adsBannerShift,
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
