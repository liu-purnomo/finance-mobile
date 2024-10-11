import Button from '@/components/ui/Button';
import { Text, View } from '@/components/ui/Themed';
import { UserController } from '@/database';
import { useAuthContext } from '@/utils/context/auth-context';
import { router } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

export default function Setting() {
  const { setUserData, userData } = useAuthContext();
  const handleLogout = async () => {
    await UserController.deleteUser();
    setUserData({
      id: '',
      name: '',
      email: '',
      token: '',
    });
    router.replace('/');
  };

  return (
    <View className="flex-1">
      <ScrollView className="px-6 space-y-5">
        <Button
          onPress={() => router.push('/setting/change-password')}
          className="py-4 px-5  w-full bg-sky-500 rounded-full "
        >
          <Text className="font-bold text-center text-white">
            Ganti Password
          </Text>
        </Button>

        <Button
          onPress={() => router.push('/setting/change-avatar')}
          className="py-4 px-5  w-full bg-sky-500 rounded-full "
        >
          <Text className="font-bold text-center text-white">Ganti Avatar</Text>
        </Button>

        <Button
          className="py-4 px-5  w-full bg-yellow-600 rounded-full"
          onPress={() => handleLogout()}
        >
          <Text className="font-bold text-center text-white">Keluar</Text>
        </Button>
      </ScrollView>
    </View>
  );
}
