/* eslint-disable react/prop-types */
import React, { useMemo } from "react";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { MAPS_API_KEY } from "../constants";

// Styles for the map container
const containerStyle = {
  width: "100%",
  height: "200px",
};

// Shared Google Maps loader options — must not change between renders
const loaderOptions = {
  googleMapsApiKey: MAPS_API_KEY,
  libraries: ["places"], // Use consistent libraries (avoid switching to 'maps')
  id: "google-map-script", // Keep a consistent ID to avoid reloading conflicts
  language: "en",
  region: "US",
  version: "weekly",
};

function MapComponent({ fromLat, fromLng, toLat, toLng }) {
  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader(loaderOptions);

  // Check if coordinates are valid
  const areCoordsValid = useMemo(() => {
    return (
      typeof fromLat === "number" &&
      typeof fromLng === "number" &&
      typeof toLat === "number" &&
      typeof toLng === "number" &&
      !isNaN(fromLat) &&
      !isNaN(fromLng) &&
      !isNaN(toLat) &&
      !isNaN(toLng)
    );
  }, [fromLat, fromLng, toLat, toLng]);

  // Center of the map based on midpoint between from and to
  const center = useMemo(() => {
    return {
      lat: (fromLat + toLat) / 2,
      lng: (fromLng + toLng) / 2,
    };
  }, [fromLat, fromLng, toLat, toLng]);

  const pathCoordinates = useMemo(() => [
    { lat: fromLat, lng: fromLng },
    { lat: toLat, lng: toLng },
  ], [fromLat, fromLng, toLat, toLng]);

  // Error loading the map
  if (loadError) {
    return <p>Failed to load Google Maps. Please try again later.</p>;
  }

  // Map not yet ready or coordinates not valid
  if (!isLoaded || !areCoordsValid) {
    return <p>Loading map...</p>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={6}
      options={{
      // mapTypeId: "satellite", // force satellite view
      disableDefaultUI: true, // hides all default controls
    }}
    >
      <Marker position={{ lat: fromLat, lng: fromLng }} label="A" />
      <Marker position={{ lat: toLat, lng: toLng }} label="B" />

      <Polyline
        path={pathCoordinates}
        options={{
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 3,
          clickable: false,
          draggable: false,
          editable: false,
          visible: true,
        }}
      />
    </GoogleMap>
  );
}

export default MapComponent;
