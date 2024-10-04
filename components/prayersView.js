import React from "react";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import { View, StyleSheet, Text } from "react-native";
import moment from "moment-hijri";
import prayerTitles from "../constants/prayerTitles";

const PrayerTime = ({ titleEn, titleAr, value }) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  const time = new Intl.DateTimeFormat("en-US", options).format(value);
  return (
    <View style={styles.timeInstance}>
      <Text style={styles.timeInstanceTitle}>
        {titleEn} - {titleAr}
      </Text>
      <Text style={styles.timeInstanceValue}>{time}</Text>
    </View>
  );
};

const PrayersView = ({ location }) => {
  if (!location) return null;
  const today = new Date();
  const params = CalculationMethod.UmmAlQura();
  const coordinates = new Coordinates(location.latitude, location.longitude);
  const prayerTimes = new PrayerTimes(coordinates, today, params);
  const hijriDateEn = moment()
    .locale("en-US")
    .format("iYYYY / iMM - iMMMM / iDD");
  const hijriDateAr = moment()
    .locale("ar-SA")
    .format("iYYYY / iMM - iMMMM / iDD");

  const dayNameEn = today.toLocaleDateString("en-US", { weekday: "long" });
  const dayNameAr = today.toLocaleDateString("ar-SA", { weekday: "long" });

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{dayNameEn + " - " + dayNameAr}</Text>
      <Text style={styles.date}>{hijriDateEn}</Text>
      <Text style={styles.date}>{hijriDateAr}</Text>
      <View style={styles.timesContainer}>
        <View style={styles.timesContainerLine}>
          <PrayerTime
            titleEn={prayerTitles.fajr.en}
            titleAr={prayerTitles.fajr.ar}
            value={prayerTimes.fajr}
          />
          <PrayerTime
            titleEn={prayerTitles.sunrise.en}
            titleAr={prayerTitles.sunrise.ar}
            value={prayerTimes.sunrise}
          />
        </View>
        <View style={styles.timesContainerLine}>
          <PrayerTime
            titleEn={prayerTitles.dhuhr.en}
            titleAr={prayerTitles.dhuhr.ar}
            value={prayerTimes.dhuhr}
          />
          <PrayerTime
            titleEn={prayerTitles.asr.en}
            titleAr={prayerTitles.asr.ar}
            value={prayerTimes.asr}
          />
        </View>
        <View style={styles.timesContainerLine}>
          <PrayerTime
            titleEn={prayerTitles.maghrib.en}
            titleAr={prayerTitles.maghrib.ar}
            value={prayerTimes.maghrib}
          />
          <PrayerTime
            titleEn={prayerTitles.isha.en}
            titleAr={prayerTitles.isha.ar}
            value={prayerTimes.isha}
          />
        </View>
      </View>
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
  timesContainer: {
    flex: 1,
    paddingHorizontal: 30,
  },
  timesContainerLine: {
    flexDirection: "row-reverse",
    width: "100%",
  },
  timeInstance: {
    flex: 1,
    borderWidth: 1,
    margin: 5,
    flexDirection: "column",
  },
  timeInstanceTitle: {
    borderWidth: 1,
    textAlign: "center",
  },
  timeInstanceValue: {
    borderWidth: 1,
    textAlign: "center",
  },
});

export default PrayersView;
