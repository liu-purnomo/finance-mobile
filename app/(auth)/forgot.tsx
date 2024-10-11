import { AuthApi } from '@/api';
import Input from '@/components/ui/Input';
import Colors from '@/constants/Colors';
import { HexToRgba } from '@/utils/functions/hexToRgba';
import { Feather } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { router } from 'expo-router';
import { Formik } from 'formik';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  View,
} from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';

const initialsValue = {
  email: '',
};

export default function ForgotPassword() {
  const formValidation = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ['forgotPassword'],
    mutationFn: AuthApi.forgotPassword,
  });

  const handleOnSubmit = async (value: DefaultFormValues) => {
    try {
      const response = await mutateAsync(value);

      Alert.alert('Berhasil', response.message);

      router.replace('/(auth)/login');
    } catch (error: AxiosError | any) {
      Alert.alert('Error', error?.response?.data?.message);
    }
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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
                Login
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
                      <View className="flex-row items-center rounded-3xl bg-sky-100 p-4">
                        <Feather name="mail" size={20} color={Colors.black} />
                        <Input
                          placeholder="Email"
                          placeholderTextColor={HexToRgba(Colors.black, 0.4)}
                          className="ml-2 flex-1 text-black"
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                          value={values.email}
                        />
                      </View>

                      {touched.email && errors.email && (
                        <View className="mt-2">
                          <Text className="text-red-500">{errors.email}</Text>
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
                      Kembali ke{' '}
                      <Text className="text-main font-semibold text-sky-800">
                        Halaman Login
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
