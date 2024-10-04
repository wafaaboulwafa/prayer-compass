import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import "expo-dev-client";
import { useEffect, useState } from "react";
import { grantPermissions } from "./utils/permissions";
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";
import BannerView from "./components/bannerView";
import CompassView from "./components/compassView";
import NavBar from "./components/navBar";
import PrayersView from "./components/prayersView";
import * as Location from "expo-location";

export default function App() {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      setHasPermissions(await grantPermissions());
      await mobileAds().setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.G,
        tagForChildDirectedTreatment: false,
        tagForUnderAgeOfConsent: false,
      });
      await mobileAds().initialize();
      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });

      setLoading(false);
    })();
  }, []);
  const showCompass = hasPermissions && !loading;
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <NavBar
        pageIndex={pageIndex}
        setPageIndex={setPageIndex}
        style={styles.navBar}
      />
      <View style={styles.compassContainer}>
        {showCompass && pageIndex === 0 && <CompassView location={location} />}
        {showCompass && pageIndex === 1 && <PrayersView location={location} />}
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
  navBar: { height: 80 },
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
    height: 80,
  },
});
