import useUpdateStore from '@/store/useUpdateStore'
import React from 'react'

interface MenuItemsProps {
    SVG: any;
    title: "garbage" | "recycling" | "compost";
}

const MenuItems: React.FC<MenuItemsProps> = ({SVG, title}) => {
    const setBin = useUpdateStore((state) => state.setBin)

    const handleClick = () => {
        setBin(title)
        alert('Selected ' + title)
    }

    return (
        <div  onClick={() => handleClick()} className='flex items-center w-full p-4 cursor-pointer hover:bg-gray-50 text-sm text-gray-600 font-medium'>
            <SVG />
            <p className='ml-1'>{title}</p>
        </div>
    )
}

export default MenuItems