import LoaderComponent from '@/components/ui/Loading';
import Colors from '@/constants/Colors';
import { useAuthentication } from '@/utils/hooks/useAuthentication';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { router, Tabs } from 'expo-router';
import { useEffect } from 'react';
import { Platform, View } from 'react-native';

export default function TabLayout() {
  const { user, loading } = useAuthentication();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/(auth)/on-board');
    }
  }, [user, loading]);

  if (loading) {
    return <LoaderComponent />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['light'].tint,
      }}
      initialRouteName="index"
    >
      <Tabs.Screen
        name="saving"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Octicons
              name="home"
              size={23}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
          // tabBarLabel: () => {
          //   return null;
          // },
        }}
      />

      <Tabs.Screen
        name="budget"
        options={{
          title: 'Budget',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="wallet-plus"
              style={{ marginBottom: -3 }}
              size={23}
              color={color}
            />
          ),
          // tabBarLabel: () => {
          //   return null;
          // },
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                top: Platform.OS === 'ios' ? -10 : -20,
                width: Platform.OS === 'ios' ? 50 : 60,
                height: Platform.OS === 'ios' ? 50 : 60,
                borderRadius: Platform.OS === 'ios' ? 25 : 30,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#0f6fec',
                borderColor: 'white',
                borderWidth: 2,
              }}
            >
              <MaterialCommunityIcons name="plus" size={25} color="white" />
            </View>
          ),
          tabBarLabel: () => {
            return null;
          },
        }}
      />
      {/* <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-circle-o" size={20} color={color} />
          ),
          // tabBarLabel: () => {
          //   return null;
          // },
        }}
      /> */}
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Octicons
              name="person"
              size={23}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
          // tabBarLabel: () => {
          //   return null;
          // },
        }}
      />
    </Tabs>
  );
}
