import React, { useEffect, useRef, useState } from "react";
import { Magnetometer } from "expo-sensors";

const useHeading = () => {
  const [heading, setHeading] = useState(0);
  const subscription = useRef(null);
  useEffect(() => {
    subscription = Magnetometer.addListener((result) => {
      let heading = Math.atan2(result.y, result.x) * (180 / Math.PI);
      setHeading(heading);
    });

    return () => {
      if (subscription.current !== null) subscription.current.remove();
    };
  }, []);

  return heading;
};

export default useHeading;
