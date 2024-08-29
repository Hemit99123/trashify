import useCreateStore from '@/store/useCreateStore';
import React from 'react';

interface CoorInputProps {
    label: string;
}

const CoorInput: React.FC<CoorInputProps> = ({ label }) => {
    const setLatitude = useCreateStore((state) => state.setLatitude);
    const setLongitude = useCreateStore((state) => state.setLongitude);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (label === "Latitude") {
            setLatitude(parseFloat(e.target.value));
         } else {
            setLongitude(parseFloat(e.target.value));
        }
    };

    return (
        <div>
            <div className='text-xxs text-gray-500'>{label}:</div>
            <input 
                onChange={handleChange} 
                type='number' 
                className='outline-black border border-black rounded-md'
            />    
        </div>
    );
};

export default CoorInput;
