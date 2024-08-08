import React from 'react'

interface OptionsProps {
    SVG: any;
    title: string;
    desc: string;
}

const OptionsButton: React.FC<OptionsProps> = ({SVG, title, desc}) => {
  return (
    <div className='border-2 rounded-xl py-5 px-4 cursor-pointer flex justify-between items-center hover:border-black'>
    <div>
        <p className='text-base font-medium'>{title}</p>
        <p className='text-xs text-gray-400 font-light'>{desc}</p>
    </div>
    <div>
        <SVG />
    </div>
</div>
  )
}

export default OptionsButton