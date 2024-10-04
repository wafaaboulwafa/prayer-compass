import React from "react";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import { View, StyleSheet, Text } from "react-native";

const PrayersView = ({ location }) => {
  if (!location) return null;
  const params = CalculationMethod.MoonsightingCommittee();
  const coordinates = new Coordinates(location.latitude, location.longitude);
  const prayerTimes = new PrayerTimes(coordinates, new Date(), params);
  console.log(prayerTimes);
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(prayerTimes, null, 4)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PrayersView;
