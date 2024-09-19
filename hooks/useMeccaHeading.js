import React, { useEffect, useRef, useState } from "react";
import { Magnetometer } from "expo-sensors";
import * as Location from "expo-location";
import { calculateHeading } from "../utils/heading";
import settings from "../constants/settings";

const useMeccaHeading = () => {
  const subscription = useRef(null);
  const headingAdjustment = useRef(0);
  const [heading, setHeading] = useState(0);
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

  return heading;
};

export default useMeccaHeading;
