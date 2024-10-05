import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import "expo-dev-client";
import { useEffect, useState } from "react";
import { grantPermissions } from "./utils/permissions";
import mobileAds, { MaxAdContentRating } from "react-native-google-mobile-ads";
import BannerView from "./components/bannerView";
import CompassView from "./components/compassView";
import NavBar from "./components/navBar";
import PrayersView from "./components/prayersView";
import * as Location from "expo-location";
import { getRandomNumberBetween } from "./utils/heading";

const backImages = [
  require("./assets/background-1.jpg"),
  require("./assets/background-2.jpg"),
  require("./assets/background-3.jpg"),
  require("./assets/background-4.jpg"),
  require("./assets/background-5.jpg"),
  require("./assets/background-6.jpg"),
];

export default function App() {
  const [hasPermissions, setHasPermissions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [location, setLocation] = useState(null);
  const [imgSrcIndex] = useState(
    getRandomNumberBetween(1, backImages.length - 1)
  );
  const imgSrc = backImages[imgSrcIndex];

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
      <ImageBackground
        style={styles.background}
        source={imgSrc}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <StatusBar style="auto" />
          <NavBar pageIndex={pageIndex} setPageIndex={setPageIndex} />
          <View style={styles.compassContainer}>
            {showCompass && pageIndex === 0 && (
              <CompassView location={location} />
            )}
            {showCompass && pageIndex === 1 && (
              <PrayersView location={location} />
            )}
            {!showCompass && !loading && (
              <Text style={styles.warning}>
                Please allow the required permissions to use the application
              </Text>
            )}
            {loading && <ActivityIndicator size={"large"} color={"#F0B18E"} />}
          </View>
          {showCompass && (
            <View style={styles.adsContainer}>
              <BannerView />
            </View>
          )}
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
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
    height: 80,
  },
});
