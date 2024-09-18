import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import CompassView from "../components/compassView";
import AdsView from "../components/AdsView";

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <CompassView />
      <AdsView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
