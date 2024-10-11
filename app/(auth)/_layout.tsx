import LoaderComponent from '@/components/ui/Loading';
import { useAuthentication } from '@/utils/hooks/useAuthentication';
import { router, Stack, usePathname } from 'expo-router';
import { useEffect } from 'react';

// auth layout component
export default function AuthLayoutNav() {
  const { user, loading } = useAuthentication();

  const pathName = usePathname();

  useEffect(() => {
    if (!loading && user) {
      router.replace('/(tabs)/home');
    }
  }, [user, loading, pathName]);

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="login">
      <Stack.Screen name="on-board" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot" />
      <Stack.Screen name="reset" />
    </Stack>
  );
}
