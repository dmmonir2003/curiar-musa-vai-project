/* eslint-disable react/prop-types */
import React, { useMemo } from "react";
import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { MAPS_API_KEY } from "../constants";

const containerStyle = {
  width: "100%",
  height: "190px",
};

const loaderOptions = {
  googleMapsApiKey: MAPS_API_KEY,
  libraries: ["places"],
  id: "google-map-script",
  language: "en",
  region: "US",
  version: "weekly",
};

function RouteMap({ routes, letterdisplay="" }) {
  const { isLoaded, loadError } = useJsApiLoader(loaderOptions);
  // console.log("Letter", letterdisplay)
  // Normalize and validate routes
  const validRoutes = useMemo(() => {
    // Handle cases where routes is undefined, null, or not an array
    if (!Array.isArray(routes)) return [];
    
    return routes
      .filter(route => {
        // Filter out undefined/null items
        if (route == null) return false;
        
        // Check for required fields
        const hasCoords = typeof route.lat === 'number' && 
                         typeof route.lng === 'number' && 
                         !isNaN(route.lat) && 
                         !isNaN(route.lng);
        const hasAddress = route.address && typeof route.address === 'string';
        
        return hasCoords && hasAddress;
      })
      .map(route => ({
        // Normalize the data
        lat: route.lat,
        lng: route.lng,
        address: route.address || 'Unknown address',
        timeSlot: route.timeSlot || 'Unknown time'
      }));
  }, [routes]);

  // Sort valid routes by time (if timeSlot exists)
  const sortedRoutes = useMemo(() => {
    return [...validRoutes].sort((a, b) => {
      if (!a.timeSlot || !b.timeSlot) return 0;
      try {
        const getTimeValue = (timeSlot) => {
          const [startTime] = timeSlot.split(' - ');
          const [hours, minutes] = startTime.split(':').map(Number);
          return hours * 60 + minutes;
        };
        return getTimeValue(a.timeSlot) - getTimeValue(b.timeSlot);
      } catch (e) {
        return 0;
      }
    });
  }, [validRoutes]);

  // Calculate map bounds to fit all points
  const mapBounds = useMemo(() => {
    if (sortedRoutes.length === 0 || !isLoaded || !window.google) return null;
    
    try {
      const bounds = new window.google.maps.LatLngBounds();
      sortedRoutes.forEach(route => {
        bounds.extend(new window.google.maps.LatLng(route.lat, route.lng));
      });
      return bounds;
    } catch (e) {
      console.error('Error calculating bounds:', e);
      return null;
    }
  }, [sortedRoutes, isLoaded]);

  // Calculate center point if no bounds (fallback)
  const center = useMemo(() => {
    if (sortedRoutes.length === 0) return { lat: 0, lng: 0 };
    if (sortedRoutes.length === 1) return sortedRoutes[0];
    
    const avgLat = sortedRoutes.reduce((sum, route) => sum + route.lat, 0) / sortedRoutes.length;
    const avgLng = sortedRoutes.reduce((sum, route) => sum + route.lng, 0) / sortedRoutes.length;
    return { lat: avgLat, lng: avgLng };
  }, [sortedRoutes]);

  if (loadError) {
    return <div className="p-4 bg-red-100 text-red-800">Failed to load Google Maps</div>;
  }

  if (!isLoaded) {
    return <div className="p-4 bg-blue-100 text-blue-800">Loading map...</div>;
  }

  if (validRoutes.length === 0) {
    if (!routes) {
      return <div className="p-4 bg-yellow-100 text-yellow-800">No route data provided</div>;
    }
    if (!Array.isArray(routes)) {
      return <div className="p-4 bg-yellow-100 text-yellow-800">Invalid route data format</div>;
    }
    if (routes.length > 0) {
      return <div className="p-4 bg-yellow-100 text-yellow-800">No valid locations found in the route data</div>;
    }
    return <div className="p-4 bg-yellow-100 text-yellow-800">No routes available</div>;
  }

  return (
    <div className="relative">
      {validRoutes.length < (Array.isArray(routes) ? routes.length : 0) && (
        <div className="absolute top-0 right-0 bg-yellow-100 text-yellow-800 text-xs p-1 z-10">
          Showing {validRoutes.length} of {routes.length} locations
        </div>
      )}
      
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={sortedRoutes.length === 1 ? 10 : 6}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          ...(mapBounds && { bounds: mapBounds })
        }}
      >
        {sortedRoutes.map((route, index) => (
          <Marker
            key={`${route.lat}-${route.lng}-${index}`}
            position={{ lat: route.lat, lng: route.lng }}
            label={letterdisplay== "" ? String.fromCharCode(65 + index) : String.fromCharCode(65 + (letterdisplay - 1))}
            title={`${route.address} (${route.timeSlot})`}
          />
        ))}

        {sortedRoutes.length > 1 && (
          <Polyline
            path={sortedRoutes.map(route => ({ lat: route.lat, lng: route.lng }))}
            options={{
              strokeColor: "#4285F4",
              strokeOpacity: 0.8,
              strokeWeight: 4,
              geodesic: true,
              // icons: [{
              //   icon: { path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW },
              //   offset: '100%',
              //   repeat: '100px'
              // }]
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default RouteMap;