import React from "react";
import { View, StyleSheet, Text } from "react-native";
import useMeccaHeading from "../hooks/useMeccaHeading";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { RotatingImage, RotatingImageNoAnimation } from "./rotatingImage";
import { flipAngle } from "../utils/heading";

const arrowImage = require("../assets/meccah-arrow.png");
const compassImage = require("../assets/compass.png");

const CompassView = () => {
  const { northHeading, meccaHeading } = useMeccaHeading();

  return (
    <View style={styles.container}>
      <RotatingImageNoAnimation
        source={arrowImage}
        style={styles.arrowImage}
        heading={meccaHeading}
      />
      <RotatingImageNoAnimation
        source={compassImage}
        style={styles.compassImage}
        heading={flipAngle(northHeading)}
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
