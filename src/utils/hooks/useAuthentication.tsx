import { UserController } from '@/database';
import { useQuery } from '@tanstack/react-query';

// This hook can be used to access the user info.
export function useAuthentication() {
  const {
    data,
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ['MyProfileDetail'],
    queryFn: UserController.getUser,
  });

  return {
    user: data,
    refetch,
    loading,
  };
}
