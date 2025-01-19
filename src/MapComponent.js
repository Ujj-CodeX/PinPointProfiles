import React from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const MapComponent = ({ latitude, longitude }) => {
  const mapStyles = { height: "400px", width: "100%" };

  // Default center for the map (in case lat/lng is not available)
  const defaultCenter = { lat: latitude || 0, lng: longitude || 0 };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCSC9F3-In8J06N7eBtEp-n2V_ufdjuWNo">
      <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={10}>
        <Marker position={defaultCenter} />
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
