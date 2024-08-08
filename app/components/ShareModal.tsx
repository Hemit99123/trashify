import React from 'react';
import ShareButton from './ShareButton';
import XSVG from '../assets/social-icons/x.svg'; 
import CopyLink from '../assets/regular/copy-link.svg'
import Messages from '../assets/social-icons/message.svg'
import WhatsApp from '../assets/social-icons/whatsapp.svg'
import Cancel from '../assets/regular/cancel.svg'

interface ShareModalProps {
  setShowShareModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareModal: React.FC<ShareModalProps> = ({ setShowShareModal }) => {
  return (
    <div id="static-modal" data-modal-backdrop="static" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 flex items-center justify-center w-full h-full p-6 overflow-y-auto overflow-x-hidden bg-blur backdrop-blur-xl">
      <div className="relative w-full max-w-lg max-h-full p-6">
        <div className="relative bg-white rounded-lg shadow-lg p-6">
          <button className='absolute top-2 right-2 hover:bg-gray-100 px-1 py-1 rounded-full' onClick={() => setShowShareModal(false)}>
            <Cancel />
          </button>

          <h1 className='text-xl font-medium mb-4'>Share this experience</h1>
        
          <div className='mx-6'>
            <div className='grid grid-cols-2 gap-4'>
                <ShareButton SVGIcon={CopyLink} social='Copy Link'/>
                <ShareButton SVGIcon={XSVG} social='Twitter'/>
                <ShareButton SVGIcon={Messages} social='Messages'/>
                <ShareButton SVGIcon={WhatsApp} social='WhatsApp'/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;
