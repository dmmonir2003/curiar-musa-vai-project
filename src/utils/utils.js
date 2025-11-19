
  export function formatDate(dateInput) {
  const date = new Date(dateInput);

  const day = date.getDate(); // e.g., 5
  const month = date.toLocaleString('en-US', { month: 'short' }); // e.g., Feb
  const year = date.getFullYear(); // e.g., 2025

  return `${day} ${month} ${year}`;
}



export function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}



export function isWithin24Hours(routeDate) {
  if (!routeDate) return false;
  
  const now = new Date();
  const routeDateTime = new Date(routeDate);
  const timeDifference = routeDateTime.getTime() - now.getTime();
  
  return timeDifference <= 24 * 60 * 60 * 1000; // 24 hours in milliseconds
}