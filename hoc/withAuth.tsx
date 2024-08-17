'use client';

import React, { ComponentType } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Header from '@/components/Header';

interface WithAuthProps {
  isLoading: boolean;
}

const withAuth = (WrappedComponent: ComponentType<WithAuthProps>) => {
  return (props: WithAuthProps) => {
    const { user, error, isLoading } = useUser();

    if (isLoading) return <div>Loading...</div>;

    return (
    <>
      <Header user={user} />
      {error || !user ?
        <h1 className='h-screen items-center justify-center'>You are not authenticated</h1>:
        <WrappedComponent {...props} />
      }
    </>
    );
  };
};

export default withAuth;
