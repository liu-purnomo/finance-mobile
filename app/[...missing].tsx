import { Link, Stack } from 'expo-router';

import { Text, View } from '../src/components/ui/Themed';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className="flex-1 justify-center  items-center">
        <Text className="font-bold text-2xl">This screen doesn't exist.</Text>

        <Link href="/">
          <Text className="m-2 border-sky-400">Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
