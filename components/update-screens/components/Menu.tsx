import React from 'react'
import withFadeIn from '@/wrapper/withFadeIn'
import Recycle from '@/assets/type-option-icon/recycle-edit.svg'
import Garbage from '@/assets/type-option-icon/garbage-edit.svg'
import Food from '@/assets/type-option-icon/food-edit.svg'
import MenuItems from './MenuItems'

const Menu = () => {
  return (
    <div className='absolute w-full mt-4 rounded-md border-2 shadow-lg'>
        <MenuItems title="recycling" SVG={Recycle}/>
        <MenuItems title="compost" SVG={Food} />
        <MenuItems title="garbage" SVG={Garbage} />
    </div>
  )
}

export default withFadeIn(Menu)