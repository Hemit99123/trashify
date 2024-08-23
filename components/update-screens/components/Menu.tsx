import React from 'react'
import withFadeIn from '@/wrapper/withFadeIn'
import Recycle from '@/assets/type-option-icon/recycle-edit.svg'
import Garbage from '@/assets/type-option-icon/garbage-edit.svg'
import Food from '@/assets/type-option-icon/food-edit.svg'

interface MenuItemsProps {
    SVG: any;
    title: string;
}
const MenuItems: React.FC<MenuItemsProps> = ({SVG, title}) => {

    return (
        <div className='flex items-center w-full p-4 cursor-pointer hover:bg-gray-50 text-sm text-gray-600 font-medium'>
            <SVG />
            <p className='ml-1'>{title}</p>
        </div>
    )
}
const Menu = () => {
  return (
    <div className='absolute w-full mt-4 rounded-md border-2 shadow-lg'>
        <MenuItems title='Recycling' SVG={Recycle} />
        <MenuItems title='Compost' SVG={Food} />
        <MenuItems title='Trash' SVG={Garbage} />

    </div>
  )
}

export default withFadeIn(Menu)