import { Text, View } from '@/components/ui/Themed';
import { useAuthContext } from '@/utils/context/auth-context';

export const ProfileCard = () => {
  const { userData } = useAuthContext();

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-center font-bold text-2xl">{userData.name}</Text>
      <Text className="text-center">{userData.email}</Text>
    </View>
  );
};
