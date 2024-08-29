"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import useUpdateStore from '@/store/useUpdateStore';
import PhotosScreen from '../../../components/update-screens/PhotosScreen';
import BinTypeScreen from '../../../components/update-screens/BinTypesScreen';
import TitleScreen from '../../../components/update-screens/TitleScreen';
import LocationScreen from '../../../components/update-screens/LocationScreen';

const defaultIcon = new L.Icon({
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    shadowSize: [41, 41],
});

type Screen = 'photos' | 'binType' | 'title' | 'location' | null;

const Page: React.FC = () => {
    const searchParams = useSearchParams();
    const id = parseInt(searchParams.get('id') || "");
    const [selectedScreen, setSelectedScreen] = useState<Screen>(null);
    const [isMobileModalOpen, setIsMobileModalOpen] = useState<Screen | null>(null);
    const [isDesktop, setIsDesktop] = useState<boolean>(true);

    const { photoBuffer, bin, title, photo, latitude, longitude, userId, setBin, setTitle, setPhoto, setLatitude, setLongitude, setUserId } = useUpdateStore(state => ({
        bin: state.bin,
        title: state.title,
        photo: state.photo,
        latitude: state.latitude,
        longitude: state.longitude,
        userId: state.userId,
        photoBuffer: state.photoBuffer,
        setBin: state.setBin,
        setTitle: state.setTitle,
        setPhoto: state.setPhoto,
        setLatitude: state.setLatitude,
        setLongitude: state.setLongitude,
        setUserId: state.setUserId,
    }));

    useEffect(() => {
        const fetchUniquePost = async () => {
            try {
                const response = await axios.get("/api/post/one", {
                    params: { id }
                });

                const { data } = response.data;
                setTitle(data.title);
                setPhoto(data.photo);
                setLatitude(data.coor[0]);
                setLongitude(data.coor[1]);
                setUserId(data.userId);
                setBin(data.bin);
            } catch (err) {
                console.error("Error fetching post data:", err);
            }
        };
        if (id) {
            fetchUniquePost();
        }
    }, [id, setTitle, setPhoto, setLatitude, setLongitude, setUserId, setBin]);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth > 1024);
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleScreenChange = (screen: Screen) => {
        if (window.innerWidth < 1024) {
            setIsMobileModalOpen(screen);
        } else {
            setSelectedScreen(screen);
        }
    };

    const closeMobileModal = () => {
        setIsMobileModalOpen(null);
    };

    const renderContent = () => {
        switch (selectedScreen) {
            case 'photos':
                return <PhotosScreen />;
            case 'binType':
                return <BinTypeScreen />;
            case 'title':
                return <TitleScreen isDesktop={isDesktop} />;
            case 'location':
                return <LocationScreen />;
            default:
                return <PhotosScreen />;
        }
    };

    const renderMobileContent = () => {
        switch (isMobileModalOpen) {
            case 'photos':
                return <PhotosScreen />;
            case 'binType':
                return <BinTypeScreen />;
            case 'title':
                return <TitleScreen isDesktop={isDesktop} />;
            case 'location':
                return <LocationScreen />;
            default:
                return null;
        }
    };

    const handleUpdatePost = async () => {
        await axios.put("/api/post", {
            id,
            title,
            bin, 
            lat: latitude,
            long: longitude,
            photo: photoBuffer
        })
        .then(() => {
            alert('Your bin has been updated')
        })
        .catch((err) => {
            alert("An error occured")
            throw new Error(err)
        })
    }

    return (
        <div className="relative flex flex-col lg:flex-row h-screen">
            <div className={`lg:w-4/12 lg:border-r border-gray-300 p-4 flex-shrink-0 lg:overflow-y-auto lg:h-full ${isMobileModalOpen ? 'hidden' : 'block'}`}>
                <h1 className='text-3xl font-medium mb-8'>Bin Editor</h1>
                <div className="overflow-y-auto hide-scrollbar max-h-[90%]">
                    <div className='flex flex-col items-center space-y-4'>
                        <div 
                            className='flex flex-col text-sm border-2 rounded-lg shadow-xl py-3.5 px-4 cursor-pointer w-full lg:w-5/6 hover:scale-95 duration-300'
                            onClick={() => handleScreenChange('photos')}
                        >
                            <p className='font-medium'>Photos</p>
                            <p className='text-gray-500 mb-3'>Change your photo</p>
                            <div className='flex justify-center'>
                                <img src={photo || ''} className='w-32 h-28 object-cover rounded-lg'/>
                            </div>
                        </div>
                        <div 
                            className='text-sm border-2 rounded-lg shadow-xl py-3.5 px-4 cursor-pointer w-full lg:w-5/6 hover:scale-95 duration-300'
                            onClick={() => handleScreenChange('binType')}
                        >
                            <p className='font-medium'>Bin Type</p>
                            <p className='text-gray-500'>{bin} • Edit your type</p>
                        </div>
                        <div 
                            className='text-sm border-2 rounded-lg shadow-xl py-3.5 px-4 cursor-pointer w-full lg:w-5/6 hover:scale-95 duration-300'
                            onClick={() => handleScreenChange('title')}
                        >
                            <p className='font-medium'>Title</p>
                            <p className='text-gray-500 text-lg font-medium'>{title}</p>
                        </div>
                        <div 
                            className='text-sm border-2 rounded-lg shadow-xl py-3.5 px-4 cursor-pointer w-full lg:w-5/6 hover:scale-95 duration-300'
                            onClick={() => handleScreenChange('location')}
                        >
                            <p className='font-medium'>Location</p>
                            <div className="w-full h-48 mt-4">
                                {latitude && longitude && (
                                    <MapContainer 
                                        center={[latitude, longitude]} 
                                        zoom={13} 
                                        style={{ height: '100%', width: '100%' }}
                                    >
                                        <TileLayer
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                        />
                                        <Marker 
                                            position={[latitude, longitude]} 
                                            icon={defaultIcon}
                                        >
                                            <Popup>Your current location</Popup>
                                        </Marker>
                                    </MapContainer>
                                )}
                            </div>
                        </div>

                        <button className="bg-black text-white px-20 py-4 rounded-full" onClick={handleUpdatePost}>Update</button>
                    </div>
                </div>
            </div>

            {isMobileModalOpen && (
                <div className='flex text-center mt-8 flex-col'>
                    <h1 className='text-xl font-medium'>You are now in edit mode</h1>
                    <span className='text-gray-500 text-sm'>Once completed, simply press the X button!</span>
                </div>
            )}

            {isDesktop && (
                <div className="w-full flex-1 p-4 flex items-center justify-center">
                    {renderContent()}
                </div>
            )}

            <div className={`fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 p-4 flex flex-col transform transition-transform duration-300 ${isMobileModalOpen ? 'bottom-56 translate-y-1/4' : 'translate-y-full'}`}>
                <button 
                    className='self-end text-gray-500'
                    onClick={closeMobileModal}
                >
                    <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
                <div className="flex flex-col justify-center items-center h-full">
                    {renderMobileContent()}
                </div>
            </div>
        </div>
    );
};

export default Page;
