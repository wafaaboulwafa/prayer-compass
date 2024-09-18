import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Magnetometer } from "expo-sensors";
import { calculateHeading } from "../utils/heading";
import settings from "../constants/settings";
import * as Location from "expo-location";

const CompassView = () => {
  const subscription = useRef(null);
  const headingAdjustment = useRef(0);
  const [heading, setHeading] = useState(0);

  const onCompass = (result) => {
    try {
      let newHeading = Math.atan2(result.y, result.x) * (180 / Math.PI);
      if (newHeading < 0) newHeading += 360;
      newHeading += headingAdjustment.current;
      setHeading(newHeading);
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
      <View style={styles.compassContainer}>
        <Image
          source={require("../assets/compass.png")}
          style={[
            styles.compassImage,
            { transform: [{ rotate: `${heading}deg` }] },
          ]}
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
    backgroundColor: "#000000",
  },
  compassContainer: {
    width: 250,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#040404",
  },
  compassImage: {
    width: 200,
    height: 200,
  },
});

export default CompassView;
