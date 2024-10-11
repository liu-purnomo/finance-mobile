import Colors from '@/constants/Colors';
import { HexToRgba } from '@/utils/functions/hexToRgba';
import { useFormikContext } from 'formik';
import React, { FC } from 'react';
import { Text, TextInputProps, View, useColorScheme } from 'react-native'; // Import TextInputProps from react-native
import Input from '../ui/Input';

interface InputFieldProps extends TextInputProps {
  // Extend InputFieldProps with TextInputProps
  name: string;
  label?: string;
  className?: string;
}

const InputField: FC<InputFieldProps> = ({
  name,
  label,
  className = 'flex w-full',
  ...inputProps // Capture additional input props
}) => {
  const isDark = useColorScheme() === 'dark';
  const formik = useFormikContext<any>();

  return (
    <View className={className}>
      {label && (
        <Text className={`text-start mb-2 ${isDark ? 'text-white' : ''}`}>
          {label}
        </Text>
      )}
      <View className="flex-row items-center rounded-xl bg-sky-100 p-4">
        <Input
          placeholder={label || name}
          placeholderTextColor={HexToRgba(Colors.black, 0.4)}
          className="ml-2 flex-1 text-black"
          onChangeText={formik.handleChange(name)}
          onBlur={formik.handleBlur(name)}
          value={formik.values[name]}
          {...inputProps} // Spread additional input props
        />
      </View>

      {formik.touched[name] && formik.errors[name] && (
        <View className="mt-2">
          <Text className="text-red-500">{String(formik.errors[name])}</Text>
        </View>
      )}
    </View>
  );
};

export default InputField;
