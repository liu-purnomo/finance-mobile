import { AuthApi } from '@/api';
import { View } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { loginAction } from '@/store/authStorage';
import { Feather } from '@expo/vector-icons';
import { useMutation } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';

const initialValues = {
  email: '',
  password: '',
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();

  const formValidation = Yup.object().shape({
    email: Yup.string()
      .required('Email is required')
      .email('Invalid email format')
      .label('Email'),
    password: Yup.string()
      .required('Password is required')
      .min(5, 'Password must be at least 5 characters')
      .label('Password'),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ['LoginUser'],
    mutationFn: AuthApi.login,
  });

  const handleOnSubmit = async (values: any) => {
    // console.log(values);
    // Alert.alert('Login Successful', `Welcome back, ${values.email}!`);
    try {
      // Implement your login logic here
      const { email, password } = values;
      const response = await mutateAsync({ email, password });
      dispatch(loginAction(response.data));

      console.log(response, 'response');
    } catch (error: any) {
      // console.log();
      Alert.alert(
        'Error',
        error?.response?.data?.message || 'Something went wrong'
      );
    }
    // Implement your login logic here
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleOnSubmit}
          validationSchema={formValidation}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Email"
                placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                style={{
                  ...styles.input,
                  color: Colors[colorScheme ?? 'light'].text,
                }}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <View style={styles.passwordContainer}>
                <TextInput
                  placeholder="Password"
                  placeholderTextColor={Colors[colorScheme ?? 'light'].text}
                  style={{
                    ...styles.input,
                    color: Colors[colorScheme ?? 'light'].text,
                  }}
                  secureTextEntry={!showPassword}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Text style={styles.eyeText}>
                    {showPassword ? (
                      <Feather
                        name="eye-off"
                        size={20}
                        color={Colors[colorScheme ?? 'light'].text}
                      />
                    ) : (
                      <Feather
                        name="eye"
                        size={20}
                        color={Colors[colorScheme ?? 'light'].text}
                      />
                    )}
                  </Text>
                </TouchableOpacity>
                {/* </View> */}
              </View>
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  handleSubmit();
                }}
              >
                {isPending ? (
                  <ActivityIndicator
                    color={Colors[colorScheme ?? 'light'].text}
                  />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 12,
    flex: 1,
  },
  input: {
    height: 40,
    marginVertical: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#ccc',
    borderRadius: 8,
    width: '100%',
  },

  passwordContainer: {
    position: 'relative',
    height: 60,
    backgroundColor: 'transparent',
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  eyeText: {
    fontSize: 18,
  },
  button: {
    height: 50,
    backgroundColor: '#0284c7',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 14,
    height: 20,
    color: 'red',
  },
});
