import LoaderComponent from '@/components/ui/Loading';
import { router, usePathname } from 'expo-router';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function IndexPage() {
  const pathName = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // State for loading

  const user = useSelector((state: any) => state?.auth?.user);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    // Only navigate if the component is mounted
    if (isMounted) {
      if (user) {
        // Simulate delay (optional) to show loading effect
        setTimeout(() => {
          setIsLoading(false); // Set loading to false
          router.replace('/(tabs)/');
        }, 1000); // Delay for 1 second to show loading effect
      } else {
        setTimeout(() => {
          setIsLoading(false);
          router.replace('/(auth)/on-board');
        }, 1000);
      }
    }
  }, [user, isMounted]);

  if (isLoading) {
    return <LoaderComponent />; // Show loading while processing
  }

  return null; // If not loading, return null (since it will navigate away)
}
