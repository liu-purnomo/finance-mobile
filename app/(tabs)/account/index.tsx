import { ProfileCard } from '@/components/cards/profile/profile.card';
import { Text, View } from '@/components/ui/Themed';
import { UserController } from '@/database';
import { useAuthContext } from '@/utils/context/auth-context';
import { MaterialIcons, Octicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

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
    <View className="flex-1 bg-gray-50">
      <ScrollView className="pt-6 space-y-5">
        <ProfileCard />
        <TouchableOpacity onPress={() => router.replace('/(auth)/register')}>
          <View className="px-5 pb-4 border-t border-b border-gray-100  flex-row items-center justify-between gap-2">
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="person" size={24} color="black" />
              <Text className="font-bold">My Profile</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <MaterialIcons name="chevron-right" size={25} color="black" />
            </View>
          </View>
        </TouchableOpacity>
        <View>
          <TouchableOpacity onPress={() => router.replace('/(auth)/register')}>
            <View className="px-5 pb-5 border-t border-b border-gray-100 flex-row items-center justify-between gap-2">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="wallet" size={24} color={'gray'} />
                <Text>My Wallets</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="chevron-right" size={25} color="black" />
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => router.replace('/(auth)/register')}>
            <View className="px-5 pb-4 border-t border-b border-gray-100 flex-row items-center justify-between gap-2">
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="category" size={24} color={'gray'} />
                <Text>Categories</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="chevron-right" size={25} color="black" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity onPress={() => router.replace('/(auth)/register')}>
            <View className="px-5 pb-4 border-t border-b border-gray-100 flex-row items-center justify-between gap-2">
              <View className="flex-row items-center gap-2">
                <Octicons name="gear" size={24} color={'gray'} />
                <Text>Setting</Text>
              </View>
              <View className="flex-row items-center gap-2">
                <MaterialIcons name="chevron-right" size={25} color="black" />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
