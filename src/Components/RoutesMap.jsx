// /* eslint-disable react/prop-types */
// import React, { useMemo } from "react";
// import {
//   GoogleMap,
//   Marker,
//   Polyline,
//   useJsApiLoader,
// } from "@react-google-maps/api";
// import { MAPS_API_KEY } from "../constants";
// import { FiExternalLink } from "react-icons/fi";

// const containerStyle = {
//   width: "100%",
//   height: "190px",
//   borderRadius: "12px",
//   overflow: "hidden",
// };

// const loaderOptions = {
//   googleMapsApiKey: MAPS_API_KEY,
//   libraries: ["places"],
//   id: "google-map-script",
//   language: "en",
//   region: "US",
//   version: "weekly",
// };

// function RouteMap({ routes, letterdisplay = "" }) {
//   const { isLoaded, loadError } = useJsApiLoader(loaderOptions);

//   // Normalize routes.
//   // CRITICAL CHANGE: We do NOT sort here anymore. We trust the parent's order.
//   const validRoutes = useMemo(() => {
//     if (!Array.isArray(routes)) return [];

//     return routes
//       .filter((route) => {
//         if (route == null) return false;
//         // Check that lat/lng exist and are numbers
//         const hasCoords =
//           typeof route.lat === "number" &&
//           typeof route.lng === "number" &&
//           !isNaN(route.lat) &&
//           !isNaN(route.lng);

//         // Ensure we don't plot 0,0 coordinates (failed geocodes)
//         const isNotZero = route.lat !== 0 && route.lng !== 0;

//         return hasCoords && isNotZero;
//       })
//       .map((route, index) => ({
//         ...route,
//         // Preserve the original index for labeling if needed
//         originalIndex: index,
//       }));
//   }, [routes]);

//   // Calculate map bounds to fit all points
//   const mapBounds = useMemo(() => {
//     if (validRoutes.length === 0 || !isLoaded || !window.google) return null;
//     try {
//       const bounds = new window.google.maps.LatLngBounds();
//       validRoutes.forEach((route) => {
//         bounds.extend(new window.google.maps.LatLng(route.lat, route.lng));
//       });
//       return bounds;
//     } catch (e) {
//       console.error("Error calculating bounds:", e);
//       return null;
//     }
//   }, [validRoutes, isLoaded]);

//   // Calculate center
//   const center = useMemo(() => {
//     if (validRoutes.length === 0) return { lat: 0, lng: 0 };
//     if (validRoutes.length === 1)
//       return { lat: validRoutes[0].lat, lng: validRoutes[0].lng };

//     const avgLat =
//       validRoutes.reduce((sum, route) => sum + route.lat, 0) /
//       validRoutes.length;
//     const avgLng =
//       validRoutes.reduce((sum, route) => sum + route.lng, 0) /
//       validRoutes.length;
//     return { lat: avgLat, lng: avgLng };
//   }, [validRoutes]);

//   // Handle Redirect to Google Maps
//   const handleOpenGoogleMaps = () => {
//     if (validRoutes.length === 0) return;

//     const baseUrl = "https://www.google.com/maps";
//     let url = "";

//     if (validRoutes.length === 1) {
//       const { lat, lng } = validRoutes[0];
//       url = `${baseUrl}/search/?api=1&query=${lat},${lng}`;
//     } else {
//       const origin = `${validRoutes[0].lat},${validRoutes[0].lng}`;
//       const destination = `${validRoutes[validRoutes.length - 1].lat},${
//         validRoutes[validRoutes.length - 1].lng
//       }`;

//       url = `${baseUrl}/dir/?api=1&origin=${origin}&destination=${destination}`;

//       if (validRoutes.length > 2) {
//         const waypoints = validRoutes
//           .slice(1, -1)
//           .map((r) => `${r.lat},${r.lng}`)
//           .join("|");
//         url += `&waypoints=${waypoints}`;
//       }
//     }
//     window.open(url, "_blank");
//   };

//   if (loadError)
//     return (
//       <div className="p-4 bg-red-100 text-red-800">Failed to load Map</div>
//     );
//   if (!isLoaded)
//     return <div className="p-4 bg-blue-100 text-blue-800">Loading map...</div>;

//   if (validRoutes.length === 0) {
//     return (
//       <div className="p-4 bg-yellow-100 text-yellow-800">
//         No route locations available
//       </div>
//     );
//   }

//   return (
//     <div
//       className="relative group cursor-pointer"
//       onClick={handleOpenGoogleMaps}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 z-10 transition-all duration-300 flex justify-center items-center">
//         <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity text-gray-700">
//           <span>Open Maps</span>
//           <FiExternalLink />
//         </div>
//       </div>

//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={center}
//         zoom={validRoutes.length === 1 ? 15 : 6}
//         options={{
//           disableDefaultUI: true,
//           zoomControl: false,
//           draggable: false,
//           scrollwheel: false,
//           streetViewControl: false,
//           clickableIcons: false,
//           ...(mapBounds && { bounds: mapBounds }),
//         }}
//       >
//         {validRoutes.map((route, index) => {
//           // Logic for Label:
//           // If letterdisplay is passed (e.g. '1' for 'A'), use custom logic (A, B..).
//           // Otherwise, just use the Index + 1 (1, 2, 3...) so it matches the route list order.
//           let labelText = "";
//           if (letterdisplay === "") {
//             labelText = (index + 1).toString();
//           } else {
//             // If using letter display logic (A, B, etc)
//             labelText = String.fromCharCode(65 + index);
//           }

//           return (
//             <Marker
//               key={`${route.lat}-${route.lng}-${index}`}
//               position={{ lat: route.lat, lng: route.lng }}
//               label={{
//                 text: labelText,
//                 color: "white",
//                 fontWeight: "bold",
//               }}
//             />
//           );
//         })}

//         {validRoutes.length > 1 && (
//           <Polyline
//             path={validRoutes.map((route) => ({
//               lat: route.lat,
//               lng: route.lng,
//             }))}
//             options={{
//               strokeColor: "#4285F4",
//               strokeOpacity: 0.8,
//               strokeWeight: 4,
//               geodesic: true,
//             }}
//           />
//         )}
//       </GoogleMap>
//     </div>
//   );
// }

// export default RouteMap;

/* eslint-disable react/prop-types */
import React, { useMemo } from "react";
import {
  GoogleMap,
  Marker,
  Polyline,
  useJsApiLoader,
} from "@react-google-maps/api";
import { MAPS_API_KEY } from "../constants";
import { FiExternalLink } from "react-icons/fi";

const containerStyle = {
  width: "100%",
  height: "190px", // Small size as requested
  borderRadius: "12px",
  overflow: "hidden",
};

const loaderOptions = {
  googleMapsApiKey: MAPS_API_KEY,
  libraries: ["places"],
  id: "google-map-script",
  language: "en",
  region: "US",
  version: "weekly",
};

function RouteMap({ routes, letterdisplay = "" }) {
  const { isLoaded, loadError } = useJsApiLoader(loaderOptions);

  // Normalize routes (Do NOT sort here, trust the parent's order for 1,2,3 logic)
  const validRoutes = useMemo(() => {
    if (!Array.isArray(routes)) return [];

    return routes
      .filter((route) => {
        if (route == null) return false;
        const hasCoords =
          typeof route.lat === "number" &&
          typeof route.lng === "number" &&
          !isNaN(route.lat) &&
          !isNaN(route.lng);

        // Filter out 0,0 coordinates
        const isNotZero = route.lat !== 0 && route.lng !== 0;

        return hasCoords && isNotZero;
      })
      .map((route, index) => ({
        ...route,
        lat: Number(route.lat),
        lng: Number(route.lng),
        originalIndex: index,
      }));
  }, [routes]);

  // Calculate map bounds to fit all points
  const mapBounds = useMemo(() => {
    if (validRoutes.length === 0 || !isLoaded || !window.google) return null;
    try {
      const bounds = new window.google.maps.LatLngBounds();
      validRoutes.forEach((route) => {
        bounds.extend(new window.google.maps.LatLng(route.lat, route.lng));
      });
      return bounds;
    } catch (e) {
      console.error("Error calculating bounds:", e);
      return null;
    }
  }, [validRoutes, isLoaded]);

  // Calculate center
  const center = useMemo(() => {
    if (validRoutes.length === 0) return { lat: 0, lng: 0 };
    if (validRoutes.length === 1)
      return { lat: validRoutes[0].lat, lng: validRoutes[0].lng };

    const avgLat =
      validRoutes.reduce((sum, route) => sum + route.lat, 0) /
      validRoutes.length;
    const avgLng =
      validRoutes.reduce((sum, route) => sum + route.lng, 0) /
      validRoutes.length;
    return { lat: avgLat, lng: avgLng };
  }, [validRoutes]);

  // --- 🚀 HANDLE REDIRECT TO GOOGLE MAPS ---
  const handleOpenGoogleMaps = () => {
    if (validRoutes.length === 0) return;

    const baseUrl = "https://www.google.com/maps/dir/?api=1";
    let url = "";

    if (validRoutes.length === 1) {
      // Single Point: Search View
      const { lat, lng } = validRoutes[0];
      // Uses the search API
      url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
    } else {
      // Multiple Points: Directions View with Waypoints
      const origin = `${validRoutes[0].lat},${validRoutes[0].lng}`;
      const destination = `${validRoutes[validRoutes.length - 1].lat},${
        validRoutes[validRoutes.length - 1].lng
      }`;

      url = `${baseUrl}&origin=${origin}&destination=${destination}`;

      // If there are intermediate stops (between start and end), add them as waypoints
      if (validRoutes.length > 2) {
        const waypoints = validRoutes
          .slice(1, -1) // Take everything except first and last
          .map((r) => `${r.lat},${r.lng}`)
          .join("|"); // Join with pipe character
        url += `&waypoints=${waypoints}`;
      }
    }

    // Open in new tab
    window.open(url, "_blank");
  };

  if (loadError)
    return (
      <div className="p-4 bg-red-100 text-red-800">Failed to load Map</div>
    );
  if (!isLoaded)
    return <div className="p-4 bg-blue-100 text-blue-800">Loading map...</div>;

  if (validRoutes.length === 0) {
    return (
      <div className="p-4 bg-yellow-100 text-yellow-800">
        No route locations available
      </div>
    );
  }

  return (
    <div
      className="relative group cursor-pointer"
      onClick={handleOpenGoogleMaps}
      title="Click to view full route in Google Maps"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 z-10 transition-all duration-300 flex justify-center items-center pointer-events-none">
        <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full shadow-md text-xs font-bold flex items-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity text-gray-700">
          <span>Open Maps</span>
          <FiExternalLink />
        </div>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={validRoutes.length === 1 ? 15 : 6}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          draggable: false, // Prevent dragging so click triggers redirect
          scrollwheel: false,
          streetViewControl: false,
          clickableIcons: false,
          ...(mapBounds && { bounds: mapBounds }),
        }}
      >
        {/* 1. DRAW THE PINS (1, 2, 3...) */}
        {validRoutes.map((route, index) => {
          // Logic: Default to 1, 2, 3... based on array index.
          const labelText =
            letterdisplay === ""
              ? (index + 1).toString()
              : String.fromCharCode(65 + index);

          return (
            <Marker
              key={`${route.lat}-${route.lng}-${index}`}
              position={{ lat: route.lat, lng: route.lng }}
              label={{
                text: labelText,
                color: "white",
                fontWeight: "bold",
              }}
            />
          );
        })}

        {/* 2. CONNECT THE LOCATIONS (Polyline) */}
        {validRoutes.length > 1 && (
          <Polyline
            path={validRoutes.map((route) => ({
              lat: route.lat,
              lng: route.lng,
            }))}
            options={{
              strokeColor: "#4285F4", // Google Blue
              strokeOpacity: 0.8,
              strokeWeight: 4,
              geodesic: true,
              icons: [
                {
                  icon: {
                    path: window.google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
                  },
                  offset: "50%",
                  repeat: "100px",
                },
              ],
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

export default RouteMap;
