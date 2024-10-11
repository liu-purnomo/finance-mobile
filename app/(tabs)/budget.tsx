import Button from '@/components/ui/Button';
import { Text, View } from '@/components/ui/Themed';
import { Link } from 'expo-router';

export default function Budget() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="font-bold text-2xl">Budget Page</Text>
      <Button>
        <Link href={'/'}>
          <Text className="font-bold text-2xl">Home Page</Text>
        </Link>
      </Button>
    </View>
  );
}
