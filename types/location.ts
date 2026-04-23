export type LocationPermission = "granted" | "denied" | "prompt";

export type UserLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  permission: LocationPermission;
  isTracking: boolean;
};
