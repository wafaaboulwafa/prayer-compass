import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";

const NavBar = ({ style, pageIndex, setPageIndex }) => {
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={() => setPageIndex(0)}>
        <Text>Compass</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setPageIndex(1)}>
        <Text>Prayer Times</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

export default NavBar;
