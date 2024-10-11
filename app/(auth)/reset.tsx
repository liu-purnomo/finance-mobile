import { AuthApi } from '@/api';
import Input from '@/components/ui/Input';
import Colors from '@/constants/Colors';
import { HexToRgba } from '@/utils/functions/hexToRgba';
import { Feather, Octicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Formik, FormikHelpers } from 'formik';
import { useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

const initialsValue = {
  password: '',
  confirmPassword: '',
};

export default function ResetPassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutateAsync: resetPassword } = useMutation({
    mutationFn: AuthApi.resetPassword,
  });

  const formValidation = Yup.object().shape({
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
    confirmPassword: Yup.string().required('Konfirmasi password wajib diisi'),
  });

  const handleOnSubmit = async (
    value: DefaultFormValues,
    formik: FormikHelpers<any>
  ) => {
    const { password, confirmPassword } = value;

    if (password !== confirmPassword) {
      alert('Password tidak sama');
    }

    try {
      const response: SuccessResponse = await resetPassword(value);
      Alert.alert(response.message);
      router.replace('/(auth)/login');
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

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(
      (prevShowConfirmPassword) => !prevShowConfirmPassword
    );
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          extraScrollHeight={Platform.OS === 'android' ? -100 : 0}
          enableOnAndroid
        >
          <View className="flex-1 bg-sky-600">
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
              Atur Ulang Password
            </Text>

            <View className="h-full rounded-t-3xl bg-white px-6 pt-10">
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
                        placeholder="Password"
                        placeholderTextColor={HexToRgba(Colors.black, 0.4)}
                        className="ml-2 flex-1 text-black"
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        secureTextEntry={!showPassword}
                      />
                      <TouchableOpacity
                        onPress={handleTogglePasswordVisibility}
                      >
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
                        <Text className="text-red-500">
                          Password tidak sama
                        </Text>
                      </View>
                    )}

                    <TouchableOpacity
                      className="mt-6 items-center rounded-2xl bg-sky-500 py-4"
                      onPress={() => handleSubmit()}
                    >
                      <Text className="text-base font-semibold text-white">
                        Atur Ulang Password
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </Formik>

              <View className="mt-6 flex-row items-center justify-center">
                <TouchableOpacity
                  onPress={() => router.replace('/(auth)/login')}
                >
                  <Text className="text-sm text-black">
                    Kembali ke halaman{' '}
                    <Text className="text-main font-semibold text-sky-800">
                      Login
                    </Text>
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
