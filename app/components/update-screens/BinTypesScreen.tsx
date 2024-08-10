import React, { useState } from 'react'
import Chevron from '../../assets/regular/options-chevron.svg'
import Menu from './components/Menu'

const BinTypesScreen = () => {

  const [showMenu, setShowMenu] = useState(false)
  

  const toggleShowMenuState = () => {
    setShowMenu((prev) => !prev)
  }

  return (
    <div className='relative'>
      <h1 className='text-4xl font-semibold'>Choose a type!</h1>
      <p className='text-gray-500 text-xs'>These are the different types of bins currently available within Trashify's platform</p>
      <div 
        className='flex items-center justify-between cursor-pointer rounded-md text-sm border-2 w-full py-3 px-2 font-semibold hover:bg-gray-50 duration-300'
        onClick={toggleShowMenuState}
      >
        <p>Options</p>
        <Chevron />
      </div>

      {showMenu &&
        <Menu />
      }
    </div>
  )
}

export default BinTypesScreen