export function areCoordinateWithinIreland(latitude: number, longitude: number): boolean {
    // Approximate latitude and longitude limits for Ireland
    const minLatitude = 51.0; // Bottom left latitude
    const maxLatitude = 55.5; // Top right latitude
    const minLongitude = -11.0; // Bottom left longitude
    const maxLongitude = -5.0; // Top right longitude
  
    return (
      latitude >= minLatitude &&
      latitude <= maxLatitude &&
      longitude >= minLongitude &&
      longitude <= maxLongitude
    );
  }