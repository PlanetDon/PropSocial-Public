"use client";

import { useCallback, useEffect, useRef } from "react";
import {
  GEOLOCATION_OPTIONS,
  getLocationPermissionState,
  isGeolocationSupported,
  logPermissionState,
  shouldUpdateTrackedLocation,
  toLocationErrorMessage,
  toUserLocation
} from "@/services/location.service";
import { useLocationStore } from "@/store/location-store";

export function useLocation() {
  const watcherIdRef = useRef<number | null>(null);
  const {
    location,
    error,
    isLoading,
    setPermission,
    setTracking,
    setLocation,
    setLoading,
    setError
  } = useLocationStore();

  const stopTracking = useCallback(() => {
    if (watcherIdRef.current !== null && typeof window !== "undefined" && "geolocation" in navigator) {
      navigator.geolocation.clearWatch(watcherIdRef.current);
      watcherIdRef.current = null;
    }
    setTracking(false);
    setLoading(false);
  }, [setLoading, setTracking]);

  const startTracking = useCallback(async () => {
    if (!isGeolocationSupported()) {
      setError("Geolocation is not supported by this browser.");
      setPermission("prompt");
      setLoading(false);
      return;
    }

    if (watcherIdRef.current !== null) return;

    setError(null);
    setLoading(true);

    const permission = await getLocationPermissionState();
    setPermission(permission);
    logPermissionState(permission, "startTracking");

    if (permission === "denied") {
      setTracking(false);
      setLoading(false);
      setError("Location permission denied. Enable location access in browser settings.");
      return;
    }

    watcherIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const nextLocation = toUserLocation(position, "granted", true, true, 5);
        const previousLocation = useLocationStore.getState().location;

        if (!shouldUpdateTrackedLocation(previousLocation, nextLocation)) {
          setLoading(false);
          return;
        }

        setPermission("granted");
        setTracking(true);
        setLoading(false);
        setError(null);
        setLocation({
          latitude: nextLocation.latitude,
          longitude: nextLocation.longitude,
          accuracy: nextLocation.accuracy,
          timestamp: nextLocation.timestamp
        });
      },
      (watchError) => {
        if (watchError.code === watchError.PERMISSION_DENIED) {
          setPermission("denied");
          logPermissionState("denied", "watchPosition");
        }

        setError(toLocationErrorMessage(watchError));
        stopTracking();
      },
      GEOLOCATION_OPTIONS
    );

    setTracking(true);
  }, [setError, setLoading, setLocation, setPermission, setTracking, stopTracking]);

  useEffect(() => {
    let active = true;
    let permissionStatus: PermissionStatus | null = null;
    let onChangeHandler: (() => void) | null = null;

    async function syncPermission() {
      const permission = await getLocationPermissionState();
      if (!active) return;
      setPermission(permission);
      logPermissionState(permission, "permission-sync");

      if (navigator.permissions?.query) {
        try {
          permissionStatus = await navigator.permissions.query({
            name: "geolocation" as PermissionName
          });

          onChangeHandler = () => {
            const nextPermission = permissionStatus ? permissionStatus.state : "prompt";
            const mappedPermission =
              nextPermission === "granted" ? "granted" : nextPermission === "denied" ? "denied" : "prompt";
            setPermission(mappedPermission);
            logPermissionState(mappedPermission, "permission-change");
          };

          permissionStatus.addEventListener("change", onChangeHandler);
        } catch {
          // Some browsers do not fully support geolocation permission observers.
        }
      }
    }

    void syncPermission();

    return () => {
      active = false;
      stopTracking();
      if (permissionStatus && onChangeHandler) {
        permissionStatus.removeEventListener("change", onChangeHandler);
      }
    };
  }, [setPermission, stopTracking]);

  return {
    location,
    startTracking,
    stopTracking,
    error,
    isLoading
  };
}
