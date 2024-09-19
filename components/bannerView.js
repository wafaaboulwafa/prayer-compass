import React, { useRef } from "react";
import { View, StyleSheet, Platform } from "react-native";
import {
  BannerAd,
  BannerAdSize,
  TestIds,
  useForeground,
} from "react-native-google-mobile-ads";
import settings from "../constants/settings";

const adUnitId = __DEV__ ? TestIds.ADAPTIVE_BANNER : settings.googleAds.unitId;

const BannerView = () => {
  const bannerRef = useRef(null);
  useForeground(() => {
    Platform.OS === "ios" && bannerRef.current?.load();
  });
  return (
    <View style={styles.container}>
      <BannerAd
        ref={bannerRef}
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          networkExtras: {
            collapsible: "bottom",
          },
        }}
      />
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

export default BannerView;
