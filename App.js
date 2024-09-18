import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CompassView from "./components/compassView";
import AdsView from "./components/AdsView";
import { initializeApp } from "react-native-google-mobile-ads";
import settings from "./constants/settings";
import "expo-dev-client";

initializeApp({
  androidAppId: settings.androidAppId,
  iosAppId: settings.iosAppId,
});

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CompassView />
      <AdsView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
