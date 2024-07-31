import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import locations from "../../../../data/datamaps";
import "leaflet/dist/leaflet.css";

const MapSection = () => {
  return (
    <div className="flex flex-col gap-3 text-button">
      <h1 className="font-bold text-3xl">Maps</h1>
      <div className="flex flex-col w-full z-0">
        {locations.map((location) => (
          <>
            <h2 className="font-semibold text-xl">{location.label}</h2>
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={30}
              style={{
                height: "170px",
                width: "100%",
                marginBottom: "26px",
                border: "1px solid #F2673F",
                borderRadius: "8px",
              }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[location.lat, location.lng]}>
                <Popup>{location.label}</Popup>
              </Marker>
            </MapContainer>
          </>
        ))}
      </div>
    </div>
  );
};

export default MapSection;
