import React, { useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import { Magnetometer } from "expo-sensors";

export const grantPermissions = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    let { status: magnetoStatus } =
      await Magnetometer.requestPermissionsAsync();
    return status === "granted" && magnetoStatus === "granted";
  } catch (e) {
    console.log(e);
    return false;
  }
};
