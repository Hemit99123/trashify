import React, { useContext, useEffect, useState } from 'react';
import withFadeIn from '@/wrapper/withFadeIn'; 
import { PostDataContext } from '@/contexts/PostDataContext';
import axios from 'axios';

const Third = () => {
  const { state, setState } = useContext(PostDataContext);


  const handleSuccess = async (result: GeolocationPosition) => {
    // Extract latitude and longitude from the result
    const { latitude, longitude } = result.coords;
    let city = '';
    let latitudeString = latitude.toString()
    let longitudeString = longitude.toString()

    // Get the city that the coordinates is based out off (mircoservice!) using the OpenCageData demo 
    await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${latitudeString},+${longitudeString}&key=2a392102c3064284a53cd04b451ff785&language=en&pretty=1`)
      .then(result => {
        city = result.data.results[0].components.city;
      })
    setState(prevState => ({
      ...prevState,
      latitude: latitudeString,
      longtitude: longitudeString,
      city
    })); 
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

  const coordinates = `${state.latitude || ''}, ${state.longtitude || ''}`;

  return (
    <div>
      <h1 className='font-medium text-5xl'>Confirm the location</h1>
      <p className='text-gray-400 text-base font-light'>Please provide an accurate location. This way it is easy for those looking for a bin.</p>
      <div className='mt-8'>
        <div className='rounded-lg border py-1 px-3'>
          <p className='text-xs text-gray-400'>Coordinates</p>
          <p className='text-base'>{coordinates ? coordinates : 'Fetching...'}</p>
        </div>
        <div className='rounded-lg border py-1 px-3 mt-7'>
          <p className='text-xs text-gray-400'>City</p>
          <p className='text-base'>Brampton</p>
          <div className="flex-grow border-t border-gray-400"></div>
          <p className='text-xs text-gray-400 mt-px'>Province/Region</p>
          <p className='text-base'>Ontario</p>
          <div className="flex-grow border-t border-gray-400"></div>
          <p className='text-xs text-gray-400 mt-px'>Postal Code</p>
          <p className='text-base'>L6P2RX</p>
        </div>        
      </div>
    </div>
  );
}

export default withFadeIn(Third);
