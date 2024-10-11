import React, { FC } from "react";
import { Text, View, useColorScheme } from "react-native"; // Import TextInputProps from react-native

interface DisableFieldProps {
  // Extend DisableFieldProps with TextDisableProps
  content: string;
  label?: string;
  className?: string;
}

const DisableField: FC<DisableFieldProps> = ({
  label,
  content,
  className = "flex w-full",
}) => {
  const isDark = useColorScheme() === "dark";

  return (
    <View className={className}>
      {label && (
        <Text className={`text-start mb-2 ${isDark ? "text-white" : ""}`}>
          {label}
        </Text>
      )}
      <View className="flex-row items-center rounded-xl bg-sky-100 p-4">
        <Text className="ml-2 flex-1 text-black">{content}</Text>
      </View>
    </View>
  );
};

export default DisableField;
