import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import CompassView from "./components/compassView";
import AdsView from "./components/AdsView";
//import { initializeApp } from "react-native-google-mobile-ads";
import settings from "./constants/settings";
import "expo-dev-client";
import { useEffect, useState } from "react";
import { grantPermissions } from "./utils/permissions";

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
    })();

    setLoading(false);
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      {loading && <ActivityIndicator />}
      {hasPermissions && !loading && <CompassView />}
      {!hasPermissions && !loading && (
        <Text style={styles.warning}>
          Please allow the required permissions to use the application
        </Text>
      )}
      {/* <AdsView /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignContent: "center",
    justifyContent: "center",
  },
  warning: {
    color: "white",
    padding: 50,
    textAlign: "center",
  },
});
