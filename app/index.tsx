import LoaderComponent from '@/components/ui/Loading';
import { useAuthentication } from '@/utils/hooks/useAuthentication';
import { router, usePathname } from 'expo-router';
import React, { useEffect } from 'react';

export default function Loading() {
  const { user, loading } = useAuthentication();

  const pathName = usePathname();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace('/(tabs)/home');
      } else {
        router.replace('/(auth)/on-board');
      }
    }
  }, [user, loading, pathName]);

  return <LoaderComponent />;
}
