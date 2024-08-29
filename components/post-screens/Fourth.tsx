import React from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import { LatLngExpression, icon } from 'leaflet'; // Import LatLngExpression and icon
import withFadeIn from '@/wrapper/withFadeIn';
import useCreateStore from '@/store/useCreateStore';

const Fourth = () => {
    // Use Zustand store to get the state
    const { latitude, longitude } = useCreateStore((state) => ({
        latitude: state.latitude,
        longitude: state.longitude
    }));

    // Convert strings to numbers, fallback to 0 if undefined
    const lat = parseFloat(latitude || '0');
    const lng = parseFloat(longitude || '0');

    // Create the position object
    const position: LatLngExpression = [lat, lng]; // Leaflet expects [lat, lng]

    // Function to determine container style based on screen width
    const getContainerStyle = () => {
        const isMobile = window.innerWidth <= 768;
        return {
            width: isMobile ? '100%' : '80%', // Full width on mobile
            height: '60vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '0 auto',
            marginTop: '15px'
        };
    };

    // Create a custom icon using a default Leaflet icon URL
    const customIcon = icon({
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', // URL of default Leaflet marker icon
        iconSize: [25, 41], // Size of the icon
        iconAnchor: [12, 41], // Point of the icon which will correspond to marker's location
        popupAnchor: [1, -34] // Point from which the popup should open relative to the iconAnchor
    });

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
