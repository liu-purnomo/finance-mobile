import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SentEmail() {
  return (
    <View className="flex-1 bg-white">
      <Text className="mb-9 text-center text-2xl font-bold text-sky-50">
        Login
      </Text>

      <TouchableOpacity className="mt-6 items-center rounded-2xl bg-sky-500 py-4">
        <MaterialCommunityIcons name="mail" />
        <Text className="text-base font-semibold text-white">
          Sebuah email berisi link untuk mengatur ulang sandi sudah dikirim ke
          email Anda
        </Text>
      </TouchableOpacity>
    </View>
  );
}
