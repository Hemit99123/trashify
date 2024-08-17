import React from 'react'

interface OptionsProps {
    SVG: any;
    title: string;
    desc: string;
    handleClick: () => void;
}

const OptionsButton: React.FC<OptionsProps> = ({SVG, title, desc, handleClick}) => {
  return (
    <div className='border-2 rounded-xl py-5 px-4 cursor-pointer flex justify-between items-center hover:border-black' onClick={handleClick}>
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