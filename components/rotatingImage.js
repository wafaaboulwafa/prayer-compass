import React, { useEffect, useRef } from "react";
import { Animated, Image } from "react-native";
import { safeAngleValue } from "../utils/heading";
import settings from "../constants/settings";

export const RotatingImage = ({ style, source, heading }) => {
  const rotateValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(rotateValue, {
      toValue: safeAngleValue(Math.round(heading)),
      duration: settings.animation.animationDelay,
      useNativeDriver: true,
    }).start();
  }, [heading]);

  const rotateArrow = rotateValue.interpolate({
    inputRange: [0, 359],
    outputRange: ["0deg", "359deg"],
  });

  return (
    <Animated.Image
      source={source}
      style={[style, { transform: [{ rotate: rotateArrow }] }]}
    />
  );
};

export const RotatingImageNoAnimation = ({ style, source, heading }) => {
  return (
    <Image
      source={source}
      style={[
        style,
        {
          transform: [{ rotate: safeAngleValue(Math.round(heading)) + "deg" }],
        },
      ]}
    />
  );
};
