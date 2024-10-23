export interface OnboardingItem {
  id: number;
  image: number;
  title: string;
}

export const onboarding: OnboardingItem[] = [
  {
    id: 0,
    image: require('@/assets/illustration/wallet.png'),
    title: 'Welcome to Personal Finance Tracker',
  },
  {
    id: 1,
    image: require('@/assets/illustration/book.png'),
    title: 'Record your daily expenses',
  },
  {
    id: 2,
    image: require('@/assets/illustration/home.png'),
    title: 'Set your budget',
  },
];
