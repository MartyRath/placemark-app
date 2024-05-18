
// Checks if input coordinates are within Ireland
export function areCoordinateWithinIreland(latitude: number, longitude: number): boolean {
    // Rough latitude and longitude limits for Ireland
    const minLatitude = 51.0; // Bottom left latitude
    const minLongitude = -11.0; // Bottom left longitude
    const maxLatitude = 55.5; // Top right latitude
    const maxLongitude = -5.0; // Top right longitude
  
    // Returns true if meets criteria
    return (
      latitude >= minLatitude && // Checks if entered latitude is greater than/equal to min, etc.
      latitude <= maxLatitude &&
      longitude >= minLongitude &&
      longitude <= maxLongitude
    );
  }