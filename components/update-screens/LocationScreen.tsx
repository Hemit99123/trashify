import React from 'react'
import Pin from '@/assets/regular/pin.svg'
import CoorInput from './components/CoorInput'

const LocationScreen = () => {
  
  return (
    <div>
      <div className='flex justify-center mb-10'>
        <Pin />
      </div>
      <p className='text-sm text-center text-gray-500 mb-3'>Choose a new coordinate</p>
      <div className='flex space-x-2'>
        <CoorInput label='Latitude'/>
        <CoorInput label='Longtitude'/>
      </div>

    </div>
  )
}

export default LocationScreen
