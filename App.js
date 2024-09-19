import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import CompassView from "./components/compassView";
import "expo-dev-client";
import { useEffect, useState } from "react";
import { grantPermissions } from "./utils/permissions";
import mobileAds from "react-native-google-mobile-ads";
import BannerView from "./components/bannerView";

mobileAds()
  .initialize()
  .then((adapterStatuses) => {
    // Initialization complete!
  });

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
      <View style={styles.compassContainer}>
        {showCompass && <CompassView />}
        {!showCompass && !loading && (
          <Text style={styles.warning}>
            Please allow the required permissions to use the application
          </Text>
        )}
        {loading && <ActivityIndicator size={"large"} color={"black"} />}
      </View>
      <View style={styles.adsContainer}>
        <BannerView />
      </View>
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
  compassContainer: {
    flex: 9,
    alignContent: "center",
    justifyContent: "center",
  },
  warning: {
    color: "black",
    padding: 50,
    textAlign: "center",
  },
  adsContainer: {
    flex: 3,
  },
});
