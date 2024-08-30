import React, { useEffect } from 'react';
import withFadeIn from '@/wrapper/withFadeIn';
import useCreateStore from '@/store/useCreateStore'; // Import Zustand store

const Third = () => {
  // Access Zustand store state and updater function
  const { latitude, longitude, setLatitude, setLongitude } = useCreateStore((state) => ({
    latitude: state.latitude,
    longitude: state.longitude,
    setLatitude: state.setLatitude,
    setLongitude: state.setLongitude,
  }));

  const handleSuccess = async (result: GeolocationPosition) => {
    // Extract latitude and longitude from the result
    const { latitude, longitude } = result.coords;
    setLatitude(latitude);
    setLongitude(longitude);
  };

  const handleError = (error: GeolocationPositionError) => {
    alert('Whoops! An error occurred: ' + error.message);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    } else {
      alert("Geolocation is not supported by this browser, meaning this app is not supported!");
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  const coordinates = `${latitude || ''}, ${longitude || ''}`;

  return (
    <div>
      <h1 className='font-medium text-5xl'>Your coordinates</h1>
      <p className='text-gray-400 text-base font-light'>
        These are the geospatial data that will be stored within our system. If you are not comfortable with that, please abort this process!
      </p>
      <div className='mt-8'>
        <div className='rounded-lg border py-1 px-3'>
          <p className='text-xs text-gray-400'>Coordinates</p>
          <p className='text-base'>{coordinates ? coordinates : 'Fetching...'}</p>
        </div>
      </div>
    </div>
  );
}

export default withFadeIn(Third);
