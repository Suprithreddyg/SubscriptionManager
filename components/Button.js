import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Button = ({ title, onPress }) => {
  return (
    React.createElement(TouchableOpacity, { style: styles.button, onPress: onPress },
      React.createElement(Text, { style: styles.text }, title)
    )
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "blue",
    marginTop: 15,
    paddingVertical: 15,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "700",
    fontSize: 18,
  },
});

