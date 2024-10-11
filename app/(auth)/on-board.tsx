import Button from '@/components/ui/Button';
import { onboarding, OnboardingItem } from '@/constants/OnBoarding';
import { router } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Animated,
  Image,
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  useWindowDimensions,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface OnboardProps {
  index: number;
  item: OnboardingItem;
  x: Animated.Value;
  screenWidth: number;
}

function Onboard({ index, item, x, screenWidth }: OnboardProps) {
  const imageTranslateY = x.interpolate({
    inputRange: [
      (index - 1) * screenWidth,
      index * screenWidth,
      (index + 1) * screenWidth,
    ],
    outputRange: [100, 0, 100],
    extrapolate: 'clamp',
  });

  const textTranslateY = x.interpolate({
    inputRange: [
      (index - 1) * screenWidth,
      index * screenWidth,
      (index + 1) * screenWidth,
    ],
    outputRange: [10, 0, 10],
    extrapolate: 'clamp',
  });

  const dark = useColorScheme() == 'dark';

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: screenWidth,
      }}
    >
      <Animated.Image
        source={item.image}
        style={{
          width: screenWidth * 0.8,
          height: screenWidth * 0.8,
          opacity: 1,
          transform: [{ translateY: imageTranslateY }],
        }}
        resizeMode="contain"
      />

      <Animated.View
        style={{
          marginTop: 16,
          width: '90%',
          opacity: 1,
          transform: [{ translateY: textTranslateY }],
        }}
      >
        <Text
          className={`text-center text-2xl font-bold ${
            dark ? 'text-white' : 'text-black'
          }`}
        >
          {item.title}
        </Text>
      </Animated.View>
    </View>
  );
}

export interface OnBoardingScreenProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

export default function OnBoardingScreen() {
  const { width: screenWidth } = useWindowDimensions();
  const flatListRef = useRef<ScrollView>(null);

  const [currentBoard, setCurrentBoard] = useState<number>(0);

  const flatListIndex = useRef(0);

  const x = useRef(new Animated.Value(0)).current;

  const handleScroll = (event: any) => {
    x.setValue(event.nativeEvent.contentOffset.x);
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / screenWidth);
    setCurrentBoard(index);
    flatListIndex.current = index; // Update flatListIndex
  };

  const dark = useColorScheme() == 'dark';

  return (
    <SafeAreaView
      className={`flex-1 items-center justify-center ${
        dark ? 'bg-black' : 'bg-gray-50'
      }`}
      style={{ width: screenWidth }}
    >
      <View className="flex w-full flex-row items-center justify-between px-5 pt-5">
        <Image
          source={
            dark
              ? require('@/assets/images/icon-white.png')
              : require('@/assets/images/icon.png')
          }
          style={{ width: 80, height: 40 }}
          resizeMode="contain"
        />
        <Button onPress={() => router.replace('/(auth)/login')}>
          <Text className={`font-bold ${dark ? 'text-white' : 'text-sky-600'}`}>
            Lewati
          </Text>
        </Button>
      </View>

      <ScrollView
        ref={flatListRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        bounces={false}
      >
        {onboarding.map((item, index) => {
          return (
            <Onboard
              key={item.id}
              index={index}
              item={item}
              x={x}
              screenWidth={screenWidth}
            />
          );
        })}
      </ScrollView>

      {currentBoard !== onboarding.length - 1 && (
        <View className="mb-10 flex h-10 flex-row items-center justify-center">
          {onboarding.map((item, index) => (
            <Animated.View
              key={index}
              className={`${
                currentBoard === index ? 'w-10 bg-sky-500' : 'w-6 bg-sky-200'
              } mx-1 h-2  rounded-lg`}
            />
          ))}
        </View>
      )}

      {currentBoard === onboarding.length - 1 && (
        <Pressable
          className={`mb-20 rounded-full border   ${
            dark ? 'border-sky-500' : 'border-gray-500'
          } px-5 py-3`}
          onPress={() => router.replace('/(auth)/login')}
        >
          <View className="flex flex-row">
            <Text className="font-bold text-sky-500">Masuk Sekarang</Text>
          </View>
        </Pressable>
      )}
    </SafeAreaView>
  );
}
