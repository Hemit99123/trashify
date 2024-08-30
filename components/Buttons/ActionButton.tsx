import React from 'react'

interface ActionButtonProps {
    SVG: any;
    action: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({SVG, action}) => {
  return (
    <button className='bg-special-grey rounded-full py-3 px-3 hover:bg-gray-200' onClick={action}>
        <SVG />
    </button>
  )
}

export default ActionButton