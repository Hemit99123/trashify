import React, { useState, useEffect } from 'react';

const withFadeIn = <P extends object>(WrappedComponent: React.ComponentType<P & { isMounted?: boolean }>) => {
    return (props: Omit<P, 'isMounted'>) => {
      const [isMounted, setIsMounted] = useState(false);
  
      useEffect(() => {
        setIsMounted(true);
      }, []);
  
      return (
        <div className={`transition-opacity duration-1000 ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
          <WrappedComponent {...(props as P)} isMounted={isMounted} />
        </div>
      );
    };
  };
  

export default withFadeIn;
