import React from "react";
import { Coordinates, CalculationMethod, PrayerTimes } from "adhan";
import { View, StyleSheet, Text } from "react-native";
import moment from "moment-hijri";

const PryaerTime = ({ titleEn, titleAr, value }) => {
  const options = { hour: "2-digit", minute: "2-digit", second: "2-digit" };
  const time = new Intl.DateTimeFormat("en-US", options).format(value);
  return (
    <View style={styles.line}>
      <Text style={styles.titleEn}>{titleEn}</Text>
      <Text style={styles.timeValue}>{time}</Text>
      <Text style={styles.titleAr}>{titleAr}</Text>
    </View>
  );
};
const PrayersView = ({ location }) => {
  if (!location) return null;
  const params = CalculationMethod.UmmAlQura();
  const coordinates = new Coordinates(location.latitude, location.longitude);
  const prayerTimes = new PrayerTimes(coordinates, new Date(), params);
  const hijriDate = moment().format("iYYYY/iM/iD");
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{hijriDate}</Text>
      <PryaerTime titleEn={"Fajr"} titleAr={"الفجر"} value={prayerTimes.fajr} />
      <PryaerTime
        titleEn={"Sunrise"}
        titleAr={"الشروق"}
        value={prayerTimes.sunrise}
      />
      <PryaerTime
        titleEn={"Dhuhr"}
        titleAr={"الظهر"}
        value={prayerTimes.dhuhr}
      />
      <PryaerTime titleEn={"Asr"} titleAr={"العسر"} value={prayerTimes.asr} />
      <PryaerTime
        titleEn={"Maghrib"}
        titleAr={"المفرب"}
        value={prayerTimes.maghrib}
      />
      <PryaerTime
        titleEn={"Isha"}
        titleAr={"العشاء"}
        value={prayerTimes.isha}
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
  date: {},
  line: {
    width: "100%",
    flexDirection: "row",
    marginHorizontal: 20,
  },
  titleEn: {
    flex: 1,
  },
  titleAr: {
    flex: 1,
  },
  timeValue: {
    flex: 2,
  },
});

export default PrayersView;
