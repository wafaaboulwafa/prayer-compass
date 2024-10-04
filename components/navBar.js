import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import prayerTitles from "../constants/prayerTitles";

const NavBar = ({ style, pageIndex, setPageIndex }) => {
  const goToPage = (index) => {
    setPageIndex(index);
  };

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[
          styles.button,
          styles.left,
          pageIndex === 0 ? styles.active : null,
        ]}
        onPress={() => goToPage(0)}
      >
        <Text
          style={[
            styles.buttonText,
            pageIndex === 0 ? styles.activeText : null,
          ]}
        >
          {prayerTitles.compass}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          styles.right,
          pageIndex === 1 ? styles.active : null,
        ]}
        onPress={() => goToPage(1)}
      >
        <Text
          style={[
            styles.buttonText,
            pageIndex === 1 ? styles.activeText : null,
          ]}
        >
          {prayerTitles.times}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    marginBottom: 70,
    flexDirection: "row",
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "#16325B",
    flex: 1,
    padding: 15,
  },
  buttonText: {
    color: "#FFDC7F",
    textAlign: "center",
    padding: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  left: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  right: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  active: {
    backgroundColor: "#78B7D0",
  },
  activeText: {
    color: "#16325B",
  },
});

export default NavBar;
