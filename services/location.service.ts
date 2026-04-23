import type { LocationPermission, UserLocation } from "@/types/location";

export const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 12_000,
  maximumAge: 5_000
};

export const DEFAULT_DISTANCE_THRESHOLD_METERS = 8;
const DEFAULT_MASK_DECIMALS = 5;
const EARTH_RADIUS_METERS = 6_371_000;

type PermissionAuditEntry = {
  permission: LocationPermission;
  timestamp: number;
  source: string;
};

const permissionAuditLog: PermissionAuditEntry[] = [];

export function isGeolocationSupported(): boolean {
  return typeof window !== "undefined" && "geolocation" in navigator;
}

export async function getLocationPermissionState(): Promise<LocationPermission> {
  if (typeof window === "undefined" || !navigator.permissions?.query) {
    return "prompt";
  }

  try {
    const permissionStatus = await navigator.permissions.query({
      name: "geolocation" as PermissionName
    });
    return mapPermissionState(permissionStatus.state);
  } catch {
    return "prompt";
  }
}

export function mapPermissionState(state: PermissionState): LocationPermission {
  if (state === "granted") return "granted";
  if (state === "denied") return "denied";
  return "prompt";
}

export function maskCoordinate(value: number, decimals = DEFAULT_MASK_DECIMALS): number {
  return Number(value.toFixed(decimals));
}

export function toUserLocation(
  position: GeolocationPosition,
  permission: LocationPermission,
  isTracking: boolean,
  maskPrecision = true,
  decimals = DEFAULT_MASK_DECIMALS
): UserLocation {
  return {
    latitude: maskPrecision ? maskCoordinate(position.coords.latitude, decimals) : position.coords.latitude,
    longitude: maskPrecision ? maskCoordinate(position.coords.longitude, decimals) : position.coords.longitude,
    accuracy: Math.max(position.coords.accuracy, 0),
    timestamp: position.timestamp,
    permission,
    isTracking
  };
}

export function distanceBetweenCoordinatesMeters(
  current: Pick<UserLocation, "latitude" | "longitude">,
  previous: Pick<UserLocation, "latitude" | "longitude">
): number {
  const lat1 = toRadians(previous.latitude);
  const lat2 = toRadians(current.latitude);
  const deltaLat = toRadians(current.latitude - previous.latitude);
  const deltaLng = toRadians(current.longitude - previous.longitude);

  // Haversine keeps movement checks stable for small coordinate changes.
  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_METERS * c;
}

export function shouldUpdateTrackedLocation(
  previous: UserLocation,
  next: UserLocation,
  minDistanceMeters = DEFAULT_DISTANCE_THRESHOLD_METERS
): boolean {
  if (previous.timestamp === 0) return true;
  return distanceBetweenCoordinatesMeters(next, previous) >= minDistanceMeters;
}

export function toLocationErrorMessage(error?: GeolocationPositionError): string {
  if (!error) return "Unable to determine your location right now.";

  if (error.code === error.PERMISSION_DENIED) {
    return "Location permission denied. Enable location access in browser settings.";
  }

  if (error.code === error.TIMEOUT) {
    return "Location request timed out. Try again with a stronger GPS signal.";
  }

  if (error.code === error.POSITION_UNAVAILABLE) {
    return "Location is currently unavailable. Check your network or GPS settings.";
  }

  return "Unable to retrieve your location right now.";
}

export function buildNearbyPropertiesQuery(params: {
  latitude: number;
  longitude: number;
  radiusMeters?: number;
}): URLSearchParams {
  const query = new URLSearchParams();
  query.set("lat", params.latitude.toString());
  query.set("lng", params.longitude.toString());
  query.set("radiusMeters", (params.radiusMeters ?? 1_500).toString());
  return query;
}

export function logPermissionState(permission: LocationPermission, source = "location-tracker"): void {
  permissionAuditLog.push({
    permission,
    timestamp: Date.now(),
    source
  });

  if (permissionAuditLog.length > 100) {
    permissionAuditLog.shift();
  }
}

export function getPermissionAuditLog(): PermissionAuditEntry[] {
  return [...permissionAuditLog];
}

function toRadians(value: number): number {
  return (value * Math.PI) / 180;
}
