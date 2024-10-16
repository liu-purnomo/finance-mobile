import { AuthApi } from '@/api';
import Input from '@/components/ui/Input';
import LoaderComponent from '@/components/ui/Loading';
import Colors from '@/constants/Colors';
import { UserController } from '@/database';
import { useAuthContext } from '@/utils/context/auth-context';
import { HexToRgba } from '@/utils/functions/hexToRgba';
import { Feather, Octicons } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import { Formik } from 'formik';
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

const initialValues = {
  email: '',
  password: '',
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { setUserData } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const formValidation = Yup.object().shape({
    email: Yup.string().required().email().label('Email'),
    password: Yup.string().required().min(5).label('Password'),
  });

  const { mutateAsync } = useMutation({
    mutationKey: ['LoginUser'],
    mutationFn: AuthApi.login,
  });

  const handleOnSubmit = async (values: DefaultFormValues) => {
    setLoading(true);
    try {
      const { email, password } = values;
      const response = await mutateAsync({ email, password });
      await UserController.createUser(response.data);

      setUserData(response.data);
      router.replace('/(tabs)/home');
    } catch (error: any) {
      console.log(error, 'ERROR');
      console.log(error?.response?.data?.message, 'ERROR');
      if (error?.response?.data?.message === 'Account not active') {
        Alert.alert(
          'Error',
          'Your account has not been activated yet, please activate now!'
        );
        router.replace('/(auth)/activation');
      }
      Alert.alert('Error', error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
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
              Login
            </Text>
            <View className="h-full rounded-t-3xl bg-white px-6 pt-10">
              <Formik
                initialValues={initialValues}
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
                    {loading ? (
                      <LoaderComponent />
                    ) : (
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
                            inputMode="email"
                          />
                        </View>
                        {touched.email && errors.email && (
                          <View className="mt-2">
                            <Text className="text-red-500">{errors.email}</Text>
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
                            <Text className="text-red-500">
                              {errors.password}
                            </Text>
                          </View>
                        )}
                        <View className="mt-4 flex-row items-center justify-end">
                          <TouchableOpacity
                            onPress={() => router.replace('/(auth)/forgot')}
                          >
                            <Text className="ml-2 text-sm text-black/30">
                              Forgot password
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                          className="mt-6 items-center rounded-2xl bg-sky-500 py-4"
                          onPress={() => handleSubmit()}
                        >
                          <Text className="text-base font-semibold text-white">
                            Login
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </>
                )}
              </Formik>
              <View className="mt-6 flex-row items-center justify-center">
                <TouchableOpacity
                  onPress={() => router.replace('/(auth)/register')}
                >
                  <Text className="text-sm text-black">
                    Don't have an account?{' '}
                    <Text className="text-main font-semibold text-sky-800">
                      Register
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
