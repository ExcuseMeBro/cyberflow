'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

interface GameClub {
  id: number;
  name: string;
  logo: string;
  lat: number;
  lng: number;
  players: number;
  games: string[];
  rating: number;
  distance: string;
}

interface MapComponentProps {
  center: [number, number];
  clubs: GameClub[];
  onClubSelect: (club: GameClub) => void;
  selectedClubId?: number;
}

export default function MapComponent({ center, clubs, onClubSelect, selectedClubId }: MapComponentProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [defaultIcon, setDefaultIcon] = useState<L.Icon | null>(null);

  useEffect(() => {
    setIsMounted(true);

    // Create default icon on client side only
    const icon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    setDefaultIcon(icon);
  }, []);

  if (!isMounted || !defaultIcon) {
    return (
      <div className="m-4 rounded-2xl overflow-hidden shadow-lg h-[500px] relative z-0 bg-gradient-to-br from-primary-100 via-secondary-100 to-accent-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="m-4 rounded-2xl overflow-hidden shadow-lg h-[500px] relative z-0">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location marker */}
        <Marker position={center} icon={defaultIcon}>
          <Popup>
            <div className="text-center p-2">
              <p className="font-bold text-sm">You are here</p>
              <p className="text-xs text-gray-500">Current location</p>
            </div>
          </Popup>
        </Marker>

        {/* Gaming club markers */}
        {clubs.map((club) => (
          <Marker
            key={club.id}
            position={[club.lat, club.lng]}
            icon={defaultIcon}
            eventHandlers={{
              click: () => onClubSelect(club),
            }}
          >
            <Popup>
              <div className="text-center p-2">
                <div className="text-3xl mb-2">{club.logo}</div>
                <p className="font-bold text-sm">{club.name}</p>
                <p className="text-xs text-gray-500 mb-1">{club.players} players online</p>
                <p className="text-xs text-yellow-600 font-semibold">{club.rating} ⭐</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
