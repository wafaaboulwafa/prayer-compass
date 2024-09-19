import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import CompassView from "./components/compassView";
import AdsView from "./components/AdsView";
//import { initializeApp } from "react-native-google-mobile-ads";
import settings from "./constants/settings";
import "expo-dev-client";
import { useEffect, useState } from "react";
import { grantPermissions } from "./utils/permissions";
import { useForegroundPermissions } from "expo-location";

// initializeApp({
//   androidAppId: settings.androidAppId,
//   iosAppId: settings.iosAppId,
// });

export default function App() {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setHasPermissions(await grantPermissions());
      setLoading(false);
    })();
  });

  const showCompass = hasPermissions && !loading;

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {showCompass && <CompassView />}
      {!showCompass && !loading && (
        <Text style={styles.warning}>
          Please allow the required permissions to use the application
        </Text>
      )}
      {loading && <ActivityIndicator size={"large"} color={"black"} />}
      {/* <AdsView /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignContent: "center",
    justifyContent: "center",
  },
  warning: {
    color: "black",
    padding: 50,
    textAlign: "center",
  },
});
