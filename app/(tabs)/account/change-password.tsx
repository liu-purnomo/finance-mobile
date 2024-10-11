import { AuthApi } from '@/api';
import Input from '@/components/ui/Input';
import Colors from '@/constants/Colors';
import { HexToRgba } from '@/utils/functions/hexToRgba';
import { Feather, Octicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Formik } from 'formik';
import { useState } from 'react';
import { Alert, Keyboard, Platform, Text, View } from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

const initialsValue = {
  oldPassword: '',
  password: '',
  confirmPassword: '',
};

export default function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutateAsync: changePassword } = useMutation({
    mutationFn: AuthApi.changePassword,
  });

  const formValidation = Yup.object().shape({
    oldPassword: Yup.string().required('Password sebelumnya wajib diisi'),
    password: Yup.string()
      .required('Wajib diisi')
      .test(
        'contains-lowercase',
        'Sertakan setidaknya satu huruf kecil',
        (value) => /[a-z]/.test(value)
      )
      .test(
        'contains-uppercase',
        'Sertakan setidaknya satu huruf besar',
        (value) => /[A-Z]/.test(value)
      )
      .test('contains-number', 'Sertakan setidaknya satu angka', (value) =>
        /\d/.test(value)
      )
      .test(
        'contains-special-character',
        'Sertakan setidaknya satu karakter khusus (!@#$%&)',
        (value) => /[!@#$%&]/.test(value)
      )
      .min(6, 'Minimal 6 karakter'),
    confirmPassword: Yup.string()
      .required('Konfirmasi password wajib diisi')
      .oneOf([Yup.ref('password')], 'Konfirmasi password tidak sama'),
  });

  const handleOnSubmit = async (values: DefaultFormValues) => {
    if (values.password === values.oldPassword) {
      Alert.alert('Password tidak boleh sama dengan password sebelumnya');
      return;
    }

    if (values.password !== values.confirmPassword) {
      Alert.alert('Konfirmasi password tidak sama');
    }

    try {
      const response: SuccessResponse = await changePassword(values);
      Alert.alert(response.message);
      router.back();
    } catch (error: any) {
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Something went wrong'
      );
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleOldPasswordVisibility = () => {
    setShowOldPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  return (
    <View className="bg-white flex-1">
      <KeyboardAwareScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={Platform.OS === 'android' ? -100 : 0}
        enableOnAndroid
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="px-6">
            <Formik
              initialValues={initialsValue}
              onSubmit={handleOnSubmit}
              validationSchema={formValidation}
            >
              {({
                handleChange,
                handleBlur,
                setFieldValue,
                handleSubmit,
                values,
                touched,
                errors,
              }) => (
                <>
                  <View className="mt-4 flex-row items-center rounded-3xl bg-sky-100 p-4">
                    <Feather name="lock" size={20} color={Colors.black} />
                    <Input
                      placeholder="Password Lama"
                      placeholderTextColor={HexToRgba(Colors.black, 0.4)}
                      className="ml-2 flex-1 text-black"
                      onChangeText={handleChange('oldPassword')}
                      onBlur={handleBlur('oldPassword')}
                      value={values.oldPassword}
                      secureTextEntry={!showOldPassword}
                    />
                    <TouchableOpacity
                      onPress={handleToggleOldPasswordVisibility}
                    >
                      <Octicons
                        name={showOldPassword ? 'eye' : 'eye-closed'}
                        size={16}
                        color={HexToRgba(Colors.black, 0.5)}
                      />
                    </TouchableOpacity>
                  </View>

                  {touched.password && errors.password && (
                    <View className="mt-2">
                      <Text className="text-red-500">{errors.password}</Text>
                    </View>
                  )}

                  <View className="mt-4 flex-row items-center rounded-3xl bg-sky-100 p-4">
                    <Feather name="lock" size={20} color={Colors.black} />
                    <Input
                      placeholder="Password"
                      placeholderTextColor={HexToRgba(Colors.black, 0.4)}
                      className="ml-2 flex-1 text-black"
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity onPress={handleTogglePasswordVisibility}>
                      <Octicons
                        name={showPassword ? 'eye' : 'eye-closed'}
                        size={16}
                        color={HexToRgba(Colors.black, 0.5)}
                      />
                    </TouchableOpacity>
                  </View>

                  {touched.password && errors.password && (
                    <View className="mt-2">
                      <Text className="text-red-500">{errors.password}</Text>
                    </View>
                  )}

                  <View className="mt-4 flex-row items-center rounded-3xl bg-sky-100 p-4">
                    <Feather name="lock" size={20} color={Colors.black} />
                    <Input
                      placeholder="Ulangi Password"
                      placeholderTextColor={HexToRgba(Colors.black, 0.4)}
                      className="ml-2 flex-1 text-black"
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={values.confirmPassword}
                      secureTextEntry={!showConfirmPassword}
                    />
                    <TouchableOpacity
                      onPress={handleToggleConfirmPasswordVisibility}
                    >
                      <Octicons
                        name={showConfirmPassword ? 'eye' : 'eye-closed'}
                        size={16}
                        color={HexToRgba(Colors.black, 0.5)}
                      />
                    </TouchableOpacity>
                  </View>

                  {values.password !== values.confirmPassword && (
                    <View className="mt-2">
                      <Text className="text-red-500">Password tidak sama</Text>
                    </View>
                  )}

                  <TouchableOpacity
                    className="mt-6 items-center rounded-2xl bg-sky-500 py-4"
                    onPress={() => handleSubmit()}
                  >
                    <Text className="text-base font-semibold text-white">
                      Ganti Password
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </View>
  );
}
