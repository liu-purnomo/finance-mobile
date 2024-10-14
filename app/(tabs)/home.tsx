import { WalletApi } from '@/api/finance/wallet.api';
import { Text, View } from '@/components/ui/Themed';
import { useQuery } from '@tanstack/react-query';
import { Image, useColorScheme } from 'react-native';

export default function Home() {
  const isDark = useColorScheme() === 'dark';

  const { data, isLoading } = useQuery({
    queryKey: ['walletList'],
    queryFn: WalletApi.index,
  });

  console.log(data);
  return (
    <View className={`flex-1 ${isDark ? 'bg-dark' : 'bg-white'}`}>
      {/* <ScrollView> */}
      <View className={`flex-1 ${isDark ? 'bg-dark' : 'bg-white'}`}>
        <View className=" bg-sky-600 rounded-b-3xl">
          <Image
            source={require('@/assets/images/icon-white.png')}
            className="mx-auto mt-24 mb-6 h-20 w-40"
            resizeMode="contain"
          />
          <Text className="mb-9 text-center text-2xl font-bold text-sky-50">
            Personal Finance Tracker
          </Text>
        </View>
        <View className="flex-1 justify-center items-center">
          {!data?.totalItem ? (
            <Text className="text-center text-2xl font-bold text-sky-50">
              You don't have wallet
            </Text>
          ) : (
            <Text className="text-center text-2xl font-bold text-sky-50">
              {data?.totalItem} data
            </Text>
          )}
        </View>
      </View>
      {/* </ScrollView> */}
    </View>
  );
}
