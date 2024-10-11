import { Stack } from 'expo-router';

// auth layout component
export default function SettingPage() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen
        name="index"
        options={{
          title: 'Setting',
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          title: 'Ganti Password',
        }}
      />
    </Stack>
  );
}
