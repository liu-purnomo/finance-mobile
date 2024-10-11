export interface OnboardingItem {
  id: number;
  image: number;
  title: string;
}

export const onboarding: OnboardingItem[] = [
  {
    id: 0,
    image: require('@/assets/illustration/wallet.png'),
    title: 'Personal Finance Tracker',
  },
];
