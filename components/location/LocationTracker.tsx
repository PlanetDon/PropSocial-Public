"use client";

import { LoaderCircle, LocateFixed, ShieldAlert } from "lucide-react";
import { useLocation } from "@/hooks/use-location";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function LocationTracker() {
  const { location, startTracking, stopTracking, error, isLoading } = useLocation();
  const hasFix = location.timestamp > 0;
  const showDenied = location.permission === "denied";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-2">
        <CardTitle className="text-base">GPS location tracker</CardTitle>
        {location.isTracking ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-700">
            <LocateFixed className="size-3.5" />
            Tracking active
          </span>
        ) : showDenied ? (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600">
            <ShieldAlert className="size-3.5" />
            Permission denied
          </span>
        ) : (
          <span className="text-xs font-medium text-slate-500">Tracking inactive</span>
        )}
      </CardHeader>

      <CardContent className="space-y-3 text-sm text-slate-700">
        <div className="flex flex-wrap gap-2">
          <Button onClick={startTracking} disabled={isLoading || location.isTracking}>
            {isLoading ? (
              <span className="inline-flex items-center gap-2">
                <LoaderCircle className="size-4 animate-spin" />
                Fetching location...
              </span>
            ) : (
              "Enable Location"
            )}
          </Button>
          <Button variant="secondary" onClick={stopTracking} disabled={!location.isTracking}>
            Stop Tracking
          </Button>
        </div>

        {hasFix && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p>
              <strong>Latitude:</strong> {location.latitude}
            </p>
            <p>
              <strong>Longitude:</strong> {location.longitude}
            </p>
            <p>
              <strong>Accuracy:</strong> {Math.round(location.accuracy)}m
            </p>
          </div>
        )}

        {!hasFix && !isLoading && <p className="text-slate-500">Enable location to start tracking.</p>}
        {showDenied && (
          <p className="text-xs text-red-600">
            Location access is blocked. Allow geolocation in your browser/site settings.
          </p>
        )}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </CardContent>
    </Card>
  );
}
