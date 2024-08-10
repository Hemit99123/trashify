import React from 'react'
import Pin from '@/app/assets/regular/pin.svg'

interface CoorInputProps {
    label: string;
}

const CoorInput: React.FC<CoorInputProps> = ({label}) => {
  return (
    <div>
        <div className='text-xxs text-gray-500'>{label}:</div>
        <input type='number' className='outline-black border border-black rounded-md'/>    
    </div>
  )
}
const LocationScreen = () => {
  return (
    <div>
      <div className='flex justify-center mb-10'>
        <Pin />
      </div>
      <p className='text-sm text-center text-gray-500 mb-3'>Choose a new coordinate</p>
      <div className='flex space-x-2'>
        <CoorInput label='Latitude' />
        <CoorInput label='Longtitude' />
      </div>

    </div>
  )
}

export default LocationScreen
