import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { Magnetometer } from "expo-sensors";

const CompassView = () => {
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] = useState(null);
  const rotateValue = new Animated.Value(0);

  const _subscribe = () => {
    setSubscription(
      Magnetometer.addListener((result) => {
        setData(result);
        let heading = Math.atan2(result.y, result.x) * (180 / Math.PI);
        if (heading < 0) {
          heading += 360;
        }
        Animated.timing(rotateValue, {
          toValue: heading,
          duration: 100,
          useNativeDriver: false,
        }).start();
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
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

  const getCardinalDirection = (heading) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(heading / 45) % 8;
    return directions[index];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headingValue}>{`Heading: ${rotateValue._value.toFixed(
        2
      )}°`}</Text>
      <Text
        style={styles.cardinalDirection}
      >{`Direction: ${getCardinalDirection(rotateValue._value)}`}</Text>
      <View style={styles.compassContainer}>
        <Animated.Image
          source={require("./assets/compass.png")}
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
  headingValue: {
    fontSize: 24,
    marginBottom: 10,
    color: "#333",
  },
  cardinalDirection: {
    fontSize: 18,
    marginBottom: 20,
    color: "#555",
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
