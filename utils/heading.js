export const calculateHeading = (lat1, lon1, lat2, lon2) => {
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

export const getCardinalDirection = (heading) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(heading / 45) % 8;
  return directions[index];
};

export const flipAngle = (value) =>
  value && value > 0 ? Math.round(360 - value) : 0;

export const safeAngleValue = (value) =>
  value && value >= 0 && value < 360 ? value : 0;

export const getRandomNumberBetween = (min, max) =>
  Math.floor(Math.random() * max) + min;
