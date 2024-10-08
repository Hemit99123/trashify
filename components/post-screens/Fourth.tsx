'use client';

import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L, { LatLngExpression } from 'leaflet';
import withFadeIn from '@/wrapper/withFadeIn';
import useCreateStore from '@/store/useCreateStore';

// Create the custom icon directly in the file
const customIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
});

const Fourth = () => {
    const { latitude, longitude } = useCreateStore((state) => ({
        latitude: state.latitude,
        longitude: state.longitude
    }));

    const lat = latitude || 0;
    const lng = longitude || 0;

    const position: LatLngExpression = [lat, lng];

    const getContainerStyle = () => {
        const isMobile = window.innerWidth <= 768;
        return {
            width: isMobile ? '100%' : '80%',
            height: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
            marginTop: '15px'
        };
    };

    return (
        <div>
            <h1 className='font-medium text-5xl'>Where the bin is located....</h1>
            <p className='text-gray-400 text-base font-light'>
                This is just to show you a visual representation of the coordinates. It will be shown on the below map
            </p>
            <div style={getContainerStyle()}>
                <MapContainer 
                    center={position} 
                    zoom={13}
                    style={{ width: '100%', height: '100%' }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position} icon={customIcon} />
                </MapContainer>
            </div>
        </div>
    );
};

export default withFadeIn(Fourth);
