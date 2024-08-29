import React from 'react';
import ShareButton from './ShareButton';
import XSVG from '@/assets/social-icons/x.svg'; 
import CopyLink from '@/assets/regular/copy-link.svg'
import Messages from '@/assets/social-icons/message.svg'
import WhatsApp from '@/assets/social-icons/whatsapp.svg'
import ModalWrapper from '@/wrapper/ModalWrapper';

interface ShareModalProps {
  setShowShareModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShareModal: React.FC<ShareModalProps> = ({ setShowShareModal }) => {
  return (
    <ModalWrapper onClose={() => setShowShareModal(false)}>
      <div className='relative mb-10'>
      <h1 className='absolute text-xl font-medium mb-4 top-0 right-4 '>Share this experience</h1>

      </div>
      
      <div className='mx-6'>
        <div className='grid grid-cols-2 gap-4'>
          <ShareButton SVGIcon={CopyLink} social='Copy Link'/>
          <ShareButton SVGIcon={XSVG} social='Twitter'/>
          <ShareButton SVGIcon={Messages} social='Messages'/>
          <ShareButton SVGIcon={WhatsApp} social='WhatsApp'/>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default ShareModal;
