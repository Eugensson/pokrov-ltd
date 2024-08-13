"use client";

import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/128/1201/1201643.png",
  iconSize: [40, 40],
});

const Map = () => {
  return (
    <MapContainer
      center={[49.40423179429793, 32.03255312616817]}
      zoom={20}
      scrollWheelZoom={false}
      className="w-full h-[150px] md:h-[300px] lg:h-[500px] rounded-md overflow-hidden"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[49.40423179429793, 32.03255312616817]}
        icon={customIcon}
      >
        <Popup className="text-xs">
          Черкаська обл., м. Черкаси,
          <br />
          вул. Максима Залізняка, 167
          <br />
          <br /> Пн-Пт: 08:00-20:00,
          <br /> Сб-Нд: вихідний.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
