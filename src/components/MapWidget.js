import React, {useEffect} from 'react';
import {MapContainer, TileLayer, Marker, useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

function UpdateViewTile({center, zoom}) {
    const map = useMap();
    
    useEffect(() => {
        if (!map) {
            return;
        }

        map.setView(center, zoom);
    }, [map, center]);

    return (
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    );
}

export default function MapWidget({lat, lon}) {
    const zoom = 12;

    // makrer initilizaiton
    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    return (
        <MapContainer
            style={{
                flex: 1,
                boxShadow: '5px 10px 15px rgba(0, 0, 0, 0.3)'
            }}
            center={[lat, lon]}
            zoom={zoom}
            scrollWheelZoom={false}
        >
            <UpdateViewTile center={[lat, lon]} zoom={zoom} />
            <Marker position={[lat, lon]} />
        </MapContainer>
    );
}
