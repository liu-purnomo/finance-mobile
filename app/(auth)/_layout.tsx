import { Stack } from "expo-router";

// auth layout component
export default function AuthLayoutNav() {
  // const { user, loading } = useAuthentication();

  // const pathName = usePathname();

  // useEffect(() => {
  //   if (!loading) {
  //     if (user) {
  //       router.replace("/(tabs)/home");
  //     }
  //   }
  // }, [user, loading, pathName]);

  return (
    <Stack screenOptions={{ headerShown: false }} initialRouteName="login">
      <Stack.Screen name="on-board" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="forgot" />
      <Stack.Screen name="reset" />
    </Stack>
  );
}
