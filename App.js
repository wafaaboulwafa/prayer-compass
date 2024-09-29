import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import "expo-dev-client";
import { useEffect, useState } from "react";
import { grantPermissions } from "./utils/permissions";
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";
import BannerView from "./components/bannerView";
import CompassView3 from "./components/compassView3";

export default function App() {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setHasPermissions(await grantPermissions());
      await mobileAds().setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.G,
        tagForChildDirectedTreatment: false,
        tagForUnderAgeOfConsent: false,
      });
      await mobileAds().initialize();
      setLoading(false);
    })();
  });
  const showCompass = hasPermissions && !loading;
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.compassContainer}>
        {showCompass && <CompassView3 />}
        {!showCompass && !loading && (
          <Text style={styles.warning}>
            Please allow the required permissions to use the application
          </Text>
        )}
        {loading && <ActivityIndicator size={"large"} color={"black"} />}
      </View>
      {showCompass && (
        <View style={styles.adsContainer}>
          <BannerView />
        </View>
      )}
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
    flex: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  warning: {
    color: "black",
    padding: 50,
    textAlign: "center",
  },
  adsContainer: {
    flex: 2,
  },
});
