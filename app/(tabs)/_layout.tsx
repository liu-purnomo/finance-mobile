import Colors from '@/constants/Colors';
import { MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Image, Platform, View } from 'react-native';

export default function TabLayout() {
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
          title: 'Saving',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Octicons
              name="briefcase"
              size={20}
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
              name="apple-safari"
              style={{ marginBottom: -3 }}
              size={25}
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
              <Image
                source={require('@/assets/images/icon-white.png')}
                style={{
                  width: Platform.OS === 'ios' ? 40 : 45,
                  height: Platform.OS === 'ios' ? 40 : 45,
                }}
                resizeMode="contain"
              />
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
      {/* <Tabs.Screen
        name="setting"
        options={{
          title: 'Setting',
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Octicons
              name="gear"
              size={20}
              style={{ marginBottom: -3 }}
              color={color}
            />
          ),
          // tabBarLabel: () => {
          //   return null;
          // },
        }}
      /> */}
    </Tabs>
  );
}
