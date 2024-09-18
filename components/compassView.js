import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Magnetometer } from "expo-sensors";
import { calculateHeading } from "../utils/heading";
import settings from "../constants/settings";
import * as Location from "expo-location";

const image = require("../assets/arrow.png");

const CompassView = () => {
  const subscription = useRef(null);
  const headingAdjustment = useRef(0);
  const [heading, setHeading] = useState(0);

  const onCompass = (result) => {
    try {
      let northHeading = Math.atan2(result.y, result.x) * (180 / Math.PI);
      if (northHeading < 0) northHeading += 360;
      let meccaHeading = northHeading - headingAdjustment.current;
      if (meccaHeading < 0) meccaHeading += 360;
      setHeading(meccaHeading);
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

  return (
    <View style={styles.container}>
      <Image
        source={image}
        style={[
          styles.compassImage,
          { transform: [{ rotate: `${heading}deg` }] },
        ]}
      />
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
});

export default CompassView;
