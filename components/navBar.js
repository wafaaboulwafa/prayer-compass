import React from "react";
import { View, StyleSheet, Text, Alert, TouchableOpacity } from "react-native";

const NavBar = ({ style, pageIndex, setPageIndex }) => {
  const goToPage = (index) => {
    setPageIndex(index);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={() => goToPage(0)}>
        <Text>Compass</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => goToPage(1)}>
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
