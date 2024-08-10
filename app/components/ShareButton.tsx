import React from 'react';

interface ShareButtonProps {
    SVGIcon: any;
    social: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ SVGIcon, social }) => {
    return (
        <button className='flex items-center border rounded-lg py-2 px-4'>
            <SVGIcon />
            <p className='text-sm ml-3 font-medium'>{social}</p>
        </button>
    );
};

export default ShareButton;
