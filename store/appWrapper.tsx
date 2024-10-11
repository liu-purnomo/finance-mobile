import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from './authStorage';
import { AppDispatch } from './store';

export default function AppWrapper() {
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
