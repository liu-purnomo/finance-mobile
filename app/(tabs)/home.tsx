import { Text, View } from '@/components/ui/Themed';
import { Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function Home() {
  return (
    <View className="flex-1 bg-white">
      <ScrollView>
        <View className="flex-1">
          <View className=" bg-sky-600 rounded-b-3xl">
            <Image
              source={require('@/assets/images/shape.png')}
              className="absolute left-0 right-0 top-0 bottom-0 h-full w-full"
            />
            <Image
              source={require('@/assets/images/icon-white.png')}
              className="mx-auto mt-24 mb-6 h-20 w-40"
              resizeMode="contain"
            />
            <Text className="mb-9 text-center text-2xl font-bold text-sky-50">
              Personal Finance Tracker
            </Text>
          </View>
          <View></View>
        </View>
      </ScrollView>
    </View>
  );
}
