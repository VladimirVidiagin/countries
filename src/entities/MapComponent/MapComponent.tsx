import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

interface OpenStreetMapComponentProps {
  lat: number;
  lng: number;
  popupText: string;
}

const OpenStreetMapComponent: React.FC<OpenStreetMapComponentProps> = ({
  lat,
  lng,
  popupText,
}) => {
  const defaultCenter: [number, number] = [lat, lng];

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/16177/16177088.png",
    iconSize: [38, 38],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
  });

  return (
    <MapContainer
      center={defaultCenter}
      zoom={6}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={defaultCenter} icon={customIcon}>
        <Popup>{popupText}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default OpenStreetMapComponent;
