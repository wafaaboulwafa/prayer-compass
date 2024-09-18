export const calculateBearing = (lat1, lon1, lat2, lon2) => {
  const toRadians = (degree) => degree * (Math.PI / 180);
  const toDegrees = (radian) => radian * (180 / Math.PI);

  const lat1Rad = toRadians(lat1);
  const lat2Rad = toRadians(lat2);
  const deltaLonRad = toRadians(lon2 - lon1);

  const y = Math.sin(deltaLonRad) * Math.cos(lat2Rad);
  const x =
    Math.cos(lat1Rad) * Math.sin(lat2Rad) -
    Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(deltaLonRad);

  let bearing = Math.atan2(y, x);
  bearing = toDegrees(bearing);
  bearing = (bearing + 360) % 360; // Normalize to 0-360

  return bearing;
};

/*
const lat1 = 39.099912; // Example: Kansas City
const lon1 = -94.581213;
const lat2 = 38.627089; // Example: St. Louis
const lon2 = -90.200203;

const heading = calculateBearing(lat1, lon1, lat2, lon2);
console.log(`Heading: ${heading}°`);
*/
