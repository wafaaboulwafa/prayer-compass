import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
// import {
//   BannerAd,
//   BannerAdSize,
//   TestIds,
//   InterstitialAd,
//   AdEventType,
// } from "react-native-google-mobile-ads";
import settings from "../constants/settings";

const AdsView = () => {
  return (
    <View style={styles.container}>
      <BannerAd
        unitId={__DEV__ ? TestIds.BANNER : settings.googleAds.adUnitId}
        size={BannerAdSize.FULL_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AdsView;
