import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import * as Location from "expo-location";

const useLocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        setIsError(true);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setIsError(false);
    })();
  }, []);

  return { location, error };
};

export default useLocation;
